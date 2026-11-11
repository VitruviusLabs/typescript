#include "application/endpoint/health-check-endpoint.hpp"

#include "core/server/rich-server-response.hpp"

#include <memory>
#include <string>

namespace Application
{

Architectura::HTTPMethod HealthCheckEndpoint::getMethod() const
{
    return Architectura::HTTPMethod::GET;
}

std::string HealthCheckEndpoint::getRoute() const
{
    return "/health";
}

void HealthCheckEndpoint::execute(Architectura::ExecutionContext& context)
{
    context.getResponse().setStatus(Architectura::HTTPStatusCode::OK);
    context.getResponse().setContentType("text/plain");
    context.getResponse().setBody(std::string_view("200 - OK"));
}

std::unique_ptr<Architectura::BaseEndpoint> HealthCheckEndpoint::newInstance() const
{
    return std::make_unique<HealthCheckEndpoint>();
}

}
