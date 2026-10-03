#pragma once

#include <cstdint>
#include <string_view>

namespace Architectura
{

enum class HTTPMethod : std::uint8_t
{
    GET = 0,
    HEAD = 1,
    POST = 2,
    PUT = 3,
    DELETE = 4,
    CONNECT = 5,
    OPTIONS = 6,
    TRACE = 7,
    PATCH = 8
};

constexpr std::string_view ToString(HTTPMethod method)
{
    switch (method)
    {
        case HTTPMethod::GET: return "GET";
        case HTTPMethod::HEAD: return "HEAD";
        case HTTPMethod::POST: return "POST";
        case HTTPMethod::PUT: return "PUT";
        case HTTPMethod::DELETE: return "DELETE";
        case HTTPMethod::CONNECT: return "CONNECT";
        case HTTPMethod::OPTIONS: return "OPTIONS";
        case HTTPMethod::TRACE: return "TRACE";
        case HTTPMethod::PATCH: return "PATCH";
    }
    return "";
}

}
