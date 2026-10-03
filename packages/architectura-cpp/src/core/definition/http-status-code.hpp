#pragma once

#include <cstdint>
#include <string_view>

namespace Architectura
{

enum class HTTPStatusCode : std::uint16_t
{
    Continue = 100,
    SwitchingProtocols = 101,
    OK = 200,
    Created = 201,
    Accepted = 202,
    NonAuthoritativeInformation = 203,
    NoContent = 204,
    ResetContent = 205,
    PartialContent = 206,
    MultipleChoices = 300,
    MovedPermanently = 301,
    Found = 302,
    SeeOther = 303,
    NotModified = 304,
    UseProxy = 305,
    TemporaryRedirect = 307,
    PermanentRedirect = 308,
    BadRequest = 400,
    Unauthorized = 401,
    PaymentRequired = 402,
    Forbidden = 403,
    NotFound = 404,
    MethodNotAllowed = 405,
    NotAcceptable = 406,
    ProxyAuthenticationRequired = 407,
    RequestTimeout = 408,
    Conflict = 409,
    Gone = 410,
    LengthRequired = 411,
    PreconditionFailed = 412,
    PayloadTooLarge = 413,
    UriTooLong = 414,
    UnsupportedMediaType = 415,
    RangeNotSatisfiable = 416,
    ExpectationFailed = 417,
    ImATeapot = 418,
    MisdirectedRequest = 421,
    UnprocessableEntity = 422,
    TooManyRequests = 429,
    RequestHeaderFieldsTooLarge = 431,
    InternalServerError = 500,
    NotImplemented = 501,
    BadGateway = 502,
    ServiceUnavailable = 503,
    GatewayTimeout = 504,
    HttpVersionNotSupported = 505,
    NetworkAuthenticationRequired = 511
};

constexpr std::string_view ToReasonPhrase(HTTPStatusCode status_code)
{
    switch (status_code)
    {
        case HTTPStatusCode::Continue: return "Continue";
        case HTTPStatusCode::SwitchingProtocols: return "Switching Protocols";
        case HTTPStatusCode::OK: return "OK";
        case HTTPStatusCode::Created: return "Created";
        case HTTPStatusCode::Accepted: return "Accepted";
        case HTTPStatusCode::NonAuthoritativeInformation: return "Non-Authoritative Information";
        case HTTPStatusCode::NoContent: return "No Content";
        case HTTPStatusCode::ResetContent: return "Reset Content";
        case HTTPStatusCode::PartialContent: return "Partial Content";
        case HTTPStatusCode::MultipleChoices: return "Multiple Choices";
        case HTTPStatusCode::MovedPermanently: return "Moved Permanently";
        case HTTPStatusCode::Found: return "Found";
        case HTTPStatusCode::SeeOther: return "See Other";
        case HTTPStatusCode::NotModified: return "Not Modified";
        case HTTPStatusCode::UseProxy: return "Use Proxy";
        case HTTPStatusCode::TemporaryRedirect: return "Temporary Redirect";
        case HTTPStatusCode::PermanentRedirect: return "Permanent Redirect";
        case HTTPStatusCode::BadRequest: return "Bad Request";
        case HTTPStatusCode::Unauthorized: return "Unauthorized";
        case HTTPStatusCode::PaymentRequired: return "Payment Required";
        case HTTPStatusCode::Forbidden: return "Forbidden";
        case HTTPStatusCode::NotFound: return "Not Found";
        case HTTPStatusCode::MethodNotAllowed: return "Method Not Allowed";
        case HTTPStatusCode::NotAcceptable: return "Not Acceptable";
        case HTTPStatusCode::ProxyAuthenticationRequired: return "Proxy Authentication Required";
        case HTTPStatusCode::RequestTimeout: return "Request Timeout";
        case HTTPStatusCode::Conflict: return "Conflict";
        case HTTPStatusCode::Gone: return "Gone";
        case HTTPStatusCode::LengthRequired: return "Length Required";
        case HTTPStatusCode::PreconditionFailed: return "Precondition Failed";
        case HTTPStatusCode::PayloadTooLarge: return "Payload Too Large";
        case HTTPStatusCode::UriTooLong: return "URI Too Long";
        case HTTPStatusCode::UnsupportedMediaType: return "Unsupported Media Type";
        case HTTPStatusCode::RangeNotSatisfiable: return "Range Not Satisfiable";
        case HTTPStatusCode::ExpectationFailed: return "Expectation Failed";
        case HTTPStatusCode::ImATeapot: return "I'm a teapot";
        case HTTPStatusCode::MisdirectedRequest: return "Misdirected Request";
        case HTTPStatusCode::UnprocessableEntity: return "Unprocessable Entity";
        case HTTPStatusCode::TooManyRequests: return "Too Many Requests";
        case HTTPStatusCode::RequestHeaderFieldsTooLarge: return "Request Header Fields Too Large";
        case HTTPStatusCode::InternalServerError: return "Internal Server Error";
        case HTTPStatusCode::NotImplemented: return "Not Implemented";
        case HTTPStatusCode::BadGateway: return "Bad Gateway";
        case HTTPStatusCode::ServiceUnavailable: return "Service Unavailable";
        case HTTPStatusCode::GatewayTimeout: return "Gateway Timeout";
        case HTTPStatusCode::HttpVersionNotSupported: return "HTTP Version Not Supported";
        case HTTPStatusCode::NetworkAuthenticationRequired: return "Network Authentication Required";
    }
    return "";
}

}
