#include <cassert>
#include <memory>
#include <string>

#include "core/endpoint/endpoint-registry.hpp"
#include "core/endpoint/base-endpoint.hpp"
#include "core/execution-context/execution-context.hpp"

using namespace Architectura;
#include "core/definition/http-method.hpp"

namespace
{

class ProbeEndpoint final : public BaseEndpoint
{
public:
    HTTPMethod getMethod() const override
    {
        return HTTPMethod::GET;
    }

    std::string getRoute() const override
    {
        return "/probe";
    }

    void execute(ExecutionContext& context) override
    {
        context.getResponse().setStatus(HTTPStatusCode::OK);
    }

    std::unique_ptr<BaseEndpoint> newInstance() const override
    {
        return std::make_unique<ProbeEndpoint>();
    }
};

}

int main()
{
    EndpointRegistry::getInstance().addEndpoint(std::make_unique<ProbeEndpoint>());
    const BaseEndpoint* ENDPOINT = EndpointRegistry::getInstance().findEndpoint(HTTPMethod::GET, "/probe");
    assert(ENDPOINT != nullptr);
    assert(ENDPOINT->getRoute() == "/probe");
    return 0;
}
