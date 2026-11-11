#pragma once

#include <cstdint>
#include <memory>
#include <string>
#include <string_view>
#include <unordered_map>
#include <vector>

#include "core/server/transport/transport-definitions.hpp"

namespace Architectura
{

class RichClientRequest final
{
public:
    using HeaderMap = std::unordered_multimap<std::string, std::string>;

    explicit RichClientRequest(Transport::RawRequest raw_request);

    std::string_view getMethod() const;
    std::string_view getTarget() const;
    std::string_view getHeader(std::string_view name) const;
    std::vector<std::string_view> getHeaders(std::string_view name) const;
    bool hasHeader(std::string_view name) const;
    std::string_view getBody() const;
    std::string_view getQuery() const;
    std::string_view getPath() const;
    std::uint16_t getVersion() const;
    bool isKeepAlive() const;

private:
    Transport::RawRequest raw_request_;
    std::string target_path_;
    std::string target_query_;
};

}
