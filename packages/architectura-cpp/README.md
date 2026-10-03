# Architectura C++

C++ port of the Architectura framework.

## Design

- **C++23**, no macros, explicit code only.
- Transport is [Boost.Beast](https://github.com/boostorg/beast) (epoll via Asio on Linux), sealed behind the `core/server` proxy layer. No Boost type leaks outside of `Transport` definitions and `server.cpp`.
- Per-request isolation: each request gets a `RichClientRequest`, a `RichServerResponse`, and an `ExecutionContext`.
- Self-contained endpoints: `BaseEndpoint` subclasses declare their HTTP method and route, and implement `execute`.
- No TLS by design: terminate TLS at a reverse proxy (Traefik, Caddy).
- Dependencies managed with Conan 2, pinned in `conanfile.txt`.

## Requirements

- Linux
- CMake >= 3.28
- Clang (or GCC 14+) with C++23 support
- Conan 2
- Ninja (recommended)

## Build

```bash
conan profile detect --exist-ok
conan install . -s build_type=Release --output-folder=build
conan build . -s build_type=Release --output-folder=build
```

The server binary is `build/build/Release/application/architectura`.

## Endpoints

Endpoints live in `application/endpoint/`. An endpoint is entirely self-contained:

```cpp
class HealthCheckEndpoint final : public Architectura::BaseEndpoint
{
public:
    Architectura::HTTPMethod getMethod() const override;
    std::string getRoute() const override;
    void execute(Architectura::ExecutionContext& context) override;
    std::unique_ptr<Architectura::BaseEndpoint> newInstance() const override;
};
```

Register it in the endpoint registry before starting the server:

```cpp
Architectura::EndpointRegistry::getInstance().addEndpoint(
    std::make_unique<Application::HealthCheckEndpoint>()
);
```

## Roadmap

- Route parameters and regular expression routes (`RouteUtility`).
- Pre-hooks, post-hooks, error-hooks (`core/hook`).
- Session, JWT, and the DDD layer.
