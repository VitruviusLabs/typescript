interface SignatureInterface
{
	signature: string;
	xAmzContentSha256: string;
	xAmzDate: string;
	authorizationHeader: string;
	headers: Headers;
}

export type { SignatureInterface };
