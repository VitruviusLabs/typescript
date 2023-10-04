import { PortsEnum } from "./Core/Server/PortsEnum.mjs";

import { Server } from "./Core/Server.mjs";

import { Dispatcher } from "./Service/Dispatcher.mjs";

await Dispatcher.RegisterEndpoints();

// const server: Server = await Server.Create({
//     https: true,
//     port: PortsEnum.DEFAULT_HTTPS,
//     certificate: '/home/node/app/docker/certs/vitruvius.dev.crt',
//     key: '/home/node/app/docker/certs/vitruvius.dev.key'
// });

const server: Server = await Server.Create({
    https: false,
    port: PortsEnum.DEFAULT_HTTPS
});

server.start();
