import { DMMF } from './dmmf-types';
import { DatasourceOverwrite } from '@prisma/engine-core/dist/NodeEngine';
import { Document } from './query';
import { GeneratorConfig } from '@prisma/generator-helper/dist/types';
import { Dataloader } from './Dataloader';
export declare type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
export declare type Datasource = {
    url?: string;
};
export declare type Datasources = Record<string, Datasource>;
export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your prisma.schema file
     */
    datasources?: Datasources;
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;
    /**
     * @example
     * \`\`\`
     * // Defaults to stdout
     * log: ['query', 'info', 'warn']
     *
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     * ]
     * \`\`\`
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>;
    /**
     * @internal
     * You probably don't want to use this. \`__internal\` is used by internal tooling.
     */
    __internal?: {
        debug?: boolean;
        hooks?: Hooks;
        engine?: {
            cwd?: string;
            binaryPath?: string;
            endpoint?: string;
        };
        measurePerformance?: boolean;
    };
}
export declare type HookParams = {
    query: string;
    path: string[];
    rootField?: string;
    typeName?: string;
    document: any;
    clientMethod: string;
    args: any;
};
export declare type HookPoint = 'all' | 'engine';
export declare type EngineHookParams = {
    document: Document;
    runInTransaction?: boolean;
};
export declare type AllHookArgs = {
    params: HookParams;
    fetch: (params: HookParams) => Promise<any>;
};
export declare type EngineHookArgs = {
    params: EngineHookParams;
    fetch: (params: EngineHookParams) => Promise<any>;
};
export declare type AllHookCallback = (args: AllHookArgs) => Promise<any>;
export declare type EngineHookCallback = (args: EngineHookArgs) => Promise<any>;
export declare type Hooks = {
    beforeRequest?: (options: HookParams) => any;
};
export declare type LogLevel = 'info' | 'query' | 'warn' | 'error';
export declare type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
};
export declare type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never;
export declare type GetEvents<T extends Array<LogLevel | LogDefinition>> = GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]>;
export declare type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
};
export declare type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
};
export interface GetPrismaClientOptions {
    document: DMMF.Document;
    generator?: GeneratorConfig;
    sqliteDatasourceOverrides?: DatasourceOverwrite[];
    relativePath: string;
    dirname: string;
    clientVersion?: string;
    engineVersion?: string;
}
export declare function getPrismaClient(config: GetPrismaClientOptions): any;
export declare class PrismaClientFetcher {
    prisma: any;
    debug: boolean;
    hooks: any;
    dataloader: Dataloader<{
        document: Document;
        runInTransaction?: boolean;
    }>;
    constructor(prisma: any, enableDebug?: boolean, hooks?: any);
    private _request;
    request(params: {
        document: Document;
        dataPath: string[];
        rootField: string;
        typeName: string;
        isList: boolean;
        clientMethod: string;
        callsite?: string;
        collectTimestamps?: CollectTimestamps;
        runInTransaction?: boolean;
        showColors?: boolean;
        engineHook?: EngineHookCallback;
        allHook?: AllHookCallback;
        args: any;
    }): Promise<any>;
    sanitizeMessage(message: any): any;
    unpack(document: any, data: any, path: any, rootField: any): any;
}
declare class CollectTimestamps {
    records: any[];
    start: any;
    additionalResults: any;
    constructor(startName: any);
    record(name: any): void;
    elapsed(start: any, end: any): number;
    addResults(results: any): void;
    getResults(): any;
}
export declare function getOperation(action: DMMF.ModelAction): 'query' | 'mutation';
export {};
