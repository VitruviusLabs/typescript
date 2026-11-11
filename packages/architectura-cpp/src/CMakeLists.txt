add_library(
    architectura-core
    core/endpoint/endpoint-registry.cpp
    core/execution-context/execution-context.cpp
    core/server/rich-client-request.cpp
    core/server/rich-server-response.cpp
    core/server/server.cpp
)

target_include_directories(architectura-core PUBLIC ${CMAKE_CURRENT_SOURCE_DIR})
target_link_libraries(architectura-core PUBLIC Boost::boost)

architectura_add_warnings(architectura-core)
