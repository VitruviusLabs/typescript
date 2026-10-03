#pragma once

#include <memory>
#include <string>

#include "core/server/rich-client-request.hpp"
#include "core/server/rich-server-response.hpp"

namespace Architectura
{

class ExecutionContext final
{
public:
    ExecutionContext(RichClientRequest& request, RichServerResponse& response);

    RichClientRequest& getRequest() const;
    RichServerResponse& getResponse() const;

private:
    RichClientRequest& request_;
    RichServerResponse& response_;
};

}
