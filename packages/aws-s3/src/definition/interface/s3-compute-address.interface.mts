interface S3ComputeAddressInterface
{
  protocol: "http" | "https";
  host: string;
  bucket: string;
  key: string;
  parameters: URLSearchParams;
}

export type { S3ComputeAddressInterface };
