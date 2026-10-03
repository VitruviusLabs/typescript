#include "core/server/rich-server-response.hpp"

#include <stdexcept>
#include <utility>

namespace Architectura
{

RichServerResponse::RichServerResponse()
    : raw_response_(Transport::RawResponse())
{
    raw_response_.version(11);
    raw_response_.set(boost::beast::http::field::server, "Architectura");
}

RichServerResponse::RichServerResponse(Transport::RawResponse raw_response)
    : raw_response_(std::move(raw_response))
{
}

void RichServerResponse::setStatus(HTTPStatusCode status_code)
{
    raw_response_.result(static_cast<unsigned int>(status_code));
}

HTTPStatusCode RichServerResponse::getStatus() const
{
    return static_cast<HTTPStatusCode>(raw_response_.result_int());
}

void RichServerResponse::setHeader(std::string_view name, std::string_view value)
{
    raw_response_.set(std::string(name), std::string(value));
}

void RichServerResponse::appendHeader(std::string_view name, std::string_view value)
{
    raw_response_.insert(std::string(name), std::string(value));
}

void RichServerResponse::removeHeader(std::string_view name)
{
    raw_response_.erase(std::string(name));
}

void RichServerResponse::setKeepAlive(bool keep_alive)
{
    raw_response_.keep_alive(keep_alive);
}

void RichServerResponse::setBody(std::string_view body)
{
    raw_response_.body() = std::string(body);
}

void RichServerResponse::setBody(std::string&& body)
{
    raw_response_.body() = std::move(body);
}

std::string_view RichServerResponse::getBody() const
{
    return std::string_view(raw_response_.body());
}

void RichServerResponse::setContentType(std::string_view content_type)
{
    raw_response_.set(boost::beast::http::field::content_type, std::string(content_type));
}

Transport::RawResponse RichServerResponse::toRawResponse()
{
    raw_response_.prepare_payload();
    return std::move(raw_response_);
}

}
