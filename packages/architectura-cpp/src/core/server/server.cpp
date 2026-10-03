#include "core/server/server.hpp"

#include <boost/asio.hpp>
#include <boost/beast/core.hpp>
#include <boost/beast/core/tcp_stream.hpp>
#include <boost/beast/http.hpp>

#include <iostream>
#include <memory>
#include <stdexcept>
#include <utility>

#include "core/definition/http-method.hpp"
#include "core/endpoint/endpoint-registry.hpp"
#include "core/execution-context/execution-context.hpp"
#include "core/server/rich-client-request.hpp"
#include "core/server/rich-server-response.hpp"

namespace Architectura
{

namespace
{

constexpr std::string_view ServerName = "Architectura";

void handleRequest(
    Transport::RawRequest& raw_request,
    RichServerResponse& response
)
{
    RichClientRequest request(std::move(raw_request));
    const std::string PATH = std::string(request.getPath());
    const HTTPMethod METHOD = [&request]() -> HTTPMethod
    {
        const std::string_view METHOD_STRING = request.getMethod();
        if (METHOD_STRING == "GET") return HTTPMethod::GET;
        if (METHOD_STRING == "HEAD") return HTTPMethod::HEAD;
        if (METHOD_STRING == "POST") return HTTPMethod::POST;
        if (METHOD_STRING == "PUT") return HTTPMethod::PUT;
        if (METHOD_STRING == "DELETE") return HTTPMethod::DELETE;
        if (METHOD_STRING == "CONNECT") return HTTPMethod::CONNECT;
        if (METHOD_STRING == "OPTIONS") return HTTPMethod::OPTIONS;
        if (METHOD_STRING == "TRACE") return HTTPMethod::TRACE;
        if (METHOD_STRING == "PATCH") return HTTPMethod::PATCH;
        return HTTPMethod::GET;
    }();
    BaseEndpoint* ENDPOINT = EndpointRegistry::getInstance().findEndpoint(METHOD, PATH);
    if (ENDPOINT == nullptr)
    {
        response.setStatus(HTTPStatusCode::NotFound);
        response.setContentType("text/plain");
        response.setBody(std::string_view("404 - Not Found"));
        return;
    }
    ExecutionContext context(request, response);
    ENDPOINT->execute(context);
}

class Session final : public std::enable_shared_from_this<Session>
{
public:
    explicit Session(Transport::Socket&& socket)
        : stream_(std::move(socket))
    {
    }

    void run()
    {
        readRequest();
    }

private:
    void readRequest()
    {
        stream_.expires_after(std::chrono::seconds(30));
        boost::beast::http::async_read(
            stream_,
            buffer_,
            request_,
            [self = shared_from_this()](Transport::Error error, std::size_t)
            {
                if (error == boost::beast::http::error::end_of_stream)
                {
                    return;
                }
                if (error)
                {
                    return;
                }
                self->processRequest();
            }
        );
    }

    void processRequest()
    {
        const bool KEEP_ALIVE = request_.keep_alive();
        RichServerResponse response;
        handleRequest(request_, response);
        response.setKeepAlive(KEEP_ALIVE);
        Transport::RawResponse raw_response = response.toRawResponse();
        const std::shared_ptr<Transport::RawResponse> SHARED_RESPONSE =
            std::make_shared<Transport::RawResponse>(std::move(raw_response));
        boost::beast::http::async_write(
            stream_,
            *SHARED_RESPONSE,
            [self = shared_from_this(), SHARED_RESPONSE, KEEP_ALIVE](Transport::Error error, std::size_t)
            {
                if (error)
                {
                    return;
                }
                if (!KEEP_ALIVE)
                {
                    return;
                }
                self->buffer_.consume(self->buffer_.size());
                self->request_ = Transport::RawRequest();
                self->readRequest();
            }
        );
    }

    boost::beast::tcp_stream stream_;
    boost::beast::flat_buffer buffer_;
    Transport::RawRequest request_;
};

}

Server::Server(ServerConfiguration configuration)
    : configuration_(std::move(configuration))
{
}

Server::~Server()
{
    stop();
}

std::unique_ptr<Server> Server::create(ServerConfiguration configuration)
{
    return std::unique_ptr<Server>(new Server(std::move(configuration)));
}

void Server::start()
{
    if (running_)
    {
        throw std::runtime_error("Server is already running.");
    }
    const boost::asio::ip::tcp::endpoint ENDPOINT(
        boost::asio::ip::make_address(configuration_.host),
        configuration_.port
    );
    acceptor_ = std::make_unique<boost::asio::ip::tcp::acceptor>(io_context_, ENDPOINT);
    running_ = true;
    acceptConnections();
    runWorkers();
    io_context_.run();
    for (std::thread& worker : workers_)
    {
        if (worker.joinable())
        {
            worker.join();
        }
    }
    workers_.clear();
    acceptor_.reset();
}

void Server::stop()
{
    if (!running_)
    {
        return;
    }
    running_ = false;
    io_context_.stop();
    for (std::thread& worker : workers_)
    {
        if (worker.joinable())
        {
            worker.join();
        }
    }
    workers_.clear();
    acceptor_.reset();
}

void Server::runWorkers()
{
    const std::size_t WORKER_COUNT = configuration_.worker_count;
    workers_.reserve(WORKER_COUNT);
    for (std::size_t index = 0; index < WORKER_COUNT; ++index)
    {
        workers_.emplace_back([this]() { io_context_.run(); });
    }
}

void Server::acceptConnections()
{
    auto socket = std::make_shared<Transport::Socket>(io_context_);
    acceptor_->async_accept(
        *socket,
        [this, socket](Transport::Error error)
        {
            if (!running_)
            {
                return;
            }
            if (error)
            {
                acceptConnections();
                return;
            }
            handleSession(socket);
            acceptConnections();
        }
    );
}

void Server::handleSession(std::shared_ptr<Transport::Socket> socket)
{
    std::make_shared<Session>(std::move(*socket))->run();
}

}
