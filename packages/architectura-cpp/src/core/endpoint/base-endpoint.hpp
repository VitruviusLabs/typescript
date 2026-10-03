#pragma once

#include <memory>
#include <string>
#include <utility>

#include "core/definition/http-method.hpp"
#include "core/execution-context/execution-context.hpp"
#include "core/server/rich-client-request.hpp"
#include "core/server/rich-server-response.hpp"
#include "core/server/transport/transport-definitions.hpp"

namespace Architectura
{

class BaseEndpoint
{
public:
    virtual ~BaseEndpoint() = default;
    BaseEndpoint() = default;
    BaseEndpoint(const BaseEndpoint&) = delete;
    BaseEndpoint& operator=(const BaseEndpoint&) = delete;
    BaseEndpoint(BaseEndpoint&&) = delete;
    BaseEndpoint& operator=(BaseEndpoint&&) = delete;

    virtual HTTPMethod getMethod() const = 0;
    virtual std::string getRoute() const = 0;
    virtual void execute(ExecutionContext& context) = 0;

    virtual std::unique_ptr<BaseEndpoint> newInstance() const = 0;
};

}
