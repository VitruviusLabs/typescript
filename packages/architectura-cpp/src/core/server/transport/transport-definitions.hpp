#pragma once

#include <boost/asio/any_io_executor.hpp>
#include <boost/asio/ip/tcp.hpp>
#include <boost/beast/core/error.hpp>
#include <boost/beast/http/message.hpp>
#include <boost/beast/http/string_body.hpp>
#include <boost/beast/http/verb.hpp>

#include <string>
#include <unordered_map>
#include <vector>

namespace Architectura::Transport
{

using Executor = boost::asio::any_io_executor;
using Socket = boost::asio::ip::tcp::socket;
using RawRequest = boost::beast::http::request<boost::beast::http::string_body>;
using RawResponse = boost::beast::http::response<boost::beast::http::string_body>;
using Verb = boost::beast::http::verb;
using Error = boost::system::error_code;

constexpr std::uint16_t DefaultPort = 80;

enum class TransportError
{
    ConnectionClosed = 0,
    BodyTooLarge = 1,
    InvalidRequest = 2,
    Unknown = 3
};

struct RequestBody final
{
    std::string body;
};

struct RequestHeaders final
{
    std::unordered_multimap<std::string, std::string> entries;
};

struct ResponseStatus final
{
    std::uint16_t code = 200;
    std::string reason = "OK";
};

}
