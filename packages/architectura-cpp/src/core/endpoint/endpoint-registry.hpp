#pragma once

#include <memory>
#include <string>
#include <unordered_map>
#include <vector>

#include "core/definition/http-method.hpp"
#include "core/endpoint/base-endpoint.hpp"

namespace Architectura
{

class EndpointRegistry final
{
public:
    void addEndpoint(std::unique_ptr<BaseEndpoint> endpoint);
    BaseEndpoint* findEndpoint(HTTPMethod method, const std::string& path) const;
    static EndpointRegistry& getInstance();

private:
    std::unordered_map<HTTPMethod, std::vector<std::unique_ptr<BaseEndpoint>>> endpoints_;
};

}
