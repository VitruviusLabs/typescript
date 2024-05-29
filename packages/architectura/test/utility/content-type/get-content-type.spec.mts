import { describe, it } from "node:test";
import { strictEqual } from "node:assert";
import { getContentType } from "../../../src/_index.mjs";

describe("getContentType", (): void => {
	it("should return 'application/octet-stream' for an unknown extension", (): void => {
		strictEqual(getContentType(""), "application/octet-stream");
	});

	it("should return 'text/html' for the 'html' extension", (): void => {
		strictEqual(getContentType("html"), "text/html");
	});

	it("should return 'text/css' for the 'css' extension", (): void => {
		strictEqual(getContentType("css"), "text/css");
	});

	it("should return 'text/javascript' for the 'js' and 'mjs' extensions", (): void => {
		strictEqual(getContentType("js"), "text/javascript");
		strictEqual(getContentType("mjs"), "text/javascript");
	});

	it("should return 'application/json' for the 'json' extension", (): void => {
		strictEqual(getContentType("json"), "application/json");
	});

	it("should return 'image/png' for the 'png' extension", (): void => {
		strictEqual(getContentType("png"), "image/png");
	});

	it("should return 'image/gif' for the 'gif' extension", (): void => {
		strictEqual(getContentType("gif"), "image/gif");
	});

	it("should return 'image/jpeg' for the 'jpg' and 'jpeg' extensions", (): void => {
		strictEqual(getContentType("jpg"), "image/jpeg");
		strictEqual(getContentType("jpeg"), "image/jpeg");
	});

	it("should return 'application/gzip' for the 'gz' extension", (): void => {
		strictEqual(getContentType("gz"), "application/gzip");
	});

	it("should return 'audio/ogg' for the 'oga' extension", (): void => {
		strictEqual(getContentType("oga"), "audio/ogg");
	});

	it("should return 'video/ogg' for the 'ogv' extension", (): void => {
		strictEqual(getContentType("ogv"), "video/ogg");
	});
});
