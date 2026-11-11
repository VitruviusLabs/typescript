add_executable(
    architectura
    main.cpp
    endpoint/health-check-endpoint.cpp
)

target_include_directories(architectura PRIVATE ${CMAKE_SOURCE_DIR}/src ${CMAKE_SOURCE_DIR})
target_link_libraries(architectura PRIVATE architectura-core)

architectura_add_warnings(architectura)
