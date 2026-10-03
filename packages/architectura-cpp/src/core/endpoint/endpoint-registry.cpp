#include "core/endpoint/endpoint-registry.hpp"

#include <stdexcept>

namespace Architectura
{

void EndpointRegistry::addEndpoint(std::unique_ptr<BaseEndpoint> endpoint)
{
    const HTTPMethod METHOD = endpoint->getMethod();
    endpoints_[METHOD].push_back(std::move(endpoint));
}

BaseEndpoint* EndpointRegistry::findEndpoint(HTTPMethod method, const std::string& path) const
{
    const auto METHOD_ITERATOR = endpoints_.find(method);
    if (METHOD_ITERATOR == endpoints_.end())
    {
        return nullptr;
    }
    for (const std::unique_ptr<BaseEndpoint>& endpoint : METHOD_ITERATOR->second)
    {
        if (endpoint->getRoute() == path)
        {
            return endpoint.get();
        }
    }
    return nullptr;
}

EndpointRegistry& EndpointRegistry::getInstance()
{
    static EndpointRegistry instance;
    return instance;
}

}
