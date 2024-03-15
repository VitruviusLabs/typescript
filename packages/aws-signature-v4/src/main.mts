import type { Buffer as NodeBuffer } from "node:buffer";

import { S3Service } from "./s3.service.mjs";

const s3_object: NodeBuffer = await S3Service.GetObject({
	bucket: "",
	key: "",
});

console.debug(s3_object.toString("utf-8"));

// await S3Service.GetObject({
// 	bucket: "qlip-configuration",
// 	key: "staging/web-api/configuration.json",
// });
