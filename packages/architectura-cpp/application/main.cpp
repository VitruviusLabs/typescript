#include <memory>

#include "application/endpoint/health-check-endpoint.hpp"
#include "core/endpoint/endpoint-registry.hpp"
#include "core/server/server-configuration.hpp"
#include "core/server/server.hpp"

int main()
{
    Architectura::EndpointRegistry::getInstance().addEndpoint(
        std::make_unique<Application::HealthCheckEndpoint>()
    );
    Architectura::ServerConfiguration configuration;
    configuration.host = "127.0.0.1";
    configuration.port = 8080;
    configuration.worker_count = 4;
    std::unique_ptr<Architectura::Server> server = Architectura::Server::create(configuration);
    server->start();
    return 0;
}
