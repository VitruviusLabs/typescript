#include "core/server/rich-client-request.hpp"

#include <boost/algorithm/string.hpp>

#include <cctype>
#include <stdexcept>
#include <utility>

namespace Architectura
{

RichClientRequest::RichClientRequest(Transport::RawRequest raw_request)
    : raw_request_(std::move(raw_request))
{
    const std::string TARGET = std::string(raw_request_.target());
    const std::size_t QUERY_POSITION = TARGET.find('?');
    if (QUERY_POSITION == std::string::npos)
    {
        target_path_ = TARGET;
        target_query_.clear();
        return;
    }
    target_path_ = TARGET.substr(0, QUERY_POSITION);
    target_query_ = TARGET.substr(QUERY_POSITION + 1);
}

std::string_view RichClientRequest::getMethod() const
{
    return std::string_view(raw_request_.method_string());
}

std::string_view RichClientRequest::getTarget() const
{
    return std::string_view(raw_request_.target());
}

std::string_view RichClientRequest::getHeader(std::string_view name) const
{
    const std::string NAME = std::string(name);
    const auto ITERATOR = raw_request_.find(NAME);
    if (ITERATOR == raw_request_.end())
    {
        throw std::runtime_error("Header not found.");
    }
    return std::string_view(ITERATOR->value());
}

std::vector<std::string_view> RichClientRequest::getHeaders(std::string_view name) const
{
    const std::string NAME = std::string(name);
    std::vector<std::string_view> values;
    const auto RANGE = raw_request_.equal_range(NAME);
    for (auto iterator = RANGE.first; iterator != RANGE.second; ++iterator)
    {
        values.push_back(std::string_view(iterator->value()));
    }
    return values;
}

bool RichClientRequest::hasHeader(std::string_view name) const
{
    return raw_request_.find(std::string(name)) != raw_request_.end();
}

std::string_view RichClientRequest::getBody() const
{
    return std::string_view(raw_request_.body());
}

std::string_view RichClientRequest::getQuery() const
{
    return target_query_;
}

std::string_view RichClientRequest::getPath() const
{
    return target_path_;
}

std::uint16_t RichClientRequest::getVersion() const
{
    return static_cast<std::uint16_t>(raw_request_.version());
}

bool RichClientRequest::isKeepAlive() const
{
    return raw_request_.keep_alive();
}

}
