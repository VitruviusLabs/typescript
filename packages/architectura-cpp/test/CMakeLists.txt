add_executable(
    architectura-test
    main.cpp
)

target_include_directories(architectura-test PRIVATE ${CMAKE_SOURCE_DIR}/src ${CMAKE_SOURCE_DIR})
target_link_libraries(architectura-test PRIVATE architectura-core)

include(CTest)
add_test(NAME smoke COMMAND architectura-test)
