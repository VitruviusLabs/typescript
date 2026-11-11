#include "core/execution-context/execution-context.hpp"

#include <stdexcept>
#include <utility>

namespace Architectura
{

ExecutionContext::ExecutionContext(RichClientRequest& request, RichServerResponse& response)
    : request_(request)
    , response_(response)
{
}

RichClientRequest& ExecutionContext::getRequest() const
{
    return request_;
}

RichServerResponse& ExecutionContext::getResponse() const
{
    return response_;
}

}
