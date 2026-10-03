#pragma once

#include <memory>
#include <string>

#include "core/definition/http-method.hpp"
#include "core/definition/http-status-code.hpp"
#include "core/endpoint/base-endpoint.hpp"
#include "core/execution-context/execution-context.hpp"

namespace Application
{

class HealthCheckEndpoint final : public Architectura::BaseEndpoint
{
public:
    Architectura::HTTPMethod getMethod() const override;
    std::string getRoute() const override;
    void execute(Architectura::ExecutionContext& context) override;
    std::unique_ptr<Architectura::BaseEndpoint> newInstance() const override;
};

}
