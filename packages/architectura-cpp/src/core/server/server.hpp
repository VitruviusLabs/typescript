#pragma once

#include <cstdint>
#include <memory>
#include <string>
#include <thread>
#include <vector>

#include "core/server/server-configuration.hpp"
#include "core/server/transport/transport-definitions.hpp"

namespace Architectura
{

class Server final
{
public:
    explicit Server(ServerConfiguration configuration);
    ~Server();
    Server(const Server&) = delete;
    Server& operator=(const Server&) = delete;
    Server(Server&&) = delete;
    Server& operator=(Server&&) = delete;

    static std::unique_ptr<Server> create(ServerConfiguration configuration);
    void start();
    void stop();

private:
    void runWorkers();
    void acceptConnections();
    void handleSession(std::shared_ptr<Transport::Socket> socket);

    ServerConfiguration configuration_;
    boost::asio::io_context io_context_;
    std::unique_ptr<boost::asio::ip::tcp::acceptor> acceptor_;
    std::vector<std::thread> workers_;
    bool running_ = false;
};

}
