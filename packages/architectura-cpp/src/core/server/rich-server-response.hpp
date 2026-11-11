#pragma once

#include <cstdint>
#include <memory>
#include <string>
#include <string_view>
#include <unordered_map>
#include <vector>

#include "core/definition/http-status-code.hpp"
#include "core/server/transport/transport-definitions.hpp"

namespace Architectura
{

class RichServerResponse final
{
public:
    RichServerResponse();
    explicit RichServerResponse(Transport::RawResponse raw_response);

    void setStatus(HTTPStatusCode status_code);
    HTTPStatusCode getStatus() const;
    void setHeader(std::string_view name, std::string_view value);
    void appendHeader(std::string_view name, std::string_view value);
    void removeHeader(std::string_view name);
    void setKeepAlive(bool keep_alive);
    void setBody(std::string_view body);
    void setBody(std::string&& body);
    std::string_view getBody() const;
    void setContentType(std::string_view content_type);
    Transport::RawResponse toRawResponse();

private:
    Transport::RawResponse raw_response_;
};

}
