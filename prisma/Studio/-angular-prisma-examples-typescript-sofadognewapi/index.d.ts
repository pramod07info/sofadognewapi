import {
  DMMF,
  DMMFClass,
  Engine,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  sqltag as sql,
  empty,
  join,
  raw,
} from './runtime';

export { PrismaClientKnownRequestError }
export { PrismaClientUnknownRequestError }
export { PrismaClientRustPanicError }
export { PrismaClientInitializationError }
export { PrismaClientValidationError }

/**
 * Re-export of sql-template-tag
 */
export { sql, empty, join, raw }

/**
 * Prisma Client JS version: 2.2.2
 * Query Engine version: a9e8c3d97ef2a0cf59256e6b26097f2a80f0a6a4
 */
export declare type PrismaVersion = {
  client: string
}

export declare const prismaVersion: PrismaVersion 

/**
 * Utility Types
 */

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON object.
 * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
 */
export declare type JsonObject = {[Key in string]?: JsonValue}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON array.
 */
export declare interface JsonArray extends Array<JsonValue> {}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches any valid JSON value.
 */
export declare type JsonValue = string | number | boolean | null | JsonObject | JsonArray

/**
 * Same as JsonObject, but allows undefined
 */
export declare type InputJsonObject = {[Key in string]?: JsonValue}
 
export declare interface InputJsonArray extends Array<JsonValue> {}
 
export declare type InputJsonValue = undefined |  string | number | boolean | null | InputJsonObject | InputJsonArray

declare type SelectAndInclude = {
  select: any
  include: any
}

declare type HasSelect = {
  select: any
}

declare type HasInclude = {
  include: any
}

declare type CheckSelect<T, S, U> = T extends SelectAndInclude
  ? 'Please either choose `select` or `include`'
  : T extends HasSelect
  ? U
  : T extends HasInclude
  ? U
  : S

/**
 * Get the type of the value, that the Promise holds.
 */
export declare type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

/**
 * Get the return type of a function which returns a Promise.
 */
export declare type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>


export declare type Enumerable<T> = T | Array<T>;

export declare type TrueKeys<T> = {
  [key in keyof T]: T[key] extends false | undefined | null ? never : key
}[keyof T]

/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export declare type Subset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never;
};
declare class PrismaClientFetcher {
  private readonly prisma;
  private readonly debug;
  private readonly hooks?;
  constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
  request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string, collectTimestamps?: any): Promise<T>;
  sanitizeMessage(message: string): string;
  protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
}


/**
 * Client
**/

export declare type Datasource = {
  url?: string
}

export type Datasources = {
  db?: Datasource
}

export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

export interface PrismaClientOptions {
  /**
   * Overwrites the datasource url from your prisma.schema file
   */
  datasources?: Datasources

  /**
   * @default "colorless"
   */
  errorFormat?: ErrorFormat

  /**
   * @example
   * ```
   * // Defaults to stdout
   * log: ['query', 'info', 'warn', 'error']
   * 
   * // Emit as events
   * log: [
   *  { emit: 'stdout', level: 'query' },
   *  { emit: 'stdout', level: 'info' },
   *  { emit: 'stdout', level: 'warn' }
   *  { emit: 'stdout', level: 'error' }
   * ]
   * ```
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
   */
  log?: Array<LogLevel | LogDefinition>
}

export type Hooks = {
  beforeRequest?: (options: {query: string, path: string[], rootField?: string, typeName?: string, document: any}) => any
}

/* Types for Logging */
export type LogLevel = 'info' | 'query' | 'warn' | 'error'
export type LogDefinition = {
  level: LogLevel
  emit: 'stdout' | 'event'
}

export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
export type GetEvents<T extends Array<LogLevel | LogDefinition>> = GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]> 

export type QueryEvent = {
  timestamp: Date
  query: string
  params: string
  duration: number
  target: string
}

export type LogEvent = {
  timestamp: Date
  message: string
  target: string
}
/* End Types for Logging */

// tested in getLogLevel.test.ts
export declare function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Categories
 * const categories = await prisma.categories.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md).
 */
export declare class PrismaClient<
  T extends PrismaClientOptions = PrismaClientOptions,
  U = keyof T extends 'log' ? T['log'] extends Array<LogLevel | LogDefinition> ? GetEvents<T['log']> : never : never
> {
  /**
   * @private
   */
  private fetcher;
  /**
   * @private
   */
  private readonly dmmf;
  /**
   * @private
   */
  private connectionPromise?;
  /**
   * @private
   */
  private disconnectionPromise?;
  /**
   * @private
   */
  private readonly engineConfig;
  /**
   * @private
   */
  private readonly measurePerformance;
  /**
   * @private
   */
  private engine: Engine;
  /**
   * @private
   */
  private errorFormat: ErrorFormat;

  /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js (ORM replacement)
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Categories
   * const categories = await prisma.categories.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md).
   */
  constructor(optionsArg?: T);
  on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * Connect with the database
   */
  connect(): Promise<void>;
  /**
   * @private
   */
  private runDisconnect;
  /**
   * Disconnect from the database
   */
  disconnect(): Promise<any>;

  /**
   * Executes a raw query and returns the number of affected rows
   * @example
   * ```
   * // With parameters use prisma.executeRaw``, values will be escaped automatically
   * const result = await prisma.executeRaw`UPDATE User SET cool = ${true} WHERE id = ${1};`
   * // Or
   * const result = await prisma.executeRaw('UPDATE User SET cool = $1 WHERE id = $2 ;', true, 1)
  * ```
  * 
  * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md#raw-database-access).
  */
  executeRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<number>;

  /**
   * Performs a raw query and returns the SELECT data
   * @example
   * ```
   * // With parameters use prisma.queryRaw``, values will be escaped automatically
   * const result = await prisma.queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'ema.il'};`
   * // Or
   * const result = await prisma.queryRaw('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'ema.il')
  * ```
  * 
  * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md#raw-database-access).
  */
  queryRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<T>;

  /**
   * `prisma.categories`: Exposes CRUD operations for the **categories** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.categories.findMany()
    * ```
    */
  get categories(): categoriesDelegate;

  /**
   * `prisma.events`: Exposes CRUD operations for the **events** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Events
    * const events = await prisma.events.findMany()
    * ```
    */
  get events(): eventsDelegate;

  /**
   * `prisma.feeds`: Exposes CRUD operations for the **feeds** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Feeds
    * const feeds = await prisma.feeds.findMany()
    * ```
    */
  get feeds(): feedsDelegate;
}



/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export declare const OrderByArg: {
  asc: 'asc',
  desc: 'desc'
};

export declare type OrderByArg = (typeof OrderByArg)[keyof typeof OrderByArg]



/**
 * Model categories
 */

export type categories = {
  color: string | null
  created_at: Date | null
  id: number
  is_active: boolean | null
  ordinal: number | null
  title: string | null
  updated_at: Date | null
}



export type categoriesSelect = {
  color?: boolean
  created_at?: boolean
  id?: boolean
  is_active?: boolean
  ordinal?: boolean
  title?: boolean
  updated_at?: boolean
  feeds?: boolean | FindManyfeedsArgs
}

export type categoriesInclude = {
  feeds?: boolean | FindManyfeedsArgs
}

export type categoriesGetPayload<
  S extends boolean | null | undefined | categoriesArgs,
  U = keyof S
> = S extends true
  ? categories
  : S extends undefined
  ? never
  : S extends categoriesArgs | FindManycategoriesArgs
  ? 'include' extends U
    ? categories  & {
      [P in TrueKeys<S['include']>]:
      P extends 'feeds'
      ? Array<feedsGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof categories ? categories[P]
: 
      P extends 'feeds'
      ? Array<feedsGetPayload<S['select'][P]>> : never
    }
  : categories
: categories


export interface categoriesDelegate {
  /**
   * Find zero or one Categories.
   * @param {FindOnecategoriesArgs} args - Arguments to find a Categories
   * @example
   * // Get one Categories
   * const categories = await prisma.categories.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOnecategoriesArgs>(
    args: Subset<T, FindOnecategoriesArgs>
  ): CheckSelect<T, Prisma__categoriesClient<categories | null>, Prisma__categoriesClient<categoriesGetPayload<T> | null>>
  /**
   * Find zero or more Categories.
   * @param {FindManycategoriesArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Categories
   * const categories = await prisma.categories.findMany()
   * 
   * // Get first 10 Categories
   * const categories = await prisma.categories.findMany({ take: 10 })
   * 
   * // Only select the `color`
   * const categoriesWithColorOnly = await prisma.categories.findMany({ select: { color: true } })
   * 
  **/
  findMany<T extends FindManycategoriesArgs>(
    args?: Subset<T, FindManycategoriesArgs>
  ): CheckSelect<T, Promise<Array<categories>>, Promise<Array<categoriesGetPayload<T>>>>
  /**
   * Create a Categories.
   * @param {categoriesCreateArgs} args - Arguments to create a Categories.
   * @example
   * // Create one Categories
   * const Categories = await prisma.categories.create({
   *   data: {
   *     // ... data to create a Categories
   *   }
   * })
   * 
  **/
  create<T extends categoriesCreateArgs>(
    args: Subset<T, categoriesCreateArgs>
  ): CheckSelect<T, Prisma__categoriesClient<categories>, Prisma__categoriesClient<categoriesGetPayload<T>>>
  /**
   * Delete a Categories.
   * @param {categoriesDeleteArgs} args - Arguments to delete one Categories.
   * @example
   * // Delete one Categories
   * const Categories = await prisma.categories.delete({
   *   where: {
   *     // ... filter to delete one Categories
   *   }
   * })
   * 
  **/
  delete<T extends categoriesDeleteArgs>(
    args: Subset<T, categoriesDeleteArgs>
  ): CheckSelect<T, Prisma__categoriesClient<categories>, Prisma__categoriesClient<categoriesGetPayload<T>>>
  /**
   * Update one Categories.
   * @param {categoriesUpdateArgs} args - Arguments to update one Categories.
   * @example
   * // Update one Categories
   * const categories = await prisma.categories.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends categoriesUpdateArgs>(
    args: Subset<T, categoriesUpdateArgs>
  ): CheckSelect<T, Prisma__categoriesClient<categories>, Prisma__categoriesClient<categoriesGetPayload<T>>>
  /**
   * Delete zero or more Categories.
   * @param {categoriesDeleteManyArgs} args - Arguments to filter Categories to delete.
   * @example
   * // Delete a few Categories
   * const { count } = await prisma.categories.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends categoriesDeleteManyArgs>(
    args: Subset<T, categoriesDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Categories.
   * @param {categoriesUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Categories
   * const categories = await prisma.categories.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends categoriesUpdateManyArgs>(
    args: Subset<T, categoriesUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Categories.
   * @param {categoriesUpsertArgs} args - Arguments to update or create a Categories.
   * @example
   * // Update or create a Categories
   * const categories = await prisma.categories.upsert({
   *   create: {
   *     // ... data to create a Categories
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Categories we want to update
   *   }
   * })
  **/
  upsert<T extends categoriesUpsertArgs>(
    args: Subset<T, categoriesUpsertArgs>
  ): CheckSelect<T, Prisma__categoriesClient<categories>, Prisma__categoriesClient<categoriesGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManycategoriesArgs, 'select' | 'include'>): Promise<number>


}

/**
 * The delegate class that acts as a "Promise-like" for categories.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__categoriesClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  feeds<T extends FindManyfeedsArgs = {}>(args?: Subset<T, FindManyfeedsArgs>): CheckSelect<T, Promise<Array<feeds>>, Promise<Array<feedsGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * categories findOne
 */
export type FindOnecategoriesArgs = {
  /**
   * Select specific fields to fetch from the categories
  **/
  select?: categoriesSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: categoriesInclude | null
  /**
   * Filter, which categories to fetch.
  **/
  where: categoriesWhereUniqueInput
}


/**
 * categories findMany
 */
export type FindManycategoriesArgs = {
  /**
   * Select specific fields to fetch from the categories
  **/
  select?: categoriesSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: categoriesInclude | null
  /**
   * Filter, which categories to fetch.
  **/
  where?: categoriesWhereInput
  /**
   * Determine the order of the categories to fetch.
  **/
  orderBy?: categoriesOrderByInput
  /**
   * Sets the position for listing categories.
  **/
  cursor?: categoriesWhereUniqueInput
  /**
   * The number of categories to fetch. If negative number, it will take categories before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` categories.
  **/
  skip?: number
}


/**
 * categories create
 */
export type categoriesCreateArgs = {
  /**
   * Select specific fields to fetch from the categories
  **/
  select?: categoriesSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: categoriesInclude | null
  /**
   * The data needed to create a categories.
  **/
  data: categoriesCreateInput
}


/**
 * categories update
 */
export type categoriesUpdateArgs = {
  /**
   * Select specific fields to fetch from the categories
  **/
  select?: categoriesSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: categoriesInclude | null
  /**
   * The data needed to update a categories.
  **/
  data: categoriesUpdateInput
  /**
   * Choose, which categories to update.
  **/
  where: categoriesWhereUniqueInput
}


/**
 * categories updateMany
 */
export type categoriesUpdateManyArgs = {
  data: categoriesUpdateManyMutationInput
  where?: categoriesWhereInput
}


/**
 * categories upsert
 */
export type categoriesUpsertArgs = {
  /**
   * Select specific fields to fetch from the categories
  **/
  select?: categoriesSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: categoriesInclude | null
  /**
   * The filter to search for the categories to update in case it exists.
  **/
  where: categoriesWhereUniqueInput
  /**
   * In case the categories found by the `where` argument doesn't exist, create a new categories with this data.
  **/
  create: categoriesCreateInput
  /**
   * In case the categories was found with the provided `where` argument, update it with this data.
  **/
  update: categoriesUpdateInput
}


/**
 * categories delete
 */
export type categoriesDeleteArgs = {
  /**
   * Select specific fields to fetch from the categories
  **/
  select?: categoriesSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: categoriesInclude | null
  /**
   * Filter which categories to delete.
  **/
  where: categoriesWhereUniqueInput
}


/**
 * categories deleteMany
 */
export type categoriesDeleteManyArgs = {
  where?: categoriesWhereInput
}


/**
 * categories without action
 */
export type categoriesArgs = {
  /**
   * Select specific fields to fetch from the categories
  **/
  select?: categoriesSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: categoriesInclude | null
}



/**
 * Model events
 */

export type events = {
  context: string | null
  created_at: Date | null
  event: string | null
  id: number
  os: string | null
  timestamp: Date | null
  uid: string | null
  updated_at: Date | null
}



export type eventsSelect = {
  context?: boolean
  created_at?: boolean
  event?: boolean
  id?: boolean
  os?: boolean
  timestamp?: boolean
  uid?: boolean
  updated_at?: boolean
}

export type eventsGetPayload<
  S extends boolean | null | undefined | eventsArgs,
  U = keyof S
> = S extends true
  ? events
  : S extends undefined
  ? never
  : S extends eventsArgs | FindManyeventsArgs
  ? 'include' extends U
    ? events 
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof events ? events[P]
: 
 never
    }
  : events
: events


export interface eventsDelegate {
  /**
   * Find zero or one Events.
   * @param {FindOneeventsArgs} args - Arguments to find a Events
   * @example
   * // Get one Events
   * const events = await prisma.events.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneeventsArgs>(
    args: Subset<T, FindOneeventsArgs>
  ): CheckSelect<T, Prisma__eventsClient<events | null>, Prisma__eventsClient<eventsGetPayload<T> | null>>
  /**
   * Find zero or more Events.
   * @param {FindManyeventsArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Events
   * const events = await prisma.events.findMany()
   * 
   * // Get first 10 Events
   * const events = await prisma.events.findMany({ take: 10 })
   * 
   * // Only select the `context`
   * const eventsWithContextOnly = await prisma.events.findMany({ select: { context: true } })
   * 
  **/
  findMany<T extends FindManyeventsArgs>(
    args?: Subset<T, FindManyeventsArgs>
  ): CheckSelect<T, Promise<Array<events>>, Promise<Array<eventsGetPayload<T>>>>
  /**
   * Create a Events.
   * @param {eventsCreateArgs} args - Arguments to create a Events.
   * @example
   * // Create one Events
   * const Events = await prisma.events.create({
   *   data: {
   *     // ... data to create a Events
   *   }
   * })
   * 
  **/
  create<T extends eventsCreateArgs>(
    args: Subset<T, eventsCreateArgs>
  ): CheckSelect<T, Prisma__eventsClient<events>, Prisma__eventsClient<eventsGetPayload<T>>>
  /**
   * Delete a Events.
   * @param {eventsDeleteArgs} args - Arguments to delete one Events.
   * @example
   * // Delete one Events
   * const Events = await prisma.events.delete({
   *   where: {
   *     // ... filter to delete one Events
   *   }
   * })
   * 
  **/
  delete<T extends eventsDeleteArgs>(
    args: Subset<T, eventsDeleteArgs>
  ): CheckSelect<T, Prisma__eventsClient<events>, Prisma__eventsClient<eventsGetPayload<T>>>
  /**
   * Update one Events.
   * @param {eventsUpdateArgs} args - Arguments to update one Events.
   * @example
   * // Update one Events
   * const events = await prisma.events.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends eventsUpdateArgs>(
    args: Subset<T, eventsUpdateArgs>
  ): CheckSelect<T, Prisma__eventsClient<events>, Prisma__eventsClient<eventsGetPayload<T>>>
  /**
   * Delete zero or more Events.
   * @param {eventsDeleteManyArgs} args - Arguments to filter Events to delete.
   * @example
   * // Delete a few Events
   * const { count } = await prisma.events.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends eventsDeleteManyArgs>(
    args: Subset<T, eventsDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Events.
   * @param {eventsUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Events
   * const events = await prisma.events.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends eventsUpdateManyArgs>(
    args: Subset<T, eventsUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Events.
   * @param {eventsUpsertArgs} args - Arguments to update or create a Events.
   * @example
   * // Update or create a Events
   * const events = await prisma.events.upsert({
   *   create: {
   *     // ... data to create a Events
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Events we want to update
   *   }
   * })
  **/
  upsert<T extends eventsUpsertArgs>(
    args: Subset<T, eventsUpsertArgs>
  ): CheckSelect<T, Prisma__eventsClient<events>, Prisma__eventsClient<eventsGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyeventsArgs, 'select' | 'include'>): Promise<number>


}

/**
 * The delegate class that acts as a "Promise-like" for events.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__eventsClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';


  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * events findOne
 */
export type FindOneeventsArgs = {
  /**
   * Select specific fields to fetch from the events
  **/
  select?: eventsSelect | null
  /**
   * Filter, which events to fetch.
  **/
  where: eventsWhereUniqueInput
}


/**
 * events findMany
 */
export type FindManyeventsArgs = {
  /**
   * Select specific fields to fetch from the events
  **/
  select?: eventsSelect | null
  /**
   * Filter, which events to fetch.
  **/
  where?: eventsWhereInput
  /**
   * Determine the order of the events to fetch.
  **/
  orderBy?: eventsOrderByInput
  /**
   * Sets the position for listing events.
  **/
  cursor?: eventsWhereUniqueInput
  /**
   * The number of events to fetch. If negative number, it will take events before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` events.
  **/
  skip?: number
}


/**
 * events create
 */
export type eventsCreateArgs = {
  /**
   * Select specific fields to fetch from the events
  **/
  select?: eventsSelect | null
  /**
   * The data needed to create a events.
  **/
  data: eventsCreateInput
}


/**
 * events update
 */
export type eventsUpdateArgs = {
  /**
   * Select specific fields to fetch from the events
  **/
  select?: eventsSelect | null
  /**
   * The data needed to update a events.
  **/
  data: eventsUpdateInput
  /**
   * Choose, which events to update.
  **/
  where: eventsWhereUniqueInput
}


/**
 * events updateMany
 */
export type eventsUpdateManyArgs = {
  data: eventsUpdateManyMutationInput
  where?: eventsWhereInput
}


/**
 * events upsert
 */
export type eventsUpsertArgs = {
  /**
   * Select specific fields to fetch from the events
  **/
  select?: eventsSelect | null
  /**
   * The filter to search for the events to update in case it exists.
  **/
  where: eventsWhereUniqueInput
  /**
   * In case the events found by the `where` argument doesn't exist, create a new events with this data.
  **/
  create: eventsCreateInput
  /**
   * In case the events was found with the provided `where` argument, update it with this data.
  **/
  update: eventsUpdateInput
}


/**
 * events delete
 */
export type eventsDeleteArgs = {
  /**
   * Select specific fields to fetch from the events
  **/
  select?: eventsSelect | null
  /**
   * Filter which events to delete.
  **/
  where: eventsWhereUniqueInput
}


/**
 * events deleteMany
 */
export type eventsDeleteManyArgs = {
  where?: eventsWhereInput
}


/**
 * events without action
 */
export type eventsArgs = {
  /**
   * Select specific fields to fetch from the events
  **/
  select?: eventsSelect | null
}



/**
 * Model feeds
 */

export type feeds = {
  category: number | null
  credits: string | null
  enqueued: Date | null
  id: number
  ordinal: number | null
  published: boolean | null
  rejected: boolean | null
  title: string | null
  url: string | null
}



export type feedsSelect = {
  category?: boolean
  credits?: boolean
  enqueued?: boolean
  id?: boolean
  ordinal?: boolean
  published?: boolean
  rejected?: boolean
  title?: boolean
  url?: boolean
  categories?: boolean | categoriesArgs
}

export type feedsInclude = {
  categories?: boolean | categoriesArgs
}

export type feedsGetPayload<
  S extends boolean | null | undefined | feedsArgs,
  U = keyof S
> = S extends true
  ? feeds
  : S extends undefined
  ? never
  : S extends feedsArgs | FindManyfeedsArgs
  ? 'include' extends U
    ? feeds  & {
      [P in TrueKeys<S['include']>]:
      P extends 'categories'
      ? categoriesGetPayload<S['include'][P]> | null : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof feeds ? feeds[P]
: 
      P extends 'categories'
      ? categoriesGetPayload<S['select'][P]> | null : never
    }
  : feeds
: feeds


export interface feedsDelegate {
  /**
   * Find zero or one Feeds.
   * @param {FindOnefeedsArgs} args - Arguments to find a Feeds
   * @example
   * // Get one Feeds
   * const feeds = await prisma.feeds.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOnefeedsArgs>(
    args: Subset<T, FindOnefeedsArgs>
  ): CheckSelect<T, Prisma__feedsClient<feeds | null>, Prisma__feedsClient<feedsGetPayload<T> | null>>
  /**
   * Find zero or more Feeds.
   * @param {FindManyfeedsArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Feeds
   * const feeds = await prisma.feeds.findMany()
   * 
   * // Get first 10 Feeds
   * const feeds = await prisma.feeds.findMany({ take: 10 })
   * 
   * // Only select the `category`
   * const feedsWithCategoryOnly = await prisma.feeds.findMany({ select: { category: true } })
   * 
  **/
  findMany<T extends FindManyfeedsArgs>(
    args?: Subset<T, FindManyfeedsArgs>
  ): CheckSelect<T, Promise<Array<feeds>>, Promise<Array<feedsGetPayload<T>>>>
  /**
   * Create a Feeds.
   * @param {feedsCreateArgs} args - Arguments to create a Feeds.
   * @example
   * // Create one Feeds
   * const Feeds = await prisma.feeds.create({
   *   data: {
   *     // ... data to create a Feeds
   *   }
   * })
   * 
  **/
  create<T extends feedsCreateArgs>(
    args: Subset<T, feedsCreateArgs>
  ): CheckSelect<T, Prisma__feedsClient<feeds>, Prisma__feedsClient<feedsGetPayload<T>>>
  /**
   * Delete a Feeds.
   * @param {feedsDeleteArgs} args - Arguments to delete one Feeds.
   * @example
   * // Delete one Feeds
   * const Feeds = await prisma.feeds.delete({
   *   where: {
   *     // ... filter to delete one Feeds
   *   }
   * })
   * 
  **/
  delete<T extends feedsDeleteArgs>(
    args: Subset<T, feedsDeleteArgs>
  ): CheckSelect<T, Prisma__feedsClient<feeds>, Prisma__feedsClient<feedsGetPayload<T>>>
  /**
   * Update one Feeds.
   * @param {feedsUpdateArgs} args - Arguments to update one Feeds.
   * @example
   * // Update one Feeds
   * const feeds = await prisma.feeds.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends feedsUpdateArgs>(
    args: Subset<T, feedsUpdateArgs>
  ): CheckSelect<T, Prisma__feedsClient<feeds>, Prisma__feedsClient<feedsGetPayload<T>>>
  /**
   * Delete zero or more Feeds.
   * @param {feedsDeleteManyArgs} args - Arguments to filter Feeds to delete.
   * @example
   * // Delete a few Feeds
   * const { count } = await prisma.feeds.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends feedsDeleteManyArgs>(
    args: Subset<T, feedsDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Feeds.
   * @param {feedsUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Feeds
   * const feeds = await prisma.feeds.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends feedsUpdateManyArgs>(
    args: Subset<T, feedsUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Feeds.
   * @param {feedsUpsertArgs} args - Arguments to update or create a Feeds.
   * @example
   * // Update or create a Feeds
   * const feeds = await prisma.feeds.upsert({
   *   create: {
   *     // ... data to create a Feeds
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Feeds we want to update
   *   }
   * })
  **/
  upsert<T extends feedsUpsertArgs>(
    args: Subset<T, feedsUpsertArgs>
  ): CheckSelect<T, Prisma__feedsClient<feeds>, Prisma__feedsClient<feedsGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyfeedsArgs, 'select' | 'include'>): Promise<number>


}

/**
 * The delegate class that acts as a "Promise-like" for feeds.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__feedsClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  categories<T extends categoriesArgs = {}>(args?: Subset<T, categoriesArgs>): CheckSelect<T, Prisma__categoriesClient<categories | null>, Prisma__categoriesClient<categoriesGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * feeds findOne
 */
export type FindOnefeedsArgs = {
  /**
   * Select specific fields to fetch from the feeds
  **/
  select?: feedsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: feedsInclude | null
  /**
   * Filter, which feeds to fetch.
  **/
  where: feedsWhereUniqueInput
}


/**
 * feeds findMany
 */
export type FindManyfeedsArgs = {
  /**
   * Select specific fields to fetch from the feeds
  **/
  select?: feedsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: feedsInclude | null
  /**
   * Filter, which feeds to fetch.
  **/
  where?: feedsWhereInput
  /**
   * Determine the order of the feeds to fetch.
  **/
  orderBy?: feedsOrderByInput
  /**
   * Sets the position for listing feeds.
  **/
  cursor?: feedsWhereUniqueInput
  /**
   * The number of feeds to fetch. If negative number, it will take feeds before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` feeds.
  **/
  skip?: number
}


/**
 * feeds create
 */
export type feedsCreateArgs = {
  /**
   * Select specific fields to fetch from the feeds
  **/
  select?: feedsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: feedsInclude | null
  /**
   * The data needed to create a feeds.
  **/
  data: feedsCreateInput
}


/**
 * feeds update
 */
export type feedsUpdateArgs = {
  /**
   * Select specific fields to fetch from the feeds
  **/
  select?: feedsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: feedsInclude | null
  /**
   * The data needed to update a feeds.
  **/
  data: feedsUpdateInput
  /**
   * Choose, which feeds to update.
  **/
  where: feedsWhereUniqueInput
}


/**
 * feeds updateMany
 */
export type feedsUpdateManyArgs = {
  data: feedsUpdateManyMutationInput
  where?: feedsWhereInput
}


/**
 * feeds upsert
 */
export type feedsUpsertArgs = {
  /**
   * Select specific fields to fetch from the feeds
  **/
  select?: feedsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: feedsInclude | null
  /**
   * The filter to search for the feeds to update in case it exists.
  **/
  where: feedsWhereUniqueInput
  /**
   * In case the feeds found by the `where` argument doesn't exist, create a new feeds with this data.
  **/
  create: feedsCreateInput
  /**
   * In case the feeds was found with the provided `where` argument, update it with this data.
  **/
  update: feedsUpdateInput
}


/**
 * feeds delete
 */
export type feedsDeleteArgs = {
  /**
   * Select specific fields to fetch from the feeds
  **/
  select?: feedsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: feedsInclude | null
  /**
   * Filter which feeds to delete.
  **/
  where: feedsWhereUniqueInput
}


/**
 * feeds deleteMany
 */
export type feedsDeleteManyArgs = {
  where?: feedsWhereInput
}


/**
 * feeds without action
 */
export type feedsArgs = {
  /**
   * Select specific fields to fetch from the feeds
  **/
  select?: feedsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: feedsInclude | null
}



/**
 * Deep Input Types
 */


export type feedsWhereInput = {
  category?: number | NullableIntFilter | null
  credits?: string | NullableStringFilter | null
  enqueued?: Date | string | NullableDateTimeFilter | null
  id?: number | IntFilter
  ordinal?: number | NullableIntFilter | null
  published?: boolean | NullableBooleanFilter | null
  rejected?: boolean | NullableBooleanFilter | null
  title?: string | NullableStringFilter | null
  url?: string | NullableStringFilter | null
  AND?: Enumerable<feedsWhereInput>
  OR?: Array<feedsWhereInput>
  NOT?: Enumerable<feedsWhereInput>
  categories?: categoriesWhereInput | null
}

export type categoriesWhereInput = {
  color?: string | NullableStringFilter | null
  created_at?: Date | string | NullableDateTimeFilter | null
  id?: number | IntFilter
  is_active?: boolean | NullableBooleanFilter | null
  ordinal?: number | NullableIntFilter | null
  title?: string | NullableStringFilter | null
  updated_at?: Date | string | NullableDateTimeFilter | null
  feeds?: feedsFilter | null
  AND?: Enumerable<categoriesWhereInput>
  OR?: Array<categoriesWhereInput>
  NOT?: Enumerable<categoriesWhereInput>
}

export type categoriesWhereUniqueInput = {
  id?: number
}

export type feedsWhereUniqueInput = {
  id?: number
}

export type eventsWhereInput = {
  context?: string | NullableStringFilter | null
  created_at?: Date | string | NullableDateTimeFilter | null
  event?: string | NullableStringFilter | null
  id?: number | IntFilter
  os?: string | NullableStringFilter | null
  timestamp?: Date | string | NullableDateTimeFilter | null
  uid?: string | NullableStringFilter | null
  updated_at?: Date | string | NullableDateTimeFilter | null
  AND?: Enumerable<eventsWhereInput>
  OR?: Array<eventsWhereInput>
  NOT?: Enumerable<eventsWhereInput>
}

export type eventsWhereUniqueInput = {
  id?: number
}

export type feedsCreateWithoutCategoriesInput = {
  credits?: string | null
  enqueued?: Date | string | null
  ordinal?: number | null
  published?: boolean | null
  rejected?: boolean | null
  title?: string | null
  url?: string | null
}

export type feedsCreateManyWithoutCategoriesInput = {
  create?: Enumerable<feedsCreateWithoutCategoriesInput>
  connect?: Enumerable<feedsWhereUniqueInput>
}

export type categoriesCreateInput = {
  color?: string | null
  created_at?: Date | string | null
  is_active?: boolean | null
  ordinal?: number | null
  title?: string | null
  updated_at?: Date | string | null
  feeds?: feedsCreateManyWithoutCategoriesInput | null
}

export type feedsUpdateWithoutCategoriesDataInput = {
  credits?: string | null
  enqueued?: Date | string | null
  id?: number
  ordinal?: number | null
  published?: boolean | null
  rejected?: boolean | null
  title?: string | null
  url?: string | null
}

export type feedsUpdateWithWhereUniqueWithoutCategoriesInput = {
  where: feedsWhereUniqueInput
  data: feedsUpdateWithoutCategoriesDataInput
}

export type feedsScalarWhereInput = {
  category?: number | NullableIntFilter | null
  credits?: string | NullableStringFilter | null
  enqueued?: Date | string | NullableDateTimeFilter | null
  id?: number | IntFilter
  ordinal?: number | NullableIntFilter | null
  published?: boolean | NullableBooleanFilter | null
  rejected?: boolean | NullableBooleanFilter | null
  title?: string | NullableStringFilter | null
  url?: string | NullableStringFilter | null
  AND?: Enumerable<feedsScalarWhereInput>
  OR?: Array<feedsScalarWhereInput>
  NOT?: Enumerable<feedsScalarWhereInput>
}

export type feedsUpdateManyDataInput = {
  credits?: string | null
  enqueued?: Date | string | null
  id?: number
  ordinal?: number | null
  published?: boolean | null
  rejected?: boolean | null
  title?: string | null
  url?: string | null
}

export type feedsUpdateManyWithWhereNestedInput = {
  where: feedsScalarWhereInput
  data: feedsUpdateManyDataInput
}

export type feedsUpsertWithWhereUniqueWithoutCategoriesInput = {
  where: feedsWhereUniqueInput
  update: feedsUpdateWithoutCategoriesDataInput
  create: feedsCreateWithoutCategoriesInput
}

export type feedsUpdateManyWithoutCategoriesInput = {
  create?: Enumerable<feedsCreateWithoutCategoriesInput>
  connect?: Enumerable<feedsWhereUniqueInput>
  set?: Enumerable<feedsWhereUniqueInput>
  disconnect?: Enumerable<feedsWhereUniqueInput>
  delete?: Enumerable<feedsWhereUniqueInput>
  update?: Enumerable<feedsUpdateWithWhereUniqueWithoutCategoriesInput>
  updateMany?: Enumerable<feedsUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<feedsScalarWhereInput>
  upsert?: Enumerable<feedsUpsertWithWhereUniqueWithoutCategoriesInput>
}

export type categoriesUpdateInput = {
  color?: string | null
  created_at?: Date | string | null
  id?: number
  is_active?: boolean | null
  ordinal?: number | null
  title?: string | null
  updated_at?: Date | string | null
  feeds?: feedsUpdateManyWithoutCategoriesInput | null
}

export type categoriesUpdateManyMutationInput = {
  color?: string | null
  created_at?: Date | string | null
  id?: number
  is_active?: boolean | null
  ordinal?: number | null
  title?: string | null
  updated_at?: Date | string | null
}

export type eventsCreateInput = {
  context?: string | null
  created_at?: Date | string | null
  event?: string | null
  os?: string | null
  timestamp?: Date | string | null
  uid?: string | null
  updated_at?: Date | string | null
}

export type eventsUpdateInput = {
  context?: string | null
  created_at?: Date | string | null
  event?: string | null
  id?: number
  os?: string | null
  timestamp?: Date | string | null
  uid?: string | null
  updated_at?: Date | string | null
}

export type eventsUpdateManyMutationInput = {
  context?: string | null
  created_at?: Date | string | null
  event?: string | null
  id?: number
  os?: string | null
  timestamp?: Date | string | null
  uid?: string | null
  updated_at?: Date | string | null
}

export type categoriesCreateWithoutFeedsInput = {
  color?: string | null
  created_at?: Date | string | null
  is_active?: boolean | null
  ordinal?: number | null
  title?: string | null
  updated_at?: Date | string | null
}

export type categoriesCreateOneWithoutFeedsInput = {
  create?: categoriesCreateWithoutFeedsInput
  connect?: categoriesWhereUniqueInput
}

export type feedsCreateInput = {
  credits?: string | null
  enqueued?: Date | string | null
  ordinal?: number | null
  published?: boolean | null
  rejected?: boolean | null
  title?: string | null
  url?: string | null
  categories?: categoriesCreateOneWithoutFeedsInput | null
}

export type categoriesUpdateWithoutFeedsDataInput = {
  color?: string | null
  created_at?: Date | string | null
  id?: number
  is_active?: boolean | null
  ordinal?: number | null
  title?: string | null
  updated_at?: Date | string | null
}

export type categoriesUpsertWithoutFeedsInput = {
  update: categoriesUpdateWithoutFeedsDataInput
  create: categoriesCreateWithoutFeedsInput
}

export type categoriesUpdateOneWithoutFeedsInput = {
  create?: categoriesCreateWithoutFeedsInput
  connect?: categoriesWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: categoriesUpdateWithoutFeedsDataInput
  upsert?: categoriesUpsertWithoutFeedsInput
}

export type feedsUpdateInput = {
  credits?: string | null
  enqueued?: Date | string | null
  id?: number
  ordinal?: number | null
  published?: boolean | null
  rejected?: boolean | null
  title?: string | null
  url?: string | null
  categories?: categoriesUpdateOneWithoutFeedsInput | null
}

export type feedsUpdateManyMutationInput = {
  credits?: string | null
  enqueued?: Date | string | null
  id?: number
  ordinal?: number | null
  published?: boolean | null
  rejected?: boolean | null
  title?: string | null
  url?: string | null
}

export type NullableIntFilter = {
  equals?: number | null
  not?: number | null | NullableIntFilter
  in?: Enumerable<number> | null
  notIn?: Enumerable<number> | null
  lt?: number | null
  lte?: number | null
  gt?: number | null
  gte?: number | null
}

export type NullableStringFilter = {
  equals?: string | null
  not?: string | null | NullableStringFilter
  in?: Enumerable<string> | null
  notIn?: Enumerable<string> | null
  lt?: string | null
  lte?: string | null
  gt?: string | null
  gte?: string | null
  contains?: string | null
  startsWith?: string | null
  endsWith?: string | null
}

export type NullableDateTimeFilter = {
  equals?: Date | string | null
  not?: Date | string | null | NullableDateTimeFilter
  in?: Enumerable<Date | string> | null
  notIn?: Enumerable<Date | string> | null
  lt?: Date | string | null
  lte?: Date | string | null
  gt?: Date | string | null
  gte?: Date | string | null
}

export type IntFilter = {
  equals?: number
  not?: number | IntFilter
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
}

export type NullableBooleanFilter = {
  equals?: boolean | null
  not?: boolean | null | NullableBooleanFilter
}

export type feedsFilter = {
  every?: feedsWhereInput
  some?: feedsWhereInput
  none?: feedsWhereInput
}

export type categoriesOrderByInput = {
  color?: OrderByArg | null
  created_at?: OrderByArg | null
  id?: OrderByArg | null
  is_active?: OrderByArg | null
  ordinal?: OrderByArg | null
  title?: OrderByArg | null
  updated_at?: OrderByArg | null
}

export type feedsOrderByInput = {
  category?: OrderByArg | null
  credits?: OrderByArg | null
  enqueued?: OrderByArg | null
  id?: OrderByArg | null
  ordinal?: OrderByArg | null
  published?: OrderByArg | null
  rejected?: OrderByArg | null
  title?: OrderByArg | null
  url?: OrderByArg | null
}

export type eventsOrderByInput = {
  context?: OrderByArg | null
  created_at?: OrderByArg | null
  event?: OrderByArg | null
  id?: OrderByArg | null
  os?: OrderByArg | null
  timestamp?: OrderByArg | null
  uid?: OrderByArg | null
  updated_at?: OrderByArg | null
}

/**
 * Batch Payload for updateMany & deleteMany
 */

export type BatchPayload = {
  count: number
}

/**
 * DMMF
 */
export declare const dmmf: DMMF.Document;
export {};
