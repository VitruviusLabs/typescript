interface AccessControlDefinitionInstantiationInterface
{
	allowedHeaders: Array<string> | "*";
	allowedOrigins: Array<string> | "*";
	maxAge: number;
}

export type { AccessControlDefinitionInstantiationInterface };
