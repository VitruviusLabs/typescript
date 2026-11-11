cmake_minimum_required(VERSION 3.28)

project(
    Architectura
    VERSION 0.1.0
    DESCRIPTION "A light weight C++ framework providing isolated context for each request."
    LANGUAGES CXX
)

option(ARCHITECTURA_WARNINGS_AS_ERRORS "Treat compiler warnings as errors." ON)
option(ARCHITECTURA_TIDY "Enable clang-tidy while compiling." OFF)
option(ARCHITECTURA_BUILD_TESTING "Build the test executables." OFF)

set(CMAKE_CXX_STANDARD 23)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

find_package(Boost REQUIRED)

set(
    ARCHITECTURA_WARNING_FLAGS
    -Wall
    -Wextra
    -Wpedantic
    -Wconversion
    -Wsign-conversion
    -Wcast-qual
    -Wdouble-promotion
    -Wshadow
    -Wnon-virtual-dtor
    -Wold-style-cast
    -Woverloaded-virtual
    -Wnull-dereference
    -Wformat=2
)

# GCC 14 emits false positive null pointer dereference warnings from within
# Boost.Asio and Boost.Beast headers. Suppressed until the toolchain is fixed.
list(APPEND ARCHITECTURA_WARNING_FLAGS -Wno-null-dereference)

function(architectura_add_warnings target)
    target_compile_options(${target} PRIVATE ${ARCHITECTURA_WARNING_FLAGS})
    if (ARCHITECTURA_WARNINGS_AS_ERRORS)
        target_compile_options(${target} PRIVATE -Werror)
    endif()
endfunction()

add_subdirectory(src)
add_subdirectory(application)
if (ARCHITECTURA_BUILD_TESTING)
    add_subdirectory(test)
endif()
