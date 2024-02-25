/* eslint-disable */

/**
 * Currently DefinitelyTyped did not add Fetch API for NodeJs.
 * We need to implement the types ourselves for the time being.
**/

interface Headers
{
	append: (name: string, value: string) => void;
	delete: (name: string) => void;
	get: (name: string) => string | null;
	has: (name: string) => boolean;
	set: (name: string, value: string) => void;
	forEach: (
		callbackfn: (value: string, key: string, parent: Headers) => void,
		thisArg?: unknown,
	) => void;
}

declare const Headers: {
	prototype: Headers;
	new (init?: HeadersInit): Headers;
};

  type BufferSource = ArrayBuffer | ArrayBufferView;

  type RequestMode = "cors" | "navigate" | "no-cors" | "same-origin";

  type RequestRedirect = "error" | "follow" | "manual";

  type ReferrerPolicy =
	| ""
	| "no-referrer-when-downgrade"
	| "no-referrer"
	| "origin-when-cross-origin"
	| "origin"
	| "same-origin"
	| "strict-origin-when-cross-origin"
	| "strict-origin"
	| "unsafe-url";

  type ResponseType = "basic" | "cors" | "default" | "error" | "opaque" | "opaqueredirect";

  type RequestDestination =
	| ""
	| "audio"
	| "audioworklet"
	| "document"
	| "embed"
	| "font"
	| "frame"
	| "iframe"
	| "image"
	| "manifest"
	| "object"
	| "paintworklet"
	| "report"
	| "script"
	| "sharedworker"
	| "style"
	| "track"
	| "video"
	| "worker"
	| "xslt";

  type HeadersInit = Array<Array<string>> | Headers | Record<string, string>;

  type RequestCredentials = "include" | "omit" | "same-origin";

  type RequestCache =
	| "default"
	| "force-cache"
	| "no-cache"
	| "no-store"
	| "only-if-cached"
	| "reload";

  type XMLHttpRequestBodyInit = Blob | BufferSource | URLSearchParams | string;

  /** This Streams API interface represents a readable stream of byte data. The Fetch API offers a concrete instance of a ReadableStream through the body property of a Response object. */
interface ReadableStream<R = unknown>
{
	readonly locked: boolean;
	cancel: (reason?: unknown) => Promise<void>;
	getReader: () => ReadableStreamDefaultReader<R>;
	pipeThrough: <T>(
		transform: ReadableWritablePair<T, R>,
		options?: StreamPipeOptions,
	) => ReadableStream<T>;
	pipeTo: (destination: WritableStream<R>, options?: StreamPipeOptions) => Promise<void>;
	tee: () => [ReadableStream<R>, ReadableStream<R>];
}

declare const ReadableStream: {
	prototype: ReadableStream;
	new <R = unknown>(
		underlyingSource?: UnderlyingSource<R>,
		strategy?: QueuingStrategy<R>,
	): ReadableStream<R>;
};

  type BodyInit = FormData | ReadableStream | XMLHttpRequestBodyInit;

interface RequestInit
{
	/**
	 * A BodyInit object or null to set request's body.
	 */
	body?: BodyInit | null;
	/**
	 * A string indicating how the request will interact with the browser's cache to set request's cache.
	 */
	cache?: RequestCache;
	/**
	 * A string indicating whether credentials will be sent with the request always, never, or only when sent to a same-origin URL. Sets request's credentials.
	 */
	credentials?: RequestCredentials;
	/**
	 * A Headers object, an object literal, or an array of two-item arrays to set request's headers.
	 */
	headers?: HeadersInit;
	/**
	 * A cryptographic hash of the resource to be fetched by request. Sets request's integrity.
	 */
	integrity?: string;
	/**
	 * A boolean to set request's keepalive.
	 */
	keepalive?: boolean;
	/**
	 * A string to set request's method.
	 */
	method?: string;
	/**
	 * A string to indicate whether the request will use CORS, or will be restricted to same-origin URLs. Sets request's mode.
	 */
	mode?: RequestMode;
	/**
	 * A string indicating whether request follows redirects, results in an error upon encountering a redirect, or returns the redirect (in an opaque fashion). Sets request's redirect.
	 */
	redirect?: RequestRedirect;
	/**
	 * A string whose value is a same-origin URL, "about:client", or the empty string, to set request's referrer.
	 */
	referrer?: string;
	/**
	 * A referrer policy to set request's referrerPolicy.
	 */
	referrerPolicy?: ReferrerPolicy;
	/**
	 * An AbortSignal to set request's signal.
	 */
	signal?: AbortSignal | null;
}

interface Body
{
	readonly body: ReadableStream<Uint8Array> | null;
	readonly bodyUsed: boolean;
	arrayBuffer: () => Promise<ArrayBuffer>;
	blob: () => Promise<Blob>;
	json: () => Promise<unknown>;
	text: () => Promise<string>;
}

interface Response extends Body
{
	readonly headers: Headers;
	readonly ok: boolean;
	readonly redirected: boolean;
	readonly status: number;
	readonly statusText: string;
	readonly type: ResponseType;
	readonly url: string;
	clone: () => Response;
}

declare const Response: {
	prototype: Response;
	new (body?: BodyInit | null, init?: ResponseInit): Response;
	error: () => Response;
	redirect: (url: URL | string, status?: number) => Response;
};

interface Request extends Body
{
	/** Returns the cache mode associated with request, which is a string indicating how the request will interact with the browser's cache when fetching. */
	readonly cache: RequestCache;
	/** Returns the credentials mode associated with request, which is a string indicating whether credentials will be sent with the request always, never, or only when sent to a same-origin URL. */
	readonly credentials: RequestCredentials;
	/** Returns the kind of resource requested by request, e.g., "document" or "script". */
	readonly destination: RequestDestination;
	/** Returns a Headers object consisting of the headers associated with request. Note that headers added in the network layer by the user agent will not be accounted for in this object, e.g., the "Host" header. */
	readonly headers: Headers;
	/** Returns request's sub-resource integrity metadata, which is a cryptographic hash of the resource being fetched. Its value consists of multiple hashes separated by whitespace. [SRI] */
	readonly integrity: string;
	/** Returns a boolean indicating whether or not request can outlive the global in which it was created. */
	readonly keepalive: boolean;
	/** Returns request's HTTP method, which is "GET" by default. */
	readonly method: string;
	/** Returns the mode associated with request, which is a string indicating whether the request will use CORS, or will be restricted to same-origin URLs. */
	readonly mode: RequestMode;
	/** Returns the redirect mode associated with request, which is a string indicating how redirects for the request will be handled during fetching. A request will follow redirects by default. */
	readonly redirect: RequestRedirect;
	/** Returns the referrer of request.
	 * Its value can be a same-origin URL if explicitly set in init, the empty string to indicate no referrer, and "about:client" when defaulting to the global's default. This is used during fetching to determine the value of the `Referer` header of the request being made. */
	readonly referrer: string;
	/** Returns the referrer policy associated with request. This is used during fetching to compute the value of the request's referrer. */
	readonly referrerPolicy: ReferrerPolicy;
	/** Returns the signal associated with request, which is an AbortSignal object indicating whether or not request has been aborted, and its abort event handler. */
	readonly signal: AbortSignal;
	/** Returns the URL of request as a string. */
	readonly url: string;
	clone: () => Request;
}

declare const Request: {
	prototype: Request;
	new (input: RequestInfo | URL, init?: RequestInit): Request;
};

  type RequestInfo = Request | string;

  // eslint-disable-next-line @typescript-eslint/no-shadow
declare function fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;

interface ReadableStreamDefaultReader<R = unknown> extends ReadableStreamGenericReader
{
	read: () => Promise<ReadableStreamReadResult<R>>;
	releaseLock: () => void;
}

declare const ReadableStreamDefaultReader: {
	prototype: ReadableStreamDefaultReader;
	new <R = unknown>(stream: ReadableStream<R>): ReadableStreamDefaultReader<R>;
};

interface ReadableWritablePair<R = unknown, W = unknown>
{
	readable: ReadableStream<R>;
	/**
	 * Provides a convenient, chainable way of piping this readable stream through a transform stream (or any other { writable, readable } pair). It simply pipes the stream into the writable side of the supplied pair, and returns the readable side for further use.
	 *
	 * Piping a stream will lock it for the duration of the pipe, preventing any other consumer from acquiring a reader.
	 */
	writable: WritableStream<W>;
}

interface StreamPipeOptions
{
	preventAbort?: boolean;
	preventCancel?: boolean;
	preventClose?: boolean;
	signal?: AbortSignal;
}

  /** This Streams API interface provides a standard abstraction for writing streaming data to a destination, known as a sink. This object comes with built-in backpressure and queuing. */
interface WritableStream<W = unknown>
{
	readonly locked: boolean;
	abort: (reason?: unknown) => Promise<void>;
	close: () => Promise<void>;
	getWriter: () => WritableStreamDefaultWriter<W>;
}

declare const WritableStream: {
	prototype: WritableStream;
	new <W = unknown>(
		underlyingSink?: UnderlyingSink<W>,
		strategy?: QueuingStrategy<W>,
	): WritableStream<W>;
};

interface UnderlyingSource<R = unknown>
{
	cancel?: UnderlyingSourceCancelCallback;
	pull?: UnderlyingSourcePullCallback<R>;
	start?: UnderlyingSourceStartCallback<R>;
	type?: undefined;
}

  type QueuingStrategySize<T = unknown> = (chunk: T) => number;

interface ReadableStreamGenericReader
{
	readonly closed: Promise<undefined>;
	cancel: (reason?: unknown) => Promise<void>;
}

  type ReadableStreamReadResult<T> = ReadableStreamReadDoneResult | ReadableStreamReadValueResult<T>;

  /** This Streams API interface is the object returned by WritableStream.getWriter() and once created locks the < writer to the WritableStream ensuring that no other streams can write to the underlying sink. */
interface WritableStreamDefaultWriter<W = unknown>
{
	readonly closed: Promise<undefined>;
	readonly desiredSize: number | null;
	readonly ready: Promise<undefined>;
	abort: (reason?: unknown) => Promise<void>;
	close: () => Promise<void>;
	releaseLock: () => void;
	write: (chunk?: W) => Promise<void>;
}

declare const WritableStreamDefaultWriter: {
	prototype: WritableStreamDefaultWriter;
	new <W = unknown>(stream: WritableStream<W>): WritableStreamDefaultWriter<W>;
};

interface UnderlyingSink<W = unknown>
{
	abort?: UnderlyingSinkAbortCallback;
	close?: UnderlyingSinkCloseCallback;
	start?: UnderlyingSinkStartCallback;
	type?: undefined;
	write?: UnderlyingSinkWriteCallback<W>;
}

interface ResponseInit
{
	headers?: HeadersInit;
	status?: number;
	statusText?: string;
}

interface QueuingStrategy<T = unknown>
{
	highWaterMark?: number;
	size?: QueuingStrategySize<T>;
}

type UnderlyingSourceCancelCallback = (reason?: unknown) => PromiseLike<void> | void;

type UnderlyingSourcePullCallback<R> = (
	controller: ReadableStreamController<R>,
) => PromiseLike<void> | void;

type UnderlyingSourceStartCallback<R> = (controller: ReadableStreamController<R>) => unknown;

interface ReadableStreamReadValueResult<T>
{
	done: false;
	value: T;
}

interface ReadableStreamReadDoneResult
{
	done: true;
	value?: undefined;
}

type UnderlyingSinkAbortCallback = (reason?: unknown) => PromiseLike<void> | void;

type UnderlyingSinkCloseCallback = () => PromiseLike<void> | void;

type UnderlyingSinkStartCallback = (controller: WritableStreamDefaultController) => unknown;

type UnderlyingSinkWriteCallback<W> = (
	chunk: W,
	controller: WritableStreamDefaultController,
) => PromiseLike<void> | void;

interface ReadableStreamDefaultController<R = unknown>
{
	readonly desiredSize: number | null;
	close: () => void;
	enqueue: (chunk?: R) => void;
	error: (e?: unknown) => void;
}

declare const ReadableStreamDefaultController: {
	prototype: ReadableStreamDefaultController;
	new (): ReadableStreamDefaultController;
};

  type ReadableStreamController<T> = ReadableStreamDefaultController<T>;

  /** This Streams API interface represents a controller allowing control of a WritableStream's state. When constructing a WritableStream, the underlying sink is given a corresponding WritableStreamDefaultController instance to manipulate. */
interface WritableStreamDefaultController
{
	readonly signal: AbortSignal;
	error: (e?: unknown) => void;
}

declare const WritableStreamDefaultController: {
	prototype: WritableStreamDefaultController;
	new (): WritableStreamDefaultController;
};

type BlobPart = Blob | BufferSource | string;

type EndingType = "native" | "transparent";

interface BlobPropertyBag
{
	endings?: EndingType;
	type?: string;
}

interface FilePropertyBag extends BlobPropertyBag
{
	lastModified?: number;
}

/** Provides information about files and allows JavaScript in a web page to access their content. */
interface File extends Blob
{
	readonly lastModified: number;
	readonly name: string;
	readonly webkitRelativePath: string;
}

declare const File: {
	prototype: File;
	new(fileBits: Array<BlobPart>, fileName: string, options?: FilePropertyBag): File;
};

type FormDataEntryValue = File | string;

interface FormData
{
	append: (name: string, value: Blob | string, fileName?: string) => void;
	delete: (name: string) => void;
	get: (name: string) => FormDataEntryValue | null;
	getAll: (name: string) => Array<FormDataEntryValue>;
	has: (name: string) => boolean;
	set: (name: string, value: Blob | string, fileName?: string) => void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	forEach: (callbackfn: (value: FormDataEntryValue, key: string, parent: FormData) => void, thisArg?: any) => void;
}

declare const FormData: {
	prototype: FormData;
	new(): FormData;
};

/* eslint-enable */
