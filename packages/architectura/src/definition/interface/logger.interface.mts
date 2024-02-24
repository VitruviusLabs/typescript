interface LoggerInterface {
    debug: (message: string, context?: string) => void;
    informational: (message: string, context?: string) => void;
    info: (message: string, context?: string) => void;
    notice: (message: string, context?: string) => void;
    warning: (message: string, context?: string) => void;
    error: (message: Error | string, context?: string) => void;
    critical: (message: string, context?: string) => void;
    alert: (message: string, context?: string) => void;
    emergency: (message: string, context?: string) => void;
}

export type { LoggerInterface };
