#pragma once

#include <cstdint>
#include <string>

namespace Architectura
{

struct ServerConfiguration final
{
    std::string host = "0.0.0.0";
    std::uint16_t port = 80;
    std::uint8_t worker_count = 4;
    std::uint64_t request_header_limit = 16 * 1024;
    std::uint64_t request_body_limit = 8 * 1024 * 1024;
};

}
