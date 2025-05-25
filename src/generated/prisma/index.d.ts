
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Post
 * 
 */
export type Post = $Result.DefaultSelection<Prisma.$PostPayload>
/**
 * Model Recipe
 * 
 */
export type Recipe = $Result.DefaultSelection<Prisma.$RecipePayload>
/**
 * Model RecipeCategory
 * 
 */
export type RecipeCategory = $Result.DefaultSelection<Prisma.$RecipeCategoryPayload>
/**
 * Model NewsletterSubscription
 * 
 */
export type NewsletterSubscription = $Result.DefaultSelection<Prisma.$NewsletterSubscriptionPayload>
/**
 * Model NewsletterIssue
 * 
 */
export type NewsletterIssue = $Result.DefaultSelection<Prisma.$NewsletterIssuePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const NewsletterStatus: {
  DRAFT: 'DRAFT',
  READY_TO_SEND: 'READY_TO_SEND',
  SENT: 'SENT',
  ARCHIVED: 'ARCHIVED'
};

export type NewsletterStatus = (typeof NewsletterStatus)[keyof typeof NewsletterStatus]

}

export type NewsletterStatus = $Enums.NewsletterStatus

export const NewsletterStatus: typeof $Enums.NewsletterStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Posts
 * const posts = await prisma.post.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Posts
   * const posts = await prisma.post.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.post`: Exposes CRUD operations for the **Post** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Posts
    * const posts = await prisma.post.findMany()
    * ```
    */
  get post(): Prisma.PostDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.recipe`: Exposes CRUD operations for the **Recipe** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Recipes
    * const recipes = await prisma.recipe.findMany()
    * ```
    */
  get recipe(): Prisma.RecipeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.recipeCategory`: Exposes CRUD operations for the **RecipeCategory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RecipeCategories
    * const recipeCategories = await prisma.recipeCategory.findMany()
    * ```
    */
  get recipeCategory(): Prisma.RecipeCategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.newsletterSubscription`: Exposes CRUD operations for the **NewsletterSubscription** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NewsletterSubscriptions
    * const newsletterSubscriptions = await prisma.newsletterSubscription.findMany()
    * ```
    */
  get newsletterSubscription(): Prisma.NewsletterSubscriptionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.newsletterIssue`: Exposes CRUD operations for the **NewsletterIssue** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NewsletterIssues
    * const newsletterIssues = await prisma.newsletterIssue.findMany()
    * ```
    */
  get newsletterIssue(): Prisma.NewsletterIssueDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Post: 'Post',
    Recipe: 'Recipe',
    RecipeCategory: 'RecipeCategory',
    NewsletterSubscription: 'NewsletterSubscription',
    NewsletterIssue: 'NewsletterIssue'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "post" | "recipe" | "recipeCategory" | "newsletterSubscription" | "newsletterIssue"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Post: {
        payload: Prisma.$PostPayload<ExtArgs>
        fields: Prisma.PostFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PostFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PostFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          findFirst: {
            args: Prisma.PostFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PostFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          findMany: {
            args: Prisma.PostFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          create: {
            args: Prisma.PostCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          createMany: {
            args: Prisma.PostCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PostCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          delete: {
            args: Prisma.PostDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          update: {
            args: Prisma.PostUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          deleteMany: {
            args: Prisma.PostDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PostUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PostUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          upsert: {
            args: Prisma.PostUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          aggregate: {
            args: Prisma.PostAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePost>
          }
          groupBy: {
            args: Prisma.PostGroupByArgs<ExtArgs>
            result: $Utils.Optional<PostGroupByOutputType>[]
          }
          count: {
            args: Prisma.PostCountArgs<ExtArgs>
            result: $Utils.Optional<PostCountAggregateOutputType> | number
          }
        }
      }
      Recipe: {
        payload: Prisma.$RecipePayload<ExtArgs>
        fields: Prisma.RecipeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RecipeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RecipeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload>
          }
          findFirst: {
            args: Prisma.RecipeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RecipeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload>
          }
          findMany: {
            args: Prisma.RecipeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload>[]
          }
          create: {
            args: Prisma.RecipeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload>
          }
          createMany: {
            args: Prisma.RecipeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RecipeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload>[]
          }
          delete: {
            args: Prisma.RecipeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload>
          }
          update: {
            args: Prisma.RecipeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload>
          }
          deleteMany: {
            args: Prisma.RecipeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RecipeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RecipeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload>[]
          }
          upsert: {
            args: Prisma.RecipeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload>
          }
          aggregate: {
            args: Prisma.RecipeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRecipe>
          }
          groupBy: {
            args: Prisma.RecipeGroupByArgs<ExtArgs>
            result: $Utils.Optional<RecipeGroupByOutputType>[]
          }
          count: {
            args: Prisma.RecipeCountArgs<ExtArgs>
            result: $Utils.Optional<RecipeCountAggregateOutputType> | number
          }
        }
      }
      RecipeCategory: {
        payload: Prisma.$RecipeCategoryPayload<ExtArgs>
        fields: Prisma.RecipeCategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RecipeCategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeCategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RecipeCategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeCategoryPayload>
          }
          findFirst: {
            args: Prisma.RecipeCategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeCategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RecipeCategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeCategoryPayload>
          }
          findMany: {
            args: Prisma.RecipeCategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeCategoryPayload>[]
          }
          create: {
            args: Prisma.RecipeCategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeCategoryPayload>
          }
          createMany: {
            args: Prisma.RecipeCategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RecipeCategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeCategoryPayload>[]
          }
          delete: {
            args: Prisma.RecipeCategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeCategoryPayload>
          }
          update: {
            args: Prisma.RecipeCategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeCategoryPayload>
          }
          deleteMany: {
            args: Prisma.RecipeCategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RecipeCategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RecipeCategoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeCategoryPayload>[]
          }
          upsert: {
            args: Prisma.RecipeCategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeCategoryPayload>
          }
          aggregate: {
            args: Prisma.RecipeCategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRecipeCategory>
          }
          groupBy: {
            args: Prisma.RecipeCategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<RecipeCategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.RecipeCategoryCountArgs<ExtArgs>
            result: $Utils.Optional<RecipeCategoryCountAggregateOutputType> | number
          }
        }
      }
      NewsletterSubscription: {
        payload: Prisma.$NewsletterSubscriptionPayload<ExtArgs>
        fields: Prisma.NewsletterSubscriptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NewsletterSubscriptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NewsletterSubscriptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriptionPayload>
          }
          findFirst: {
            args: Prisma.NewsletterSubscriptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NewsletterSubscriptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriptionPayload>
          }
          findMany: {
            args: Prisma.NewsletterSubscriptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriptionPayload>[]
          }
          create: {
            args: Prisma.NewsletterSubscriptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriptionPayload>
          }
          createMany: {
            args: Prisma.NewsletterSubscriptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NewsletterSubscriptionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriptionPayload>[]
          }
          delete: {
            args: Prisma.NewsletterSubscriptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriptionPayload>
          }
          update: {
            args: Prisma.NewsletterSubscriptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriptionPayload>
          }
          deleteMany: {
            args: Prisma.NewsletterSubscriptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NewsletterSubscriptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NewsletterSubscriptionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriptionPayload>[]
          }
          upsert: {
            args: Prisma.NewsletterSubscriptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriptionPayload>
          }
          aggregate: {
            args: Prisma.NewsletterSubscriptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNewsletterSubscription>
          }
          groupBy: {
            args: Prisma.NewsletterSubscriptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<NewsletterSubscriptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.NewsletterSubscriptionCountArgs<ExtArgs>
            result: $Utils.Optional<NewsletterSubscriptionCountAggregateOutputType> | number
          }
        }
      }
      NewsletterIssue: {
        payload: Prisma.$NewsletterIssuePayload<ExtArgs>
        fields: Prisma.NewsletterIssueFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NewsletterIssueFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterIssuePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NewsletterIssueFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterIssuePayload>
          }
          findFirst: {
            args: Prisma.NewsletterIssueFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterIssuePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NewsletterIssueFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterIssuePayload>
          }
          findMany: {
            args: Prisma.NewsletterIssueFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterIssuePayload>[]
          }
          create: {
            args: Prisma.NewsletterIssueCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterIssuePayload>
          }
          createMany: {
            args: Prisma.NewsletterIssueCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NewsletterIssueCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterIssuePayload>[]
          }
          delete: {
            args: Prisma.NewsletterIssueDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterIssuePayload>
          }
          update: {
            args: Prisma.NewsletterIssueUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterIssuePayload>
          }
          deleteMany: {
            args: Prisma.NewsletterIssueDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NewsletterIssueUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NewsletterIssueUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterIssuePayload>[]
          }
          upsert: {
            args: Prisma.NewsletterIssueUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterIssuePayload>
          }
          aggregate: {
            args: Prisma.NewsletterIssueAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNewsletterIssue>
          }
          groupBy: {
            args: Prisma.NewsletterIssueGroupByArgs<ExtArgs>
            result: $Utils.Optional<NewsletterIssueGroupByOutputType>[]
          }
          count: {
            args: Prisma.NewsletterIssueCountArgs<ExtArgs>
            result: $Utils.Optional<NewsletterIssueCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
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
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    post?: PostOmit
    recipe?: RecipeOmit
    recipeCategory?: RecipeCategoryOmit
    newsletterSubscription?: NewsletterSubscriptionOmit
    newsletterIssue?: NewsletterIssueOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

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


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type RecipeCategoryCountOutputType
   */

  export type RecipeCategoryCountOutputType = {
    recipes: number
  }

  export type RecipeCategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    recipes?: boolean | RecipeCategoryCountOutputTypeCountRecipesArgs
  }

  // Custom InputTypes
  /**
   * RecipeCategoryCountOutputType without action
   */
  export type RecipeCategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeCategoryCountOutputType
     */
    select?: RecipeCategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RecipeCategoryCountOutputType without action
   */
  export type RecipeCategoryCountOutputTypeCountRecipesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecipeWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Post
   */

  export type AggregatePost = {
    _count: PostCountAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  export type PostMinAggregateOutputType = {
    id: string | null
    title: string | null
    slug: string | null
    description: string | null
    content: string | null
    imageUrl: string | null
    published: boolean | null
    category: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PostMaxAggregateOutputType = {
    id: string | null
    title: string | null
    slug: string | null
    description: string | null
    content: string | null
    imageUrl: string | null
    published: boolean | null
    category: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PostCountAggregateOutputType = {
    id: number
    title: number
    slug: number
    description: number
    content: number
    imageUrl: number
    published: number
    category: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PostMinAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    description?: true
    content?: true
    imageUrl?: true
    published?: true
    category?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PostMaxAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    description?: true
    content?: true
    imageUrl?: true
    published?: true
    category?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PostCountAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    description?: true
    content?: true
    imageUrl?: true
    published?: true
    category?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PostAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Post to aggregate.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Posts
    **/
    _count?: true | PostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostMaxAggregateInputType
  }

  export type GetPostAggregateType<T extends PostAggregateArgs> = {
        [P in keyof T & keyof AggregatePost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePost[P]>
      : GetScalarType<T[P], AggregatePost[P]>
  }




  export type PostGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostWhereInput
    orderBy?: PostOrderByWithAggregationInput | PostOrderByWithAggregationInput[]
    by: PostScalarFieldEnum[] | PostScalarFieldEnum
    having?: PostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostCountAggregateInputType | true
    _min?: PostMinAggregateInputType
    _max?: PostMaxAggregateInputType
  }

  export type PostGroupByOutputType = {
    id: string
    title: string
    slug: string
    description: string | null
    content: string
    imageUrl: string | null
    published: boolean
    category: string | null
    createdAt: Date
    updatedAt: Date
    _count: PostCountAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  type GetPostGroupByPayload<T extends PostGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostGroupByOutputType[P]>
            : GetScalarType<T[P], PostGroupByOutputType[P]>
        }
      >
    >


  export type PostSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    slug?: boolean
    description?: boolean
    content?: boolean
    imageUrl?: boolean
    published?: boolean
    category?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["post"]>

  export type PostSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    slug?: boolean
    description?: boolean
    content?: boolean
    imageUrl?: boolean
    published?: boolean
    category?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["post"]>

  export type PostSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    slug?: boolean
    description?: boolean
    content?: boolean
    imageUrl?: boolean
    published?: boolean
    category?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["post"]>

  export type PostSelectScalar = {
    id?: boolean
    title?: boolean
    slug?: boolean
    description?: boolean
    content?: boolean
    imageUrl?: boolean
    published?: boolean
    category?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PostOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "slug" | "description" | "content" | "imageUrl" | "published" | "category" | "createdAt" | "updatedAt", ExtArgs["result"]["post"]>

  export type $PostPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Post"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      slug: string
      description: string | null
      content: string
      imageUrl: string | null
      published: boolean
      category: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["post"]>
    composites: {}
  }

  type PostGetPayload<S extends boolean | null | undefined | PostDefaultArgs> = $Result.GetResult<Prisma.$PostPayload, S>

  type PostCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PostFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PostCountAggregateInputType | true
    }

  export interface PostDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Post'], meta: { name: 'Post' } }
    /**
     * Find zero or one Post that matches the filter.
     * @param {PostFindUniqueArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PostFindUniqueArgs>(args: SelectSubset<T, PostFindUniqueArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Post that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PostFindUniqueOrThrowArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PostFindUniqueOrThrowArgs>(args: SelectSubset<T, PostFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Post that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindFirstArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PostFindFirstArgs>(args?: SelectSubset<T, PostFindFirstArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Post that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindFirstOrThrowArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PostFindFirstOrThrowArgs>(args?: SelectSubset<T, PostFindFirstOrThrowArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Posts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Posts
     * const posts = await prisma.post.findMany()
     * 
     * // Get first 10 Posts
     * const posts = await prisma.post.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const postWithIdOnly = await prisma.post.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PostFindManyArgs>(args?: SelectSubset<T, PostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Post.
     * @param {PostCreateArgs} args - Arguments to create a Post.
     * @example
     * // Create one Post
     * const Post = await prisma.post.create({
     *   data: {
     *     // ... data to create a Post
     *   }
     * })
     * 
     */
    create<T extends PostCreateArgs>(args: SelectSubset<T, PostCreateArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Posts.
     * @param {PostCreateManyArgs} args - Arguments to create many Posts.
     * @example
     * // Create many Posts
     * const post = await prisma.post.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PostCreateManyArgs>(args?: SelectSubset<T, PostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Posts and returns the data saved in the database.
     * @param {PostCreateManyAndReturnArgs} args - Arguments to create many Posts.
     * @example
     * // Create many Posts
     * const post = await prisma.post.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Posts and only return the `id`
     * const postWithIdOnly = await prisma.post.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PostCreateManyAndReturnArgs>(args?: SelectSubset<T, PostCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Post.
     * @param {PostDeleteArgs} args - Arguments to delete one Post.
     * @example
     * // Delete one Post
     * const Post = await prisma.post.delete({
     *   where: {
     *     // ... filter to delete one Post
     *   }
     * })
     * 
     */
    delete<T extends PostDeleteArgs>(args: SelectSubset<T, PostDeleteArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Post.
     * @param {PostUpdateArgs} args - Arguments to update one Post.
     * @example
     * // Update one Post
     * const post = await prisma.post.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PostUpdateArgs>(args: SelectSubset<T, PostUpdateArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Posts.
     * @param {PostDeleteManyArgs} args - Arguments to filter Posts to delete.
     * @example
     * // Delete a few Posts
     * const { count } = await prisma.post.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PostDeleteManyArgs>(args?: SelectSubset<T, PostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Posts
     * const post = await prisma.post.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PostUpdateManyArgs>(args: SelectSubset<T, PostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Posts and returns the data updated in the database.
     * @param {PostUpdateManyAndReturnArgs} args - Arguments to update many Posts.
     * @example
     * // Update many Posts
     * const post = await prisma.post.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Posts and only return the `id`
     * const postWithIdOnly = await prisma.post.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PostUpdateManyAndReturnArgs>(args: SelectSubset<T, PostUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Post.
     * @param {PostUpsertArgs} args - Arguments to update or create a Post.
     * @example
     * // Update or create a Post
     * const post = await prisma.post.upsert({
     *   create: {
     *     // ... data to create a Post
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Post we want to update
     *   }
     * })
     */
    upsert<T extends PostUpsertArgs>(args: SelectSubset<T, PostUpsertArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostCountArgs} args - Arguments to filter Posts to count.
     * @example
     * // Count the number of Posts
     * const count = await prisma.post.count({
     *   where: {
     *     // ... the filter for the Posts we want to count
     *   }
     * })
    **/
    count<T extends PostCountArgs>(
      args?: Subset<T, PostCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PostAggregateArgs>(args: Subset<T, PostAggregateArgs>): Prisma.PrismaPromise<GetPostAggregateType<T>>

    /**
     * Group by Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostGroupByArgs['orderBy'] }
        : { orderBy?: PostGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Post model
   */
  readonly fields: PostFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Post.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PostClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Post model
   */
  interface PostFieldRefs {
    readonly id: FieldRef<"Post", 'String'>
    readonly title: FieldRef<"Post", 'String'>
    readonly slug: FieldRef<"Post", 'String'>
    readonly description: FieldRef<"Post", 'String'>
    readonly content: FieldRef<"Post", 'String'>
    readonly imageUrl: FieldRef<"Post", 'String'>
    readonly published: FieldRef<"Post", 'Boolean'>
    readonly category: FieldRef<"Post", 'String'>
    readonly createdAt: FieldRef<"Post", 'DateTime'>
    readonly updatedAt: FieldRef<"Post", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Post findUnique
   */
  export type PostFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post findUniqueOrThrow
   */
  export type PostFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post findFirst
   */
  export type PostFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Posts.
     */
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post findFirstOrThrow
   */
  export type PostFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Posts.
     */
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post findMany
   */
  export type PostFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Filter, which Posts to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post create
   */
  export type PostCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * The data needed to create a Post.
     */
    data: XOR<PostCreateInput, PostUncheckedCreateInput>
  }

  /**
   * Post createMany
   */
  export type PostCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Posts.
     */
    data: PostCreateManyInput | PostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Post createManyAndReturn
   */
  export type PostCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * The data used to create many Posts.
     */
    data: PostCreateManyInput | PostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Post update
   */
  export type PostUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * The data needed to update a Post.
     */
    data: XOR<PostUpdateInput, PostUncheckedUpdateInput>
    /**
     * Choose, which Post to update.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post updateMany
   */
  export type PostUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Posts.
     */
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyInput>
    /**
     * Filter which Posts to update
     */
    where?: PostWhereInput
    /**
     * Limit how many Posts to update.
     */
    limit?: number
  }

  /**
   * Post updateManyAndReturn
   */
  export type PostUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * The data used to update Posts.
     */
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyInput>
    /**
     * Filter which Posts to update
     */
    where?: PostWhereInput
    /**
     * Limit how many Posts to update.
     */
    limit?: number
  }

  /**
   * Post upsert
   */
  export type PostUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * The filter to search for the Post to update in case it exists.
     */
    where: PostWhereUniqueInput
    /**
     * In case the Post found by the `where` argument doesn't exist, create a new Post with this data.
     */
    create: XOR<PostCreateInput, PostUncheckedCreateInput>
    /**
     * In case the Post was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PostUpdateInput, PostUncheckedUpdateInput>
  }

  /**
   * Post delete
   */
  export type PostDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Filter which Post to delete.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post deleteMany
   */
  export type PostDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Posts to delete
     */
    where?: PostWhereInput
    /**
     * Limit how many Posts to delete.
     */
    limit?: number
  }

  /**
   * Post without action
   */
  export type PostDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
  }


  /**
   * Model Recipe
   */

  export type AggregateRecipe = {
    _count: RecipeCountAggregateOutputType | null
    _min: RecipeMinAggregateOutputType | null
    _max: RecipeMaxAggregateOutputType | null
  }

  export type RecipeMinAggregateOutputType = {
    id: string | null
    title: string | null
    slug: string | null
    description: string | null
    ingredients: string | null
    instructions: string | null
    prepTime: string | null
    cookTime: string | null
    servings: string | null
    category: string | null
    imageUrl: string | null
    published: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    recipeCategoryId: string | null
  }

  export type RecipeMaxAggregateOutputType = {
    id: string | null
    title: string | null
    slug: string | null
    description: string | null
    ingredients: string | null
    instructions: string | null
    prepTime: string | null
    cookTime: string | null
    servings: string | null
    category: string | null
    imageUrl: string | null
    published: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    recipeCategoryId: string | null
  }

  export type RecipeCountAggregateOutputType = {
    id: number
    title: number
    slug: number
    description: number
    ingredients: number
    instructions: number
    prepTime: number
    cookTime: number
    servings: number
    category: number
    imageUrl: number
    published: number
    createdAt: number
    updatedAt: number
    recipeCategoryId: number
    _all: number
  }


  export type RecipeMinAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    description?: true
    ingredients?: true
    instructions?: true
    prepTime?: true
    cookTime?: true
    servings?: true
    category?: true
    imageUrl?: true
    published?: true
    createdAt?: true
    updatedAt?: true
    recipeCategoryId?: true
  }

  export type RecipeMaxAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    description?: true
    ingredients?: true
    instructions?: true
    prepTime?: true
    cookTime?: true
    servings?: true
    category?: true
    imageUrl?: true
    published?: true
    createdAt?: true
    updatedAt?: true
    recipeCategoryId?: true
  }

  export type RecipeCountAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    description?: true
    ingredients?: true
    instructions?: true
    prepTime?: true
    cookTime?: true
    servings?: true
    category?: true
    imageUrl?: true
    published?: true
    createdAt?: true
    updatedAt?: true
    recipeCategoryId?: true
    _all?: true
  }

  export type RecipeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Recipe to aggregate.
     */
    where?: RecipeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recipes to fetch.
     */
    orderBy?: RecipeOrderByWithRelationInput | RecipeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RecipeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recipes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recipes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Recipes
    **/
    _count?: true | RecipeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RecipeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RecipeMaxAggregateInputType
  }

  export type GetRecipeAggregateType<T extends RecipeAggregateArgs> = {
        [P in keyof T & keyof AggregateRecipe]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRecipe[P]>
      : GetScalarType<T[P], AggregateRecipe[P]>
  }




  export type RecipeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecipeWhereInput
    orderBy?: RecipeOrderByWithAggregationInput | RecipeOrderByWithAggregationInput[]
    by: RecipeScalarFieldEnum[] | RecipeScalarFieldEnum
    having?: RecipeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RecipeCountAggregateInputType | true
    _min?: RecipeMinAggregateInputType
    _max?: RecipeMaxAggregateInputType
  }

  export type RecipeGroupByOutputType = {
    id: string
    title: string
    slug: string
    description: string
    ingredients: string
    instructions: string
    prepTime: string | null
    cookTime: string | null
    servings: string | null
    category: string | null
    imageUrl: string | null
    published: boolean
    createdAt: Date
    updatedAt: Date
    recipeCategoryId: string | null
    _count: RecipeCountAggregateOutputType | null
    _min: RecipeMinAggregateOutputType | null
    _max: RecipeMaxAggregateOutputType | null
  }

  type GetRecipeGroupByPayload<T extends RecipeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RecipeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RecipeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RecipeGroupByOutputType[P]>
            : GetScalarType<T[P], RecipeGroupByOutputType[P]>
        }
      >
    >


  export type RecipeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    slug?: boolean
    description?: boolean
    ingredients?: boolean
    instructions?: boolean
    prepTime?: boolean
    cookTime?: boolean
    servings?: boolean
    category?: boolean
    imageUrl?: boolean
    published?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    recipeCategoryId?: boolean
    recipeCategory?: boolean | Recipe$recipeCategoryArgs<ExtArgs>
  }, ExtArgs["result"]["recipe"]>

  export type RecipeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    slug?: boolean
    description?: boolean
    ingredients?: boolean
    instructions?: boolean
    prepTime?: boolean
    cookTime?: boolean
    servings?: boolean
    category?: boolean
    imageUrl?: boolean
    published?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    recipeCategoryId?: boolean
    recipeCategory?: boolean | Recipe$recipeCategoryArgs<ExtArgs>
  }, ExtArgs["result"]["recipe"]>

  export type RecipeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    slug?: boolean
    description?: boolean
    ingredients?: boolean
    instructions?: boolean
    prepTime?: boolean
    cookTime?: boolean
    servings?: boolean
    category?: boolean
    imageUrl?: boolean
    published?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    recipeCategoryId?: boolean
    recipeCategory?: boolean | Recipe$recipeCategoryArgs<ExtArgs>
  }, ExtArgs["result"]["recipe"]>

  export type RecipeSelectScalar = {
    id?: boolean
    title?: boolean
    slug?: boolean
    description?: boolean
    ingredients?: boolean
    instructions?: boolean
    prepTime?: boolean
    cookTime?: boolean
    servings?: boolean
    category?: boolean
    imageUrl?: boolean
    published?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    recipeCategoryId?: boolean
  }

  export type RecipeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "slug" | "description" | "ingredients" | "instructions" | "prepTime" | "cookTime" | "servings" | "category" | "imageUrl" | "published" | "createdAt" | "updatedAt" | "recipeCategoryId", ExtArgs["result"]["recipe"]>
  export type RecipeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    recipeCategory?: boolean | Recipe$recipeCategoryArgs<ExtArgs>
  }
  export type RecipeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    recipeCategory?: boolean | Recipe$recipeCategoryArgs<ExtArgs>
  }
  export type RecipeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    recipeCategory?: boolean | Recipe$recipeCategoryArgs<ExtArgs>
  }

  export type $RecipePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Recipe"
    objects: {
      recipeCategory: Prisma.$RecipeCategoryPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      slug: string
      description: string
      ingredients: string
      instructions: string
      prepTime: string | null
      cookTime: string | null
      servings: string | null
      category: string | null
      imageUrl: string | null
      published: boolean
      createdAt: Date
      updatedAt: Date
      recipeCategoryId: string | null
    }, ExtArgs["result"]["recipe"]>
    composites: {}
  }

  type RecipeGetPayload<S extends boolean | null | undefined | RecipeDefaultArgs> = $Result.GetResult<Prisma.$RecipePayload, S>

  type RecipeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RecipeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RecipeCountAggregateInputType | true
    }

  export interface RecipeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Recipe'], meta: { name: 'Recipe' } }
    /**
     * Find zero or one Recipe that matches the filter.
     * @param {RecipeFindUniqueArgs} args - Arguments to find a Recipe
     * @example
     * // Get one Recipe
     * const recipe = await prisma.recipe.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RecipeFindUniqueArgs>(args: SelectSubset<T, RecipeFindUniqueArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Recipe that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RecipeFindUniqueOrThrowArgs} args - Arguments to find a Recipe
     * @example
     * // Get one Recipe
     * const recipe = await prisma.recipe.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RecipeFindUniqueOrThrowArgs>(args: SelectSubset<T, RecipeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Recipe that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeFindFirstArgs} args - Arguments to find a Recipe
     * @example
     * // Get one Recipe
     * const recipe = await prisma.recipe.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RecipeFindFirstArgs>(args?: SelectSubset<T, RecipeFindFirstArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Recipe that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeFindFirstOrThrowArgs} args - Arguments to find a Recipe
     * @example
     * // Get one Recipe
     * const recipe = await prisma.recipe.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RecipeFindFirstOrThrowArgs>(args?: SelectSubset<T, RecipeFindFirstOrThrowArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Recipes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Recipes
     * const recipes = await prisma.recipe.findMany()
     * 
     * // Get first 10 Recipes
     * const recipes = await prisma.recipe.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const recipeWithIdOnly = await prisma.recipe.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RecipeFindManyArgs>(args?: SelectSubset<T, RecipeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Recipe.
     * @param {RecipeCreateArgs} args - Arguments to create a Recipe.
     * @example
     * // Create one Recipe
     * const Recipe = await prisma.recipe.create({
     *   data: {
     *     // ... data to create a Recipe
     *   }
     * })
     * 
     */
    create<T extends RecipeCreateArgs>(args: SelectSubset<T, RecipeCreateArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Recipes.
     * @param {RecipeCreateManyArgs} args - Arguments to create many Recipes.
     * @example
     * // Create many Recipes
     * const recipe = await prisma.recipe.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RecipeCreateManyArgs>(args?: SelectSubset<T, RecipeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Recipes and returns the data saved in the database.
     * @param {RecipeCreateManyAndReturnArgs} args - Arguments to create many Recipes.
     * @example
     * // Create many Recipes
     * const recipe = await prisma.recipe.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Recipes and only return the `id`
     * const recipeWithIdOnly = await prisma.recipe.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RecipeCreateManyAndReturnArgs>(args?: SelectSubset<T, RecipeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Recipe.
     * @param {RecipeDeleteArgs} args - Arguments to delete one Recipe.
     * @example
     * // Delete one Recipe
     * const Recipe = await prisma.recipe.delete({
     *   where: {
     *     // ... filter to delete one Recipe
     *   }
     * })
     * 
     */
    delete<T extends RecipeDeleteArgs>(args: SelectSubset<T, RecipeDeleteArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Recipe.
     * @param {RecipeUpdateArgs} args - Arguments to update one Recipe.
     * @example
     * // Update one Recipe
     * const recipe = await prisma.recipe.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RecipeUpdateArgs>(args: SelectSubset<T, RecipeUpdateArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Recipes.
     * @param {RecipeDeleteManyArgs} args - Arguments to filter Recipes to delete.
     * @example
     * // Delete a few Recipes
     * const { count } = await prisma.recipe.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RecipeDeleteManyArgs>(args?: SelectSubset<T, RecipeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Recipes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Recipes
     * const recipe = await prisma.recipe.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RecipeUpdateManyArgs>(args: SelectSubset<T, RecipeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Recipes and returns the data updated in the database.
     * @param {RecipeUpdateManyAndReturnArgs} args - Arguments to update many Recipes.
     * @example
     * // Update many Recipes
     * const recipe = await prisma.recipe.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Recipes and only return the `id`
     * const recipeWithIdOnly = await prisma.recipe.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RecipeUpdateManyAndReturnArgs>(args: SelectSubset<T, RecipeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Recipe.
     * @param {RecipeUpsertArgs} args - Arguments to update or create a Recipe.
     * @example
     * // Update or create a Recipe
     * const recipe = await prisma.recipe.upsert({
     *   create: {
     *     // ... data to create a Recipe
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Recipe we want to update
     *   }
     * })
     */
    upsert<T extends RecipeUpsertArgs>(args: SelectSubset<T, RecipeUpsertArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Recipes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeCountArgs} args - Arguments to filter Recipes to count.
     * @example
     * // Count the number of Recipes
     * const count = await prisma.recipe.count({
     *   where: {
     *     // ... the filter for the Recipes we want to count
     *   }
     * })
    **/
    count<T extends RecipeCountArgs>(
      args?: Subset<T, RecipeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RecipeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Recipe.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RecipeAggregateArgs>(args: Subset<T, RecipeAggregateArgs>): Prisma.PrismaPromise<GetRecipeAggregateType<T>>

    /**
     * Group by Recipe.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RecipeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RecipeGroupByArgs['orderBy'] }
        : { orderBy?: RecipeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RecipeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRecipeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Recipe model
   */
  readonly fields: RecipeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Recipe.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RecipeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    recipeCategory<T extends Recipe$recipeCategoryArgs<ExtArgs> = {}>(args?: Subset<T, Recipe$recipeCategoryArgs<ExtArgs>>): Prisma__RecipeCategoryClient<$Result.GetResult<Prisma.$RecipeCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Recipe model
   */
  interface RecipeFieldRefs {
    readonly id: FieldRef<"Recipe", 'String'>
    readonly title: FieldRef<"Recipe", 'String'>
    readonly slug: FieldRef<"Recipe", 'String'>
    readonly description: FieldRef<"Recipe", 'String'>
    readonly ingredients: FieldRef<"Recipe", 'String'>
    readonly instructions: FieldRef<"Recipe", 'String'>
    readonly prepTime: FieldRef<"Recipe", 'String'>
    readonly cookTime: FieldRef<"Recipe", 'String'>
    readonly servings: FieldRef<"Recipe", 'String'>
    readonly category: FieldRef<"Recipe", 'String'>
    readonly imageUrl: FieldRef<"Recipe", 'String'>
    readonly published: FieldRef<"Recipe", 'Boolean'>
    readonly createdAt: FieldRef<"Recipe", 'DateTime'>
    readonly updatedAt: FieldRef<"Recipe", 'DateTime'>
    readonly recipeCategoryId: FieldRef<"Recipe", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Recipe findUnique
   */
  export type RecipeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
    /**
     * Filter, which Recipe to fetch.
     */
    where: RecipeWhereUniqueInput
  }

  /**
   * Recipe findUniqueOrThrow
   */
  export type RecipeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
    /**
     * Filter, which Recipe to fetch.
     */
    where: RecipeWhereUniqueInput
  }

  /**
   * Recipe findFirst
   */
  export type RecipeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
    /**
     * Filter, which Recipe to fetch.
     */
    where?: RecipeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recipes to fetch.
     */
    orderBy?: RecipeOrderByWithRelationInput | RecipeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Recipes.
     */
    cursor?: RecipeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recipes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recipes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Recipes.
     */
    distinct?: RecipeScalarFieldEnum | RecipeScalarFieldEnum[]
  }

  /**
   * Recipe findFirstOrThrow
   */
  export type RecipeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
    /**
     * Filter, which Recipe to fetch.
     */
    where?: RecipeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recipes to fetch.
     */
    orderBy?: RecipeOrderByWithRelationInput | RecipeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Recipes.
     */
    cursor?: RecipeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recipes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recipes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Recipes.
     */
    distinct?: RecipeScalarFieldEnum | RecipeScalarFieldEnum[]
  }

  /**
   * Recipe findMany
   */
  export type RecipeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
    /**
     * Filter, which Recipes to fetch.
     */
    where?: RecipeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recipes to fetch.
     */
    orderBy?: RecipeOrderByWithRelationInput | RecipeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Recipes.
     */
    cursor?: RecipeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recipes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recipes.
     */
    skip?: number
    distinct?: RecipeScalarFieldEnum | RecipeScalarFieldEnum[]
  }

  /**
   * Recipe create
   */
  export type RecipeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
    /**
     * The data needed to create a Recipe.
     */
    data: XOR<RecipeCreateInput, RecipeUncheckedCreateInput>
  }

  /**
   * Recipe createMany
   */
  export type RecipeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Recipes.
     */
    data: RecipeCreateManyInput | RecipeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Recipe createManyAndReturn
   */
  export type RecipeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * The data used to create many Recipes.
     */
    data: RecipeCreateManyInput | RecipeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Recipe update
   */
  export type RecipeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
    /**
     * The data needed to update a Recipe.
     */
    data: XOR<RecipeUpdateInput, RecipeUncheckedUpdateInput>
    /**
     * Choose, which Recipe to update.
     */
    where: RecipeWhereUniqueInput
  }

  /**
   * Recipe updateMany
   */
  export type RecipeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Recipes.
     */
    data: XOR<RecipeUpdateManyMutationInput, RecipeUncheckedUpdateManyInput>
    /**
     * Filter which Recipes to update
     */
    where?: RecipeWhereInput
    /**
     * Limit how many Recipes to update.
     */
    limit?: number
  }

  /**
   * Recipe updateManyAndReturn
   */
  export type RecipeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * The data used to update Recipes.
     */
    data: XOR<RecipeUpdateManyMutationInput, RecipeUncheckedUpdateManyInput>
    /**
     * Filter which Recipes to update
     */
    where?: RecipeWhereInput
    /**
     * Limit how many Recipes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Recipe upsert
   */
  export type RecipeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
    /**
     * The filter to search for the Recipe to update in case it exists.
     */
    where: RecipeWhereUniqueInput
    /**
     * In case the Recipe found by the `where` argument doesn't exist, create a new Recipe with this data.
     */
    create: XOR<RecipeCreateInput, RecipeUncheckedCreateInput>
    /**
     * In case the Recipe was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RecipeUpdateInput, RecipeUncheckedUpdateInput>
  }

  /**
   * Recipe delete
   */
  export type RecipeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
    /**
     * Filter which Recipe to delete.
     */
    where: RecipeWhereUniqueInput
  }

  /**
   * Recipe deleteMany
   */
  export type RecipeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Recipes to delete
     */
    where?: RecipeWhereInput
    /**
     * Limit how many Recipes to delete.
     */
    limit?: number
  }

  /**
   * Recipe.recipeCategory
   */
  export type Recipe$recipeCategoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeCategory
     */
    select?: RecipeCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeCategory
     */
    omit?: RecipeCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeCategoryInclude<ExtArgs> | null
    where?: RecipeCategoryWhereInput
  }

  /**
   * Recipe without action
   */
  export type RecipeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
  }


  /**
   * Model RecipeCategory
   */

  export type AggregateRecipeCategory = {
    _count: RecipeCategoryCountAggregateOutputType | null
    _min: RecipeCategoryMinAggregateOutputType | null
    _max: RecipeCategoryMaxAggregateOutputType | null
  }

  export type RecipeCategoryMinAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RecipeCategoryMaxAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RecipeCategoryCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RecipeCategoryMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RecipeCategoryMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RecipeCategoryCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RecipeCategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RecipeCategory to aggregate.
     */
    where?: RecipeCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecipeCategories to fetch.
     */
    orderBy?: RecipeCategoryOrderByWithRelationInput | RecipeCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RecipeCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecipeCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecipeCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RecipeCategories
    **/
    _count?: true | RecipeCategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RecipeCategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RecipeCategoryMaxAggregateInputType
  }

  export type GetRecipeCategoryAggregateType<T extends RecipeCategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateRecipeCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRecipeCategory[P]>
      : GetScalarType<T[P], AggregateRecipeCategory[P]>
  }




  export type RecipeCategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecipeCategoryWhereInput
    orderBy?: RecipeCategoryOrderByWithAggregationInput | RecipeCategoryOrderByWithAggregationInput[]
    by: RecipeCategoryScalarFieldEnum[] | RecipeCategoryScalarFieldEnum
    having?: RecipeCategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RecipeCategoryCountAggregateInputType | true
    _min?: RecipeCategoryMinAggregateInputType
    _max?: RecipeCategoryMaxAggregateInputType
  }

  export type RecipeCategoryGroupByOutputType = {
    id: string
    name: string
    createdAt: Date
    updatedAt: Date
    _count: RecipeCategoryCountAggregateOutputType | null
    _min: RecipeCategoryMinAggregateOutputType | null
    _max: RecipeCategoryMaxAggregateOutputType | null
  }

  type GetRecipeCategoryGroupByPayload<T extends RecipeCategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RecipeCategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RecipeCategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RecipeCategoryGroupByOutputType[P]>
            : GetScalarType<T[P], RecipeCategoryGroupByOutputType[P]>
        }
      >
    >


  export type RecipeCategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    recipes?: boolean | RecipeCategory$recipesArgs<ExtArgs>
    _count?: boolean | RecipeCategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recipeCategory"]>

  export type RecipeCategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["recipeCategory"]>

  export type RecipeCategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["recipeCategory"]>

  export type RecipeCategorySelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RecipeCategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "createdAt" | "updatedAt", ExtArgs["result"]["recipeCategory"]>
  export type RecipeCategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    recipes?: boolean | RecipeCategory$recipesArgs<ExtArgs>
    _count?: boolean | RecipeCategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RecipeCategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type RecipeCategoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RecipeCategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RecipeCategory"
    objects: {
      recipes: Prisma.$RecipePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["recipeCategory"]>
    composites: {}
  }

  type RecipeCategoryGetPayload<S extends boolean | null | undefined | RecipeCategoryDefaultArgs> = $Result.GetResult<Prisma.$RecipeCategoryPayload, S>

  type RecipeCategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RecipeCategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RecipeCategoryCountAggregateInputType | true
    }

  export interface RecipeCategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RecipeCategory'], meta: { name: 'RecipeCategory' } }
    /**
     * Find zero or one RecipeCategory that matches the filter.
     * @param {RecipeCategoryFindUniqueArgs} args - Arguments to find a RecipeCategory
     * @example
     * // Get one RecipeCategory
     * const recipeCategory = await prisma.recipeCategory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RecipeCategoryFindUniqueArgs>(args: SelectSubset<T, RecipeCategoryFindUniqueArgs<ExtArgs>>): Prisma__RecipeCategoryClient<$Result.GetResult<Prisma.$RecipeCategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RecipeCategory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RecipeCategoryFindUniqueOrThrowArgs} args - Arguments to find a RecipeCategory
     * @example
     * // Get one RecipeCategory
     * const recipeCategory = await prisma.recipeCategory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RecipeCategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, RecipeCategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RecipeCategoryClient<$Result.GetResult<Prisma.$RecipeCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RecipeCategory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeCategoryFindFirstArgs} args - Arguments to find a RecipeCategory
     * @example
     * // Get one RecipeCategory
     * const recipeCategory = await prisma.recipeCategory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RecipeCategoryFindFirstArgs>(args?: SelectSubset<T, RecipeCategoryFindFirstArgs<ExtArgs>>): Prisma__RecipeCategoryClient<$Result.GetResult<Prisma.$RecipeCategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RecipeCategory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeCategoryFindFirstOrThrowArgs} args - Arguments to find a RecipeCategory
     * @example
     * // Get one RecipeCategory
     * const recipeCategory = await prisma.recipeCategory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RecipeCategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, RecipeCategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__RecipeCategoryClient<$Result.GetResult<Prisma.$RecipeCategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RecipeCategories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeCategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RecipeCategories
     * const recipeCategories = await prisma.recipeCategory.findMany()
     * 
     * // Get first 10 RecipeCategories
     * const recipeCategories = await prisma.recipeCategory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const recipeCategoryWithIdOnly = await prisma.recipeCategory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RecipeCategoryFindManyArgs>(args?: SelectSubset<T, RecipeCategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecipeCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RecipeCategory.
     * @param {RecipeCategoryCreateArgs} args - Arguments to create a RecipeCategory.
     * @example
     * // Create one RecipeCategory
     * const RecipeCategory = await prisma.recipeCategory.create({
     *   data: {
     *     // ... data to create a RecipeCategory
     *   }
     * })
     * 
     */
    create<T extends RecipeCategoryCreateArgs>(args: SelectSubset<T, RecipeCategoryCreateArgs<ExtArgs>>): Prisma__RecipeCategoryClient<$Result.GetResult<Prisma.$RecipeCategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RecipeCategories.
     * @param {RecipeCategoryCreateManyArgs} args - Arguments to create many RecipeCategories.
     * @example
     * // Create many RecipeCategories
     * const recipeCategory = await prisma.recipeCategory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RecipeCategoryCreateManyArgs>(args?: SelectSubset<T, RecipeCategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RecipeCategories and returns the data saved in the database.
     * @param {RecipeCategoryCreateManyAndReturnArgs} args - Arguments to create many RecipeCategories.
     * @example
     * // Create many RecipeCategories
     * const recipeCategory = await prisma.recipeCategory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RecipeCategories and only return the `id`
     * const recipeCategoryWithIdOnly = await prisma.recipeCategory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RecipeCategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, RecipeCategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecipeCategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RecipeCategory.
     * @param {RecipeCategoryDeleteArgs} args - Arguments to delete one RecipeCategory.
     * @example
     * // Delete one RecipeCategory
     * const RecipeCategory = await prisma.recipeCategory.delete({
     *   where: {
     *     // ... filter to delete one RecipeCategory
     *   }
     * })
     * 
     */
    delete<T extends RecipeCategoryDeleteArgs>(args: SelectSubset<T, RecipeCategoryDeleteArgs<ExtArgs>>): Prisma__RecipeCategoryClient<$Result.GetResult<Prisma.$RecipeCategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RecipeCategory.
     * @param {RecipeCategoryUpdateArgs} args - Arguments to update one RecipeCategory.
     * @example
     * // Update one RecipeCategory
     * const recipeCategory = await prisma.recipeCategory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RecipeCategoryUpdateArgs>(args: SelectSubset<T, RecipeCategoryUpdateArgs<ExtArgs>>): Prisma__RecipeCategoryClient<$Result.GetResult<Prisma.$RecipeCategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RecipeCategories.
     * @param {RecipeCategoryDeleteManyArgs} args - Arguments to filter RecipeCategories to delete.
     * @example
     * // Delete a few RecipeCategories
     * const { count } = await prisma.recipeCategory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RecipeCategoryDeleteManyArgs>(args?: SelectSubset<T, RecipeCategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RecipeCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeCategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RecipeCategories
     * const recipeCategory = await prisma.recipeCategory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RecipeCategoryUpdateManyArgs>(args: SelectSubset<T, RecipeCategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RecipeCategories and returns the data updated in the database.
     * @param {RecipeCategoryUpdateManyAndReturnArgs} args - Arguments to update many RecipeCategories.
     * @example
     * // Update many RecipeCategories
     * const recipeCategory = await prisma.recipeCategory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RecipeCategories and only return the `id`
     * const recipeCategoryWithIdOnly = await prisma.recipeCategory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RecipeCategoryUpdateManyAndReturnArgs>(args: SelectSubset<T, RecipeCategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecipeCategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RecipeCategory.
     * @param {RecipeCategoryUpsertArgs} args - Arguments to update or create a RecipeCategory.
     * @example
     * // Update or create a RecipeCategory
     * const recipeCategory = await prisma.recipeCategory.upsert({
     *   create: {
     *     // ... data to create a RecipeCategory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RecipeCategory we want to update
     *   }
     * })
     */
    upsert<T extends RecipeCategoryUpsertArgs>(args: SelectSubset<T, RecipeCategoryUpsertArgs<ExtArgs>>): Prisma__RecipeCategoryClient<$Result.GetResult<Prisma.$RecipeCategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RecipeCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeCategoryCountArgs} args - Arguments to filter RecipeCategories to count.
     * @example
     * // Count the number of RecipeCategories
     * const count = await prisma.recipeCategory.count({
     *   where: {
     *     // ... the filter for the RecipeCategories we want to count
     *   }
     * })
    **/
    count<T extends RecipeCategoryCountArgs>(
      args?: Subset<T, RecipeCategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RecipeCategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RecipeCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeCategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RecipeCategoryAggregateArgs>(args: Subset<T, RecipeCategoryAggregateArgs>): Prisma.PrismaPromise<GetRecipeCategoryAggregateType<T>>

    /**
     * Group by RecipeCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeCategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RecipeCategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RecipeCategoryGroupByArgs['orderBy'] }
        : { orderBy?: RecipeCategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RecipeCategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRecipeCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RecipeCategory model
   */
  readonly fields: RecipeCategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RecipeCategory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RecipeCategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    recipes<T extends RecipeCategory$recipesArgs<ExtArgs> = {}>(args?: Subset<T, RecipeCategory$recipesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RecipeCategory model
   */
  interface RecipeCategoryFieldRefs {
    readonly id: FieldRef<"RecipeCategory", 'String'>
    readonly name: FieldRef<"RecipeCategory", 'String'>
    readonly createdAt: FieldRef<"RecipeCategory", 'DateTime'>
    readonly updatedAt: FieldRef<"RecipeCategory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RecipeCategory findUnique
   */
  export type RecipeCategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeCategory
     */
    select?: RecipeCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeCategory
     */
    omit?: RecipeCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeCategoryInclude<ExtArgs> | null
    /**
     * Filter, which RecipeCategory to fetch.
     */
    where: RecipeCategoryWhereUniqueInput
  }

  /**
   * RecipeCategory findUniqueOrThrow
   */
  export type RecipeCategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeCategory
     */
    select?: RecipeCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeCategory
     */
    omit?: RecipeCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeCategoryInclude<ExtArgs> | null
    /**
     * Filter, which RecipeCategory to fetch.
     */
    where: RecipeCategoryWhereUniqueInput
  }

  /**
   * RecipeCategory findFirst
   */
  export type RecipeCategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeCategory
     */
    select?: RecipeCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeCategory
     */
    omit?: RecipeCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeCategoryInclude<ExtArgs> | null
    /**
     * Filter, which RecipeCategory to fetch.
     */
    where?: RecipeCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecipeCategories to fetch.
     */
    orderBy?: RecipeCategoryOrderByWithRelationInput | RecipeCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RecipeCategories.
     */
    cursor?: RecipeCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecipeCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecipeCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RecipeCategories.
     */
    distinct?: RecipeCategoryScalarFieldEnum | RecipeCategoryScalarFieldEnum[]
  }

  /**
   * RecipeCategory findFirstOrThrow
   */
  export type RecipeCategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeCategory
     */
    select?: RecipeCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeCategory
     */
    omit?: RecipeCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeCategoryInclude<ExtArgs> | null
    /**
     * Filter, which RecipeCategory to fetch.
     */
    where?: RecipeCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecipeCategories to fetch.
     */
    orderBy?: RecipeCategoryOrderByWithRelationInput | RecipeCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RecipeCategories.
     */
    cursor?: RecipeCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecipeCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecipeCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RecipeCategories.
     */
    distinct?: RecipeCategoryScalarFieldEnum | RecipeCategoryScalarFieldEnum[]
  }

  /**
   * RecipeCategory findMany
   */
  export type RecipeCategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeCategory
     */
    select?: RecipeCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeCategory
     */
    omit?: RecipeCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeCategoryInclude<ExtArgs> | null
    /**
     * Filter, which RecipeCategories to fetch.
     */
    where?: RecipeCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecipeCategories to fetch.
     */
    orderBy?: RecipeCategoryOrderByWithRelationInput | RecipeCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RecipeCategories.
     */
    cursor?: RecipeCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecipeCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecipeCategories.
     */
    skip?: number
    distinct?: RecipeCategoryScalarFieldEnum | RecipeCategoryScalarFieldEnum[]
  }

  /**
   * RecipeCategory create
   */
  export type RecipeCategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeCategory
     */
    select?: RecipeCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeCategory
     */
    omit?: RecipeCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeCategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a RecipeCategory.
     */
    data: XOR<RecipeCategoryCreateInput, RecipeCategoryUncheckedCreateInput>
  }

  /**
   * RecipeCategory createMany
   */
  export type RecipeCategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RecipeCategories.
     */
    data: RecipeCategoryCreateManyInput | RecipeCategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RecipeCategory createManyAndReturn
   */
  export type RecipeCategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeCategory
     */
    select?: RecipeCategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeCategory
     */
    omit?: RecipeCategoryOmit<ExtArgs> | null
    /**
     * The data used to create many RecipeCategories.
     */
    data: RecipeCategoryCreateManyInput | RecipeCategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RecipeCategory update
   */
  export type RecipeCategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeCategory
     */
    select?: RecipeCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeCategory
     */
    omit?: RecipeCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeCategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a RecipeCategory.
     */
    data: XOR<RecipeCategoryUpdateInput, RecipeCategoryUncheckedUpdateInput>
    /**
     * Choose, which RecipeCategory to update.
     */
    where: RecipeCategoryWhereUniqueInput
  }

  /**
   * RecipeCategory updateMany
   */
  export type RecipeCategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RecipeCategories.
     */
    data: XOR<RecipeCategoryUpdateManyMutationInput, RecipeCategoryUncheckedUpdateManyInput>
    /**
     * Filter which RecipeCategories to update
     */
    where?: RecipeCategoryWhereInput
    /**
     * Limit how many RecipeCategories to update.
     */
    limit?: number
  }

  /**
   * RecipeCategory updateManyAndReturn
   */
  export type RecipeCategoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeCategory
     */
    select?: RecipeCategorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeCategory
     */
    omit?: RecipeCategoryOmit<ExtArgs> | null
    /**
     * The data used to update RecipeCategories.
     */
    data: XOR<RecipeCategoryUpdateManyMutationInput, RecipeCategoryUncheckedUpdateManyInput>
    /**
     * Filter which RecipeCategories to update
     */
    where?: RecipeCategoryWhereInput
    /**
     * Limit how many RecipeCategories to update.
     */
    limit?: number
  }

  /**
   * RecipeCategory upsert
   */
  export type RecipeCategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeCategory
     */
    select?: RecipeCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeCategory
     */
    omit?: RecipeCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeCategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the RecipeCategory to update in case it exists.
     */
    where: RecipeCategoryWhereUniqueInput
    /**
     * In case the RecipeCategory found by the `where` argument doesn't exist, create a new RecipeCategory with this data.
     */
    create: XOR<RecipeCategoryCreateInput, RecipeCategoryUncheckedCreateInput>
    /**
     * In case the RecipeCategory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RecipeCategoryUpdateInput, RecipeCategoryUncheckedUpdateInput>
  }

  /**
   * RecipeCategory delete
   */
  export type RecipeCategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeCategory
     */
    select?: RecipeCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeCategory
     */
    omit?: RecipeCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeCategoryInclude<ExtArgs> | null
    /**
     * Filter which RecipeCategory to delete.
     */
    where: RecipeCategoryWhereUniqueInput
  }

  /**
   * RecipeCategory deleteMany
   */
  export type RecipeCategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RecipeCategories to delete
     */
    where?: RecipeCategoryWhereInput
    /**
     * Limit how many RecipeCategories to delete.
     */
    limit?: number
  }

  /**
   * RecipeCategory.recipes
   */
  export type RecipeCategory$recipesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
    where?: RecipeWhereInput
    orderBy?: RecipeOrderByWithRelationInput | RecipeOrderByWithRelationInput[]
    cursor?: RecipeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RecipeScalarFieldEnum | RecipeScalarFieldEnum[]
  }

  /**
   * RecipeCategory without action
   */
  export type RecipeCategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeCategory
     */
    select?: RecipeCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeCategory
     */
    omit?: RecipeCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeCategoryInclude<ExtArgs> | null
  }


  /**
   * Model NewsletterSubscription
   */

  export type AggregateNewsletterSubscription = {
    _count: NewsletterSubscriptionCountAggregateOutputType | null
    _min: NewsletterSubscriptionMinAggregateOutputType | null
    _max: NewsletterSubscriptionMaxAggregateOutputType | null
  }

  export type NewsletterSubscriptionMinAggregateOutputType = {
    id: string | null
    email: string | null
    subscribed: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NewsletterSubscriptionMaxAggregateOutputType = {
    id: string | null
    email: string | null
    subscribed: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NewsletterSubscriptionCountAggregateOutputType = {
    id: number
    email: number
    subscribed: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type NewsletterSubscriptionMinAggregateInputType = {
    id?: true
    email?: true
    subscribed?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NewsletterSubscriptionMaxAggregateInputType = {
    id?: true
    email?: true
    subscribed?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NewsletterSubscriptionCountAggregateInputType = {
    id?: true
    email?: true
    subscribed?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type NewsletterSubscriptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NewsletterSubscription to aggregate.
     */
    where?: NewsletterSubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsletterSubscriptions to fetch.
     */
    orderBy?: NewsletterSubscriptionOrderByWithRelationInput | NewsletterSubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NewsletterSubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsletterSubscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsletterSubscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NewsletterSubscriptions
    **/
    _count?: true | NewsletterSubscriptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NewsletterSubscriptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NewsletterSubscriptionMaxAggregateInputType
  }

  export type GetNewsletterSubscriptionAggregateType<T extends NewsletterSubscriptionAggregateArgs> = {
        [P in keyof T & keyof AggregateNewsletterSubscription]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNewsletterSubscription[P]>
      : GetScalarType<T[P], AggregateNewsletterSubscription[P]>
  }




  export type NewsletterSubscriptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NewsletterSubscriptionWhereInput
    orderBy?: NewsletterSubscriptionOrderByWithAggregationInput | NewsletterSubscriptionOrderByWithAggregationInput[]
    by: NewsletterSubscriptionScalarFieldEnum[] | NewsletterSubscriptionScalarFieldEnum
    having?: NewsletterSubscriptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NewsletterSubscriptionCountAggregateInputType | true
    _min?: NewsletterSubscriptionMinAggregateInputType
    _max?: NewsletterSubscriptionMaxAggregateInputType
  }

  export type NewsletterSubscriptionGroupByOutputType = {
    id: string
    email: string
    subscribed: boolean
    createdAt: Date
    updatedAt: Date
    _count: NewsletterSubscriptionCountAggregateOutputType | null
    _min: NewsletterSubscriptionMinAggregateOutputType | null
    _max: NewsletterSubscriptionMaxAggregateOutputType | null
  }

  type GetNewsletterSubscriptionGroupByPayload<T extends NewsletterSubscriptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NewsletterSubscriptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NewsletterSubscriptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NewsletterSubscriptionGroupByOutputType[P]>
            : GetScalarType<T[P], NewsletterSubscriptionGroupByOutputType[P]>
        }
      >
    >


  export type NewsletterSubscriptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    subscribed?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["newsletterSubscription"]>

  export type NewsletterSubscriptionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    subscribed?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["newsletterSubscription"]>

  export type NewsletterSubscriptionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    subscribed?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["newsletterSubscription"]>

  export type NewsletterSubscriptionSelectScalar = {
    id?: boolean
    email?: boolean
    subscribed?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type NewsletterSubscriptionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "subscribed" | "createdAt" | "updatedAt", ExtArgs["result"]["newsletterSubscription"]>

  export type $NewsletterSubscriptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NewsletterSubscription"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      subscribed: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["newsletterSubscription"]>
    composites: {}
  }

  type NewsletterSubscriptionGetPayload<S extends boolean | null | undefined | NewsletterSubscriptionDefaultArgs> = $Result.GetResult<Prisma.$NewsletterSubscriptionPayload, S>

  type NewsletterSubscriptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NewsletterSubscriptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NewsletterSubscriptionCountAggregateInputType | true
    }

  export interface NewsletterSubscriptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NewsletterSubscription'], meta: { name: 'NewsletterSubscription' } }
    /**
     * Find zero or one NewsletterSubscription that matches the filter.
     * @param {NewsletterSubscriptionFindUniqueArgs} args - Arguments to find a NewsletterSubscription
     * @example
     * // Get one NewsletterSubscription
     * const newsletterSubscription = await prisma.newsletterSubscription.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NewsletterSubscriptionFindUniqueArgs>(args: SelectSubset<T, NewsletterSubscriptionFindUniqueArgs<ExtArgs>>): Prisma__NewsletterSubscriptionClient<$Result.GetResult<Prisma.$NewsletterSubscriptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one NewsletterSubscription that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NewsletterSubscriptionFindUniqueOrThrowArgs} args - Arguments to find a NewsletterSubscription
     * @example
     * // Get one NewsletterSubscription
     * const newsletterSubscription = await prisma.newsletterSubscription.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NewsletterSubscriptionFindUniqueOrThrowArgs>(args: SelectSubset<T, NewsletterSubscriptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NewsletterSubscriptionClient<$Result.GetResult<Prisma.$NewsletterSubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NewsletterSubscription that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterSubscriptionFindFirstArgs} args - Arguments to find a NewsletterSubscription
     * @example
     * // Get one NewsletterSubscription
     * const newsletterSubscription = await prisma.newsletterSubscription.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NewsletterSubscriptionFindFirstArgs>(args?: SelectSubset<T, NewsletterSubscriptionFindFirstArgs<ExtArgs>>): Prisma__NewsletterSubscriptionClient<$Result.GetResult<Prisma.$NewsletterSubscriptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NewsletterSubscription that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterSubscriptionFindFirstOrThrowArgs} args - Arguments to find a NewsletterSubscription
     * @example
     * // Get one NewsletterSubscription
     * const newsletterSubscription = await prisma.newsletterSubscription.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NewsletterSubscriptionFindFirstOrThrowArgs>(args?: SelectSubset<T, NewsletterSubscriptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__NewsletterSubscriptionClient<$Result.GetResult<Prisma.$NewsletterSubscriptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more NewsletterSubscriptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterSubscriptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NewsletterSubscriptions
     * const newsletterSubscriptions = await prisma.newsletterSubscription.findMany()
     * 
     * // Get first 10 NewsletterSubscriptions
     * const newsletterSubscriptions = await prisma.newsletterSubscription.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const newsletterSubscriptionWithIdOnly = await prisma.newsletterSubscription.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NewsletterSubscriptionFindManyArgs>(args?: SelectSubset<T, NewsletterSubscriptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NewsletterSubscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a NewsletterSubscription.
     * @param {NewsletterSubscriptionCreateArgs} args - Arguments to create a NewsletterSubscription.
     * @example
     * // Create one NewsletterSubscription
     * const NewsletterSubscription = await prisma.newsletterSubscription.create({
     *   data: {
     *     // ... data to create a NewsletterSubscription
     *   }
     * })
     * 
     */
    create<T extends NewsletterSubscriptionCreateArgs>(args: SelectSubset<T, NewsletterSubscriptionCreateArgs<ExtArgs>>): Prisma__NewsletterSubscriptionClient<$Result.GetResult<Prisma.$NewsletterSubscriptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many NewsletterSubscriptions.
     * @param {NewsletterSubscriptionCreateManyArgs} args - Arguments to create many NewsletterSubscriptions.
     * @example
     * // Create many NewsletterSubscriptions
     * const newsletterSubscription = await prisma.newsletterSubscription.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NewsletterSubscriptionCreateManyArgs>(args?: SelectSubset<T, NewsletterSubscriptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NewsletterSubscriptions and returns the data saved in the database.
     * @param {NewsletterSubscriptionCreateManyAndReturnArgs} args - Arguments to create many NewsletterSubscriptions.
     * @example
     * // Create many NewsletterSubscriptions
     * const newsletterSubscription = await prisma.newsletterSubscription.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NewsletterSubscriptions and only return the `id`
     * const newsletterSubscriptionWithIdOnly = await prisma.newsletterSubscription.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NewsletterSubscriptionCreateManyAndReturnArgs>(args?: SelectSubset<T, NewsletterSubscriptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NewsletterSubscriptionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a NewsletterSubscription.
     * @param {NewsletterSubscriptionDeleteArgs} args - Arguments to delete one NewsletterSubscription.
     * @example
     * // Delete one NewsletterSubscription
     * const NewsletterSubscription = await prisma.newsletterSubscription.delete({
     *   where: {
     *     // ... filter to delete one NewsletterSubscription
     *   }
     * })
     * 
     */
    delete<T extends NewsletterSubscriptionDeleteArgs>(args: SelectSubset<T, NewsletterSubscriptionDeleteArgs<ExtArgs>>): Prisma__NewsletterSubscriptionClient<$Result.GetResult<Prisma.$NewsletterSubscriptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one NewsletterSubscription.
     * @param {NewsletterSubscriptionUpdateArgs} args - Arguments to update one NewsletterSubscription.
     * @example
     * // Update one NewsletterSubscription
     * const newsletterSubscription = await prisma.newsletterSubscription.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NewsletterSubscriptionUpdateArgs>(args: SelectSubset<T, NewsletterSubscriptionUpdateArgs<ExtArgs>>): Prisma__NewsletterSubscriptionClient<$Result.GetResult<Prisma.$NewsletterSubscriptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more NewsletterSubscriptions.
     * @param {NewsletterSubscriptionDeleteManyArgs} args - Arguments to filter NewsletterSubscriptions to delete.
     * @example
     * // Delete a few NewsletterSubscriptions
     * const { count } = await prisma.newsletterSubscription.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NewsletterSubscriptionDeleteManyArgs>(args?: SelectSubset<T, NewsletterSubscriptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NewsletterSubscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterSubscriptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NewsletterSubscriptions
     * const newsletterSubscription = await prisma.newsletterSubscription.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NewsletterSubscriptionUpdateManyArgs>(args: SelectSubset<T, NewsletterSubscriptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NewsletterSubscriptions and returns the data updated in the database.
     * @param {NewsletterSubscriptionUpdateManyAndReturnArgs} args - Arguments to update many NewsletterSubscriptions.
     * @example
     * // Update many NewsletterSubscriptions
     * const newsletterSubscription = await prisma.newsletterSubscription.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more NewsletterSubscriptions and only return the `id`
     * const newsletterSubscriptionWithIdOnly = await prisma.newsletterSubscription.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NewsletterSubscriptionUpdateManyAndReturnArgs>(args: SelectSubset<T, NewsletterSubscriptionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NewsletterSubscriptionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one NewsletterSubscription.
     * @param {NewsletterSubscriptionUpsertArgs} args - Arguments to update or create a NewsletterSubscription.
     * @example
     * // Update or create a NewsletterSubscription
     * const newsletterSubscription = await prisma.newsletterSubscription.upsert({
     *   create: {
     *     // ... data to create a NewsletterSubscription
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NewsletterSubscription we want to update
     *   }
     * })
     */
    upsert<T extends NewsletterSubscriptionUpsertArgs>(args: SelectSubset<T, NewsletterSubscriptionUpsertArgs<ExtArgs>>): Prisma__NewsletterSubscriptionClient<$Result.GetResult<Prisma.$NewsletterSubscriptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of NewsletterSubscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterSubscriptionCountArgs} args - Arguments to filter NewsletterSubscriptions to count.
     * @example
     * // Count the number of NewsletterSubscriptions
     * const count = await prisma.newsletterSubscription.count({
     *   where: {
     *     // ... the filter for the NewsletterSubscriptions we want to count
     *   }
     * })
    **/
    count<T extends NewsletterSubscriptionCountArgs>(
      args?: Subset<T, NewsletterSubscriptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NewsletterSubscriptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NewsletterSubscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterSubscriptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NewsletterSubscriptionAggregateArgs>(args: Subset<T, NewsletterSubscriptionAggregateArgs>): Prisma.PrismaPromise<GetNewsletterSubscriptionAggregateType<T>>

    /**
     * Group by NewsletterSubscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterSubscriptionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NewsletterSubscriptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NewsletterSubscriptionGroupByArgs['orderBy'] }
        : { orderBy?: NewsletterSubscriptionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NewsletterSubscriptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNewsletterSubscriptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NewsletterSubscription model
   */
  readonly fields: NewsletterSubscriptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NewsletterSubscription.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NewsletterSubscriptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the NewsletterSubscription model
   */
  interface NewsletterSubscriptionFieldRefs {
    readonly id: FieldRef<"NewsletterSubscription", 'String'>
    readonly email: FieldRef<"NewsletterSubscription", 'String'>
    readonly subscribed: FieldRef<"NewsletterSubscription", 'Boolean'>
    readonly createdAt: FieldRef<"NewsletterSubscription", 'DateTime'>
    readonly updatedAt: FieldRef<"NewsletterSubscription", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * NewsletterSubscription findUnique
   */
  export type NewsletterSubscriptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscription
     */
    select?: NewsletterSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscription
     */
    omit?: NewsletterSubscriptionOmit<ExtArgs> | null
    /**
     * Filter, which NewsletterSubscription to fetch.
     */
    where: NewsletterSubscriptionWhereUniqueInput
  }

  /**
   * NewsletterSubscription findUniqueOrThrow
   */
  export type NewsletterSubscriptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscription
     */
    select?: NewsletterSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscription
     */
    omit?: NewsletterSubscriptionOmit<ExtArgs> | null
    /**
     * Filter, which NewsletterSubscription to fetch.
     */
    where: NewsletterSubscriptionWhereUniqueInput
  }

  /**
   * NewsletterSubscription findFirst
   */
  export type NewsletterSubscriptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscription
     */
    select?: NewsletterSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscription
     */
    omit?: NewsletterSubscriptionOmit<ExtArgs> | null
    /**
     * Filter, which NewsletterSubscription to fetch.
     */
    where?: NewsletterSubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsletterSubscriptions to fetch.
     */
    orderBy?: NewsletterSubscriptionOrderByWithRelationInput | NewsletterSubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NewsletterSubscriptions.
     */
    cursor?: NewsletterSubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsletterSubscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsletterSubscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NewsletterSubscriptions.
     */
    distinct?: NewsletterSubscriptionScalarFieldEnum | NewsletterSubscriptionScalarFieldEnum[]
  }

  /**
   * NewsletterSubscription findFirstOrThrow
   */
  export type NewsletterSubscriptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscription
     */
    select?: NewsletterSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscription
     */
    omit?: NewsletterSubscriptionOmit<ExtArgs> | null
    /**
     * Filter, which NewsletterSubscription to fetch.
     */
    where?: NewsletterSubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsletterSubscriptions to fetch.
     */
    orderBy?: NewsletterSubscriptionOrderByWithRelationInput | NewsletterSubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NewsletterSubscriptions.
     */
    cursor?: NewsletterSubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsletterSubscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsletterSubscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NewsletterSubscriptions.
     */
    distinct?: NewsletterSubscriptionScalarFieldEnum | NewsletterSubscriptionScalarFieldEnum[]
  }

  /**
   * NewsletterSubscription findMany
   */
  export type NewsletterSubscriptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscription
     */
    select?: NewsletterSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscription
     */
    omit?: NewsletterSubscriptionOmit<ExtArgs> | null
    /**
     * Filter, which NewsletterSubscriptions to fetch.
     */
    where?: NewsletterSubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsletterSubscriptions to fetch.
     */
    orderBy?: NewsletterSubscriptionOrderByWithRelationInput | NewsletterSubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NewsletterSubscriptions.
     */
    cursor?: NewsletterSubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsletterSubscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsletterSubscriptions.
     */
    skip?: number
    distinct?: NewsletterSubscriptionScalarFieldEnum | NewsletterSubscriptionScalarFieldEnum[]
  }

  /**
   * NewsletterSubscription create
   */
  export type NewsletterSubscriptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscription
     */
    select?: NewsletterSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscription
     */
    omit?: NewsletterSubscriptionOmit<ExtArgs> | null
    /**
     * The data needed to create a NewsletterSubscription.
     */
    data: XOR<NewsletterSubscriptionCreateInput, NewsletterSubscriptionUncheckedCreateInput>
  }

  /**
   * NewsletterSubscription createMany
   */
  export type NewsletterSubscriptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NewsletterSubscriptions.
     */
    data: NewsletterSubscriptionCreateManyInput | NewsletterSubscriptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NewsletterSubscription createManyAndReturn
   */
  export type NewsletterSubscriptionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscription
     */
    select?: NewsletterSubscriptionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscription
     */
    omit?: NewsletterSubscriptionOmit<ExtArgs> | null
    /**
     * The data used to create many NewsletterSubscriptions.
     */
    data: NewsletterSubscriptionCreateManyInput | NewsletterSubscriptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NewsletterSubscription update
   */
  export type NewsletterSubscriptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscription
     */
    select?: NewsletterSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscription
     */
    omit?: NewsletterSubscriptionOmit<ExtArgs> | null
    /**
     * The data needed to update a NewsletterSubscription.
     */
    data: XOR<NewsletterSubscriptionUpdateInput, NewsletterSubscriptionUncheckedUpdateInput>
    /**
     * Choose, which NewsletterSubscription to update.
     */
    where: NewsletterSubscriptionWhereUniqueInput
  }

  /**
   * NewsletterSubscription updateMany
   */
  export type NewsletterSubscriptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NewsletterSubscriptions.
     */
    data: XOR<NewsletterSubscriptionUpdateManyMutationInput, NewsletterSubscriptionUncheckedUpdateManyInput>
    /**
     * Filter which NewsletterSubscriptions to update
     */
    where?: NewsletterSubscriptionWhereInput
    /**
     * Limit how many NewsletterSubscriptions to update.
     */
    limit?: number
  }

  /**
   * NewsletterSubscription updateManyAndReturn
   */
  export type NewsletterSubscriptionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscription
     */
    select?: NewsletterSubscriptionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscription
     */
    omit?: NewsletterSubscriptionOmit<ExtArgs> | null
    /**
     * The data used to update NewsletterSubscriptions.
     */
    data: XOR<NewsletterSubscriptionUpdateManyMutationInput, NewsletterSubscriptionUncheckedUpdateManyInput>
    /**
     * Filter which NewsletterSubscriptions to update
     */
    where?: NewsletterSubscriptionWhereInput
    /**
     * Limit how many NewsletterSubscriptions to update.
     */
    limit?: number
  }

  /**
   * NewsletterSubscription upsert
   */
  export type NewsletterSubscriptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscription
     */
    select?: NewsletterSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscription
     */
    omit?: NewsletterSubscriptionOmit<ExtArgs> | null
    /**
     * The filter to search for the NewsletterSubscription to update in case it exists.
     */
    where: NewsletterSubscriptionWhereUniqueInput
    /**
     * In case the NewsletterSubscription found by the `where` argument doesn't exist, create a new NewsletterSubscription with this data.
     */
    create: XOR<NewsletterSubscriptionCreateInput, NewsletterSubscriptionUncheckedCreateInput>
    /**
     * In case the NewsletterSubscription was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NewsletterSubscriptionUpdateInput, NewsletterSubscriptionUncheckedUpdateInput>
  }

  /**
   * NewsletterSubscription delete
   */
  export type NewsletterSubscriptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscription
     */
    select?: NewsletterSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscription
     */
    omit?: NewsletterSubscriptionOmit<ExtArgs> | null
    /**
     * Filter which NewsletterSubscription to delete.
     */
    where: NewsletterSubscriptionWhereUniqueInput
  }

  /**
   * NewsletterSubscription deleteMany
   */
  export type NewsletterSubscriptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NewsletterSubscriptions to delete
     */
    where?: NewsletterSubscriptionWhereInput
    /**
     * Limit how many NewsletterSubscriptions to delete.
     */
    limit?: number
  }

  /**
   * NewsletterSubscription without action
   */
  export type NewsletterSubscriptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscription
     */
    select?: NewsletterSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscription
     */
    omit?: NewsletterSubscriptionOmit<ExtArgs> | null
  }


  /**
   * Model NewsletterIssue
   */

  export type AggregateNewsletterIssue = {
    _count: NewsletterIssueCountAggregateOutputType | null
    _min: NewsletterIssueMinAggregateOutputType | null
    _max: NewsletterIssueMaxAggregateOutputType | null
  }

  export type NewsletterIssueMinAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    newsletterImage: string | null
    status: $Enums.NewsletterStatus | null
    createdAt: Date | null
    updatedAt: Date | null
    sentAt: Date | null
    scheduledAt: Date | null
  }

  export type NewsletterIssueMaxAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    newsletterImage: string | null
    status: $Enums.NewsletterStatus | null
    createdAt: Date | null
    updatedAt: Date | null
    sentAt: Date | null
    scheduledAt: Date | null
  }

  export type NewsletterIssueCountAggregateOutputType = {
    id: number
    title: number
    content: number
    newsletterImage: number
    status: number
    createdAt: number
    updatedAt: number
    sentAt: number
    scheduledAt: number
    _all: number
  }


  export type NewsletterIssueMinAggregateInputType = {
    id?: true
    title?: true
    content?: true
    newsletterImage?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    sentAt?: true
    scheduledAt?: true
  }

  export type NewsletterIssueMaxAggregateInputType = {
    id?: true
    title?: true
    content?: true
    newsletterImage?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    sentAt?: true
    scheduledAt?: true
  }

  export type NewsletterIssueCountAggregateInputType = {
    id?: true
    title?: true
    content?: true
    newsletterImage?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    sentAt?: true
    scheduledAt?: true
    _all?: true
  }

  export type NewsletterIssueAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NewsletterIssue to aggregate.
     */
    where?: NewsletterIssueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsletterIssues to fetch.
     */
    orderBy?: NewsletterIssueOrderByWithRelationInput | NewsletterIssueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NewsletterIssueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsletterIssues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsletterIssues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NewsletterIssues
    **/
    _count?: true | NewsletterIssueCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NewsletterIssueMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NewsletterIssueMaxAggregateInputType
  }

  export type GetNewsletterIssueAggregateType<T extends NewsletterIssueAggregateArgs> = {
        [P in keyof T & keyof AggregateNewsletterIssue]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNewsletterIssue[P]>
      : GetScalarType<T[P], AggregateNewsletterIssue[P]>
  }




  export type NewsletterIssueGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NewsletterIssueWhereInput
    orderBy?: NewsletterIssueOrderByWithAggregationInput | NewsletterIssueOrderByWithAggregationInput[]
    by: NewsletterIssueScalarFieldEnum[] | NewsletterIssueScalarFieldEnum
    having?: NewsletterIssueScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NewsletterIssueCountAggregateInputType | true
    _min?: NewsletterIssueMinAggregateInputType
    _max?: NewsletterIssueMaxAggregateInputType
  }

  export type NewsletterIssueGroupByOutputType = {
    id: string
    title: string
    content: string
    newsletterImage: string | null
    status: $Enums.NewsletterStatus
    createdAt: Date
    updatedAt: Date
    sentAt: Date | null
    scheduledAt: Date | null
    _count: NewsletterIssueCountAggregateOutputType | null
    _min: NewsletterIssueMinAggregateOutputType | null
    _max: NewsletterIssueMaxAggregateOutputType | null
  }

  type GetNewsletterIssueGroupByPayload<T extends NewsletterIssueGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NewsletterIssueGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NewsletterIssueGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NewsletterIssueGroupByOutputType[P]>
            : GetScalarType<T[P], NewsletterIssueGroupByOutputType[P]>
        }
      >
    >


  export type NewsletterIssueSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    newsletterImage?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sentAt?: boolean
    scheduledAt?: boolean
  }, ExtArgs["result"]["newsletterIssue"]>

  export type NewsletterIssueSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    newsletterImage?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sentAt?: boolean
    scheduledAt?: boolean
  }, ExtArgs["result"]["newsletterIssue"]>

  export type NewsletterIssueSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    newsletterImage?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sentAt?: boolean
    scheduledAt?: boolean
  }, ExtArgs["result"]["newsletterIssue"]>

  export type NewsletterIssueSelectScalar = {
    id?: boolean
    title?: boolean
    content?: boolean
    newsletterImage?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sentAt?: boolean
    scheduledAt?: boolean
  }

  export type NewsletterIssueOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "content" | "newsletterImage" | "status" | "createdAt" | "updatedAt" | "sentAt" | "scheduledAt", ExtArgs["result"]["newsletterIssue"]>

  export type $NewsletterIssuePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NewsletterIssue"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      content: string
      newsletterImage: string | null
      status: $Enums.NewsletterStatus
      createdAt: Date
      updatedAt: Date
      sentAt: Date | null
      scheduledAt: Date | null
    }, ExtArgs["result"]["newsletterIssue"]>
    composites: {}
  }

  type NewsletterIssueGetPayload<S extends boolean | null | undefined | NewsletterIssueDefaultArgs> = $Result.GetResult<Prisma.$NewsletterIssuePayload, S>

  type NewsletterIssueCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NewsletterIssueFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NewsletterIssueCountAggregateInputType | true
    }

  export interface NewsletterIssueDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NewsletterIssue'], meta: { name: 'NewsletterIssue' } }
    /**
     * Find zero or one NewsletterIssue that matches the filter.
     * @param {NewsletterIssueFindUniqueArgs} args - Arguments to find a NewsletterIssue
     * @example
     * // Get one NewsletterIssue
     * const newsletterIssue = await prisma.newsletterIssue.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NewsletterIssueFindUniqueArgs>(args: SelectSubset<T, NewsletterIssueFindUniqueArgs<ExtArgs>>): Prisma__NewsletterIssueClient<$Result.GetResult<Prisma.$NewsletterIssuePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one NewsletterIssue that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NewsletterIssueFindUniqueOrThrowArgs} args - Arguments to find a NewsletterIssue
     * @example
     * // Get one NewsletterIssue
     * const newsletterIssue = await prisma.newsletterIssue.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NewsletterIssueFindUniqueOrThrowArgs>(args: SelectSubset<T, NewsletterIssueFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NewsletterIssueClient<$Result.GetResult<Prisma.$NewsletterIssuePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NewsletterIssue that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterIssueFindFirstArgs} args - Arguments to find a NewsletterIssue
     * @example
     * // Get one NewsletterIssue
     * const newsletterIssue = await prisma.newsletterIssue.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NewsletterIssueFindFirstArgs>(args?: SelectSubset<T, NewsletterIssueFindFirstArgs<ExtArgs>>): Prisma__NewsletterIssueClient<$Result.GetResult<Prisma.$NewsletterIssuePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NewsletterIssue that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterIssueFindFirstOrThrowArgs} args - Arguments to find a NewsletterIssue
     * @example
     * // Get one NewsletterIssue
     * const newsletterIssue = await prisma.newsletterIssue.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NewsletterIssueFindFirstOrThrowArgs>(args?: SelectSubset<T, NewsletterIssueFindFirstOrThrowArgs<ExtArgs>>): Prisma__NewsletterIssueClient<$Result.GetResult<Prisma.$NewsletterIssuePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more NewsletterIssues that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterIssueFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NewsletterIssues
     * const newsletterIssues = await prisma.newsletterIssue.findMany()
     * 
     * // Get first 10 NewsletterIssues
     * const newsletterIssues = await prisma.newsletterIssue.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const newsletterIssueWithIdOnly = await prisma.newsletterIssue.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NewsletterIssueFindManyArgs>(args?: SelectSubset<T, NewsletterIssueFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NewsletterIssuePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a NewsletterIssue.
     * @param {NewsletterIssueCreateArgs} args - Arguments to create a NewsletterIssue.
     * @example
     * // Create one NewsletterIssue
     * const NewsletterIssue = await prisma.newsletterIssue.create({
     *   data: {
     *     // ... data to create a NewsletterIssue
     *   }
     * })
     * 
     */
    create<T extends NewsletterIssueCreateArgs>(args: SelectSubset<T, NewsletterIssueCreateArgs<ExtArgs>>): Prisma__NewsletterIssueClient<$Result.GetResult<Prisma.$NewsletterIssuePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many NewsletterIssues.
     * @param {NewsletterIssueCreateManyArgs} args - Arguments to create many NewsletterIssues.
     * @example
     * // Create many NewsletterIssues
     * const newsletterIssue = await prisma.newsletterIssue.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NewsletterIssueCreateManyArgs>(args?: SelectSubset<T, NewsletterIssueCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NewsletterIssues and returns the data saved in the database.
     * @param {NewsletterIssueCreateManyAndReturnArgs} args - Arguments to create many NewsletterIssues.
     * @example
     * // Create many NewsletterIssues
     * const newsletterIssue = await prisma.newsletterIssue.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NewsletterIssues and only return the `id`
     * const newsletterIssueWithIdOnly = await prisma.newsletterIssue.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NewsletterIssueCreateManyAndReturnArgs>(args?: SelectSubset<T, NewsletterIssueCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NewsletterIssuePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a NewsletterIssue.
     * @param {NewsletterIssueDeleteArgs} args - Arguments to delete one NewsletterIssue.
     * @example
     * // Delete one NewsletterIssue
     * const NewsletterIssue = await prisma.newsletterIssue.delete({
     *   where: {
     *     // ... filter to delete one NewsletterIssue
     *   }
     * })
     * 
     */
    delete<T extends NewsletterIssueDeleteArgs>(args: SelectSubset<T, NewsletterIssueDeleteArgs<ExtArgs>>): Prisma__NewsletterIssueClient<$Result.GetResult<Prisma.$NewsletterIssuePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one NewsletterIssue.
     * @param {NewsletterIssueUpdateArgs} args - Arguments to update one NewsletterIssue.
     * @example
     * // Update one NewsletterIssue
     * const newsletterIssue = await prisma.newsletterIssue.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NewsletterIssueUpdateArgs>(args: SelectSubset<T, NewsletterIssueUpdateArgs<ExtArgs>>): Prisma__NewsletterIssueClient<$Result.GetResult<Prisma.$NewsletterIssuePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more NewsletterIssues.
     * @param {NewsletterIssueDeleteManyArgs} args - Arguments to filter NewsletterIssues to delete.
     * @example
     * // Delete a few NewsletterIssues
     * const { count } = await prisma.newsletterIssue.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NewsletterIssueDeleteManyArgs>(args?: SelectSubset<T, NewsletterIssueDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NewsletterIssues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterIssueUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NewsletterIssues
     * const newsletterIssue = await prisma.newsletterIssue.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NewsletterIssueUpdateManyArgs>(args: SelectSubset<T, NewsletterIssueUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NewsletterIssues and returns the data updated in the database.
     * @param {NewsletterIssueUpdateManyAndReturnArgs} args - Arguments to update many NewsletterIssues.
     * @example
     * // Update many NewsletterIssues
     * const newsletterIssue = await prisma.newsletterIssue.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more NewsletterIssues and only return the `id`
     * const newsletterIssueWithIdOnly = await prisma.newsletterIssue.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NewsletterIssueUpdateManyAndReturnArgs>(args: SelectSubset<T, NewsletterIssueUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NewsletterIssuePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one NewsletterIssue.
     * @param {NewsletterIssueUpsertArgs} args - Arguments to update or create a NewsletterIssue.
     * @example
     * // Update or create a NewsletterIssue
     * const newsletterIssue = await prisma.newsletterIssue.upsert({
     *   create: {
     *     // ... data to create a NewsletterIssue
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NewsletterIssue we want to update
     *   }
     * })
     */
    upsert<T extends NewsletterIssueUpsertArgs>(args: SelectSubset<T, NewsletterIssueUpsertArgs<ExtArgs>>): Prisma__NewsletterIssueClient<$Result.GetResult<Prisma.$NewsletterIssuePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of NewsletterIssues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterIssueCountArgs} args - Arguments to filter NewsletterIssues to count.
     * @example
     * // Count the number of NewsletterIssues
     * const count = await prisma.newsletterIssue.count({
     *   where: {
     *     // ... the filter for the NewsletterIssues we want to count
     *   }
     * })
    **/
    count<T extends NewsletterIssueCountArgs>(
      args?: Subset<T, NewsletterIssueCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NewsletterIssueCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NewsletterIssue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterIssueAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NewsletterIssueAggregateArgs>(args: Subset<T, NewsletterIssueAggregateArgs>): Prisma.PrismaPromise<GetNewsletterIssueAggregateType<T>>

    /**
     * Group by NewsletterIssue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterIssueGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NewsletterIssueGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NewsletterIssueGroupByArgs['orderBy'] }
        : { orderBy?: NewsletterIssueGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NewsletterIssueGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNewsletterIssueGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NewsletterIssue model
   */
  readonly fields: NewsletterIssueFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NewsletterIssue.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NewsletterIssueClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the NewsletterIssue model
   */
  interface NewsletterIssueFieldRefs {
    readonly id: FieldRef<"NewsletterIssue", 'String'>
    readonly title: FieldRef<"NewsletterIssue", 'String'>
    readonly content: FieldRef<"NewsletterIssue", 'String'>
    readonly newsletterImage: FieldRef<"NewsletterIssue", 'String'>
    readonly status: FieldRef<"NewsletterIssue", 'NewsletterStatus'>
    readonly createdAt: FieldRef<"NewsletterIssue", 'DateTime'>
    readonly updatedAt: FieldRef<"NewsletterIssue", 'DateTime'>
    readonly sentAt: FieldRef<"NewsletterIssue", 'DateTime'>
    readonly scheduledAt: FieldRef<"NewsletterIssue", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * NewsletterIssue findUnique
   */
  export type NewsletterIssueFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterIssue
     */
    select?: NewsletterIssueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterIssue
     */
    omit?: NewsletterIssueOmit<ExtArgs> | null
    /**
     * Filter, which NewsletterIssue to fetch.
     */
    where: NewsletterIssueWhereUniqueInput
  }

  /**
   * NewsletterIssue findUniqueOrThrow
   */
  export type NewsletterIssueFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterIssue
     */
    select?: NewsletterIssueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterIssue
     */
    omit?: NewsletterIssueOmit<ExtArgs> | null
    /**
     * Filter, which NewsletterIssue to fetch.
     */
    where: NewsletterIssueWhereUniqueInput
  }

  /**
   * NewsletterIssue findFirst
   */
  export type NewsletterIssueFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterIssue
     */
    select?: NewsletterIssueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterIssue
     */
    omit?: NewsletterIssueOmit<ExtArgs> | null
    /**
     * Filter, which NewsletterIssue to fetch.
     */
    where?: NewsletterIssueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsletterIssues to fetch.
     */
    orderBy?: NewsletterIssueOrderByWithRelationInput | NewsletterIssueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NewsletterIssues.
     */
    cursor?: NewsletterIssueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsletterIssues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsletterIssues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NewsletterIssues.
     */
    distinct?: NewsletterIssueScalarFieldEnum | NewsletterIssueScalarFieldEnum[]
  }

  /**
   * NewsletterIssue findFirstOrThrow
   */
  export type NewsletterIssueFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterIssue
     */
    select?: NewsletterIssueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterIssue
     */
    omit?: NewsletterIssueOmit<ExtArgs> | null
    /**
     * Filter, which NewsletterIssue to fetch.
     */
    where?: NewsletterIssueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsletterIssues to fetch.
     */
    orderBy?: NewsletterIssueOrderByWithRelationInput | NewsletterIssueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NewsletterIssues.
     */
    cursor?: NewsletterIssueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsletterIssues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsletterIssues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NewsletterIssues.
     */
    distinct?: NewsletterIssueScalarFieldEnum | NewsletterIssueScalarFieldEnum[]
  }

  /**
   * NewsletterIssue findMany
   */
  export type NewsletterIssueFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterIssue
     */
    select?: NewsletterIssueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterIssue
     */
    omit?: NewsletterIssueOmit<ExtArgs> | null
    /**
     * Filter, which NewsletterIssues to fetch.
     */
    where?: NewsletterIssueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsletterIssues to fetch.
     */
    orderBy?: NewsletterIssueOrderByWithRelationInput | NewsletterIssueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NewsletterIssues.
     */
    cursor?: NewsletterIssueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsletterIssues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsletterIssues.
     */
    skip?: number
    distinct?: NewsletterIssueScalarFieldEnum | NewsletterIssueScalarFieldEnum[]
  }

  /**
   * NewsletterIssue create
   */
  export type NewsletterIssueCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterIssue
     */
    select?: NewsletterIssueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterIssue
     */
    omit?: NewsletterIssueOmit<ExtArgs> | null
    /**
     * The data needed to create a NewsletterIssue.
     */
    data: XOR<NewsletterIssueCreateInput, NewsletterIssueUncheckedCreateInput>
  }

  /**
   * NewsletterIssue createMany
   */
  export type NewsletterIssueCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NewsletterIssues.
     */
    data: NewsletterIssueCreateManyInput | NewsletterIssueCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NewsletterIssue createManyAndReturn
   */
  export type NewsletterIssueCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterIssue
     */
    select?: NewsletterIssueSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterIssue
     */
    omit?: NewsletterIssueOmit<ExtArgs> | null
    /**
     * The data used to create many NewsletterIssues.
     */
    data: NewsletterIssueCreateManyInput | NewsletterIssueCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NewsletterIssue update
   */
  export type NewsletterIssueUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterIssue
     */
    select?: NewsletterIssueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterIssue
     */
    omit?: NewsletterIssueOmit<ExtArgs> | null
    /**
     * The data needed to update a NewsletterIssue.
     */
    data: XOR<NewsletterIssueUpdateInput, NewsletterIssueUncheckedUpdateInput>
    /**
     * Choose, which NewsletterIssue to update.
     */
    where: NewsletterIssueWhereUniqueInput
  }

  /**
   * NewsletterIssue updateMany
   */
  export type NewsletterIssueUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NewsletterIssues.
     */
    data: XOR<NewsletterIssueUpdateManyMutationInput, NewsletterIssueUncheckedUpdateManyInput>
    /**
     * Filter which NewsletterIssues to update
     */
    where?: NewsletterIssueWhereInput
    /**
     * Limit how many NewsletterIssues to update.
     */
    limit?: number
  }

  /**
   * NewsletterIssue updateManyAndReturn
   */
  export type NewsletterIssueUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterIssue
     */
    select?: NewsletterIssueSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterIssue
     */
    omit?: NewsletterIssueOmit<ExtArgs> | null
    /**
     * The data used to update NewsletterIssues.
     */
    data: XOR<NewsletterIssueUpdateManyMutationInput, NewsletterIssueUncheckedUpdateManyInput>
    /**
     * Filter which NewsletterIssues to update
     */
    where?: NewsletterIssueWhereInput
    /**
     * Limit how many NewsletterIssues to update.
     */
    limit?: number
  }

  /**
   * NewsletterIssue upsert
   */
  export type NewsletterIssueUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterIssue
     */
    select?: NewsletterIssueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterIssue
     */
    omit?: NewsletterIssueOmit<ExtArgs> | null
    /**
     * The filter to search for the NewsletterIssue to update in case it exists.
     */
    where: NewsletterIssueWhereUniqueInput
    /**
     * In case the NewsletterIssue found by the `where` argument doesn't exist, create a new NewsletterIssue with this data.
     */
    create: XOR<NewsletterIssueCreateInput, NewsletterIssueUncheckedCreateInput>
    /**
     * In case the NewsletterIssue was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NewsletterIssueUpdateInput, NewsletterIssueUncheckedUpdateInput>
  }

  /**
   * NewsletterIssue delete
   */
  export type NewsletterIssueDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterIssue
     */
    select?: NewsletterIssueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterIssue
     */
    omit?: NewsletterIssueOmit<ExtArgs> | null
    /**
     * Filter which NewsletterIssue to delete.
     */
    where: NewsletterIssueWhereUniqueInput
  }

  /**
   * NewsletterIssue deleteMany
   */
  export type NewsletterIssueDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NewsletterIssues to delete
     */
    where?: NewsletterIssueWhereInput
    /**
     * Limit how many NewsletterIssues to delete.
     */
    limit?: number
  }

  /**
   * NewsletterIssue without action
   */
  export type NewsletterIssueDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterIssue
     */
    select?: NewsletterIssueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterIssue
     */
    omit?: NewsletterIssueOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const PostScalarFieldEnum: {
    id: 'id',
    title: 'title',
    slug: 'slug',
    description: 'description',
    content: 'content',
    imageUrl: 'imageUrl',
    published: 'published',
    category: 'category',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PostScalarFieldEnum = (typeof PostScalarFieldEnum)[keyof typeof PostScalarFieldEnum]


  export const RecipeScalarFieldEnum: {
    id: 'id',
    title: 'title',
    slug: 'slug',
    description: 'description',
    ingredients: 'ingredients',
    instructions: 'instructions',
    prepTime: 'prepTime',
    cookTime: 'cookTime',
    servings: 'servings',
    category: 'category',
    imageUrl: 'imageUrl',
    published: 'published',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    recipeCategoryId: 'recipeCategoryId'
  };

  export type RecipeScalarFieldEnum = (typeof RecipeScalarFieldEnum)[keyof typeof RecipeScalarFieldEnum]


  export const RecipeCategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RecipeCategoryScalarFieldEnum = (typeof RecipeCategoryScalarFieldEnum)[keyof typeof RecipeCategoryScalarFieldEnum]


  export const NewsletterSubscriptionScalarFieldEnum: {
    id: 'id',
    email: 'email',
    subscribed: 'subscribed',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type NewsletterSubscriptionScalarFieldEnum = (typeof NewsletterSubscriptionScalarFieldEnum)[keyof typeof NewsletterSubscriptionScalarFieldEnum]


  export const NewsletterIssueScalarFieldEnum: {
    id: 'id',
    title: 'title',
    content: 'content',
    newsletterImage: 'newsletterImage',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    sentAt: 'sentAt',
    scheduledAt: 'scheduledAt'
  };

  export type NewsletterIssueScalarFieldEnum = (typeof NewsletterIssueScalarFieldEnum)[keyof typeof NewsletterIssueScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'NewsletterStatus'
   */
  export type EnumNewsletterStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NewsletterStatus'>
    


  /**
   * Reference to a field of type 'NewsletterStatus[]'
   */
  export type ListEnumNewsletterStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NewsletterStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type PostWhereInput = {
    AND?: PostWhereInput | PostWhereInput[]
    OR?: PostWhereInput[]
    NOT?: PostWhereInput | PostWhereInput[]
    id?: StringFilter<"Post"> | string
    title?: StringFilter<"Post"> | string
    slug?: StringFilter<"Post"> | string
    description?: StringNullableFilter<"Post"> | string | null
    content?: StringFilter<"Post"> | string
    imageUrl?: StringNullableFilter<"Post"> | string | null
    published?: BoolFilter<"Post"> | boolean
    category?: StringNullableFilter<"Post"> | string | null
    createdAt?: DateTimeFilter<"Post"> | Date | string
    updatedAt?: DateTimeFilter<"Post"> | Date | string
  }

  export type PostOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    content?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    published?: SortOrder
    category?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PostWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: PostWhereInput | PostWhereInput[]
    OR?: PostWhereInput[]
    NOT?: PostWhereInput | PostWhereInput[]
    title?: StringFilter<"Post"> | string
    description?: StringNullableFilter<"Post"> | string | null
    content?: StringFilter<"Post"> | string
    imageUrl?: StringNullableFilter<"Post"> | string | null
    published?: BoolFilter<"Post"> | boolean
    category?: StringNullableFilter<"Post"> | string | null
    createdAt?: DateTimeFilter<"Post"> | Date | string
    updatedAt?: DateTimeFilter<"Post"> | Date | string
  }, "id" | "slug">

  export type PostOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    content?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    published?: SortOrder
    category?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PostCountOrderByAggregateInput
    _max?: PostMaxOrderByAggregateInput
    _min?: PostMinOrderByAggregateInput
  }

  export type PostScalarWhereWithAggregatesInput = {
    AND?: PostScalarWhereWithAggregatesInput | PostScalarWhereWithAggregatesInput[]
    OR?: PostScalarWhereWithAggregatesInput[]
    NOT?: PostScalarWhereWithAggregatesInput | PostScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Post"> | string
    title?: StringWithAggregatesFilter<"Post"> | string
    slug?: StringWithAggregatesFilter<"Post"> | string
    description?: StringNullableWithAggregatesFilter<"Post"> | string | null
    content?: StringWithAggregatesFilter<"Post"> | string
    imageUrl?: StringNullableWithAggregatesFilter<"Post"> | string | null
    published?: BoolWithAggregatesFilter<"Post"> | boolean
    category?: StringNullableWithAggregatesFilter<"Post"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Post"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Post"> | Date | string
  }

  export type RecipeWhereInput = {
    AND?: RecipeWhereInput | RecipeWhereInput[]
    OR?: RecipeWhereInput[]
    NOT?: RecipeWhereInput | RecipeWhereInput[]
    id?: StringFilter<"Recipe"> | string
    title?: StringFilter<"Recipe"> | string
    slug?: StringFilter<"Recipe"> | string
    description?: StringFilter<"Recipe"> | string
    ingredients?: StringFilter<"Recipe"> | string
    instructions?: StringFilter<"Recipe"> | string
    prepTime?: StringNullableFilter<"Recipe"> | string | null
    cookTime?: StringNullableFilter<"Recipe"> | string | null
    servings?: StringNullableFilter<"Recipe"> | string | null
    category?: StringNullableFilter<"Recipe"> | string | null
    imageUrl?: StringNullableFilter<"Recipe"> | string | null
    published?: BoolFilter<"Recipe"> | boolean
    createdAt?: DateTimeFilter<"Recipe"> | Date | string
    updatedAt?: DateTimeFilter<"Recipe"> | Date | string
    recipeCategoryId?: StringNullableFilter<"Recipe"> | string | null
    recipeCategory?: XOR<RecipeCategoryNullableScalarRelationFilter, RecipeCategoryWhereInput> | null
  }

  export type RecipeOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    ingredients?: SortOrder
    instructions?: SortOrder
    prepTime?: SortOrderInput | SortOrder
    cookTime?: SortOrderInput | SortOrder
    servings?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    recipeCategoryId?: SortOrderInput | SortOrder
    recipeCategory?: RecipeCategoryOrderByWithRelationInput
  }

  export type RecipeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: RecipeWhereInput | RecipeWhereInput[]
    OR?: RecipeWhereInput[]
    NOT?: RecipeWhereInput | RecipeWhereInput[]
    title?: StringFilter<"Recipe"> | string
    description?: StringFilter<"Recipe"> | string
    ingredients?: StringFilter<"Recipe"> | string
    instructions?: StringFilter<"Recipe"> | string
    prepTime?: StringNullableFilter<"Recipe"> | string | null
    cookTime?: StringNullableFilter<"Recipe"> | string | null
    servings?: StringNullableFilter<"Recipe"> | string | null
    category?: StringNullableFilter<"Recipe"> | string | null
    imageUrl?: StringNullableFilter<"Recipe"> | string | null
    published?: BoolFilter<"Recipe"> | boolean
    createdAt?: DateTimeFilter<"Recipe"> | Date | string
    updatedAt?: DateTimeFilter<"Recipe"> | Date | string
    recipeCategoryId?: StringNullableFilter<"Recipe"> | string | null
    recipeCategory?: XOR<RecipeCategoryNullableScalarRelationFilter, RecipeCategoryWhereInput> | null
  }, "id" | "slug">

  export type RecipeOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    ingredients?: SortOrder
    instructions?: SortOrder
    prepTime?: SortOrderInput | SortOrder
    cookTime?: SortOrderInput | SortOrder
    servings?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    recipeCategoryId?: SortOrderInput | SortOrder
    _count?: RecipeCountOrderByAggregateInput
    _max?: RecipeMaxOrderByAggregateInput
    _min?: RecipeMinOrderByAggregateInput
  }

  export type RecipeScalarWhereWithAggregatesInput = {
    AND?: RecipeScalarWhereWithAggregatesInput | RecipeScalarWhereWithAggregatesInput[]
    OR?: RecipeScalarWhereWithAggregatesInput[]
    NOT?: RecipeScalarWhereWithAggregatesInput | RecipeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Recipe"> | string
    title?: StringWithAggregatesFilter<"Recipe"> | string
    slug?: StringWithAggregatesFilter<"Recipe"> | string
    description?: StringWithAggregatesFilter<"Recipe"> | string
    ingredients?: StringWithAggregatesFilter<"Recipe"> | string
    instructions?: StringWithAggregatesFilter<"Recipe"> | string
    prepTime?: StringNullableWithAggregatesFilter<"Recipe"> | string | null
    cookTime?: StringNullableWithAggregatesFilter<"Recipe"> | string | null
    servings?: StringNullableWithAggregatesFilter<"Recipe"> | string | null
    category?: StringNullableWithAggregatesFilter<"Recipe"> | string | null
    imageUrl?: StringNullableWithAggregatesFilter<"Recipe"> | string | null
    published?: BoolWithAggregatesFilter<"Recipe"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Recipe"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Recipe"> | Date | string
    recipeCategoryId?: StringNullableWithAggregatesFilter<"Recipe"> | string | null
  }

  export type RecipeCategoryWhereInput = {
    AND?: RecipeCategoryWhereInput | RecipeCategoryWhereInput[]
    OR?: RecipeCategoryWhereInput[]
    NOT?: RecipeCategoryWhereInput | RecipeCategoryWhereInput[]
    id?: StringFilter<"RecipeCategory"> | string
    name?: StringFilter<"RecipeCategory"> | string
    createdAt?: DateTimeFilter<"RecipeCategory"> | Date | string
    updatedAt?: DateTimeFilter<"RecipeCategory"> | Date | string
    recipes?: RecipeListRelationFilter
  }

  export type RecipeCategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    recipes?: RecipeOrderByRelationAggregateInput
  }

  export type RecipeCategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: RecipeCategoryWhereInput | RecipeCategoryWhereInput[]
    OR?: RecipeCategoryWhereInput[]
    NOT?: RecipeCategoryWhereInput | RecipeCategoryWhereInput[]
    createdAt?: DateTimeFilter<"RecipeCategory"> | Date | string
    updatedAt?: DateTimeFilter<"RecipeCategory"> | Date | string
    recipes?: RecipeListRelationFilter
  }, "id" | "name">

  export type RecipeCategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RecipeCategoryCountOrderByAggregateInput
    _max?: RecipeCategoryMaxOrderByAggregateInput
    _min?: RecipeCategoryMinOrderByAggregateInput
  }

  export type RecipeCategoryScalarWhereWithAggregatesInput = {
    AND?: RecipeCategoryScalarWhereWithAggregatesInput | RecipeCategoryScalarWhereWithAggregatesInput[]
    OR?: RecipeCategoryScalarWhereWithAggregatesInput[]
    NOT?: RecipeCategoryScalarWhereWithAggregatesInput | RecipeCategoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RecipeCategory"> | string
    name?: StringWithAggregatesFilter<"RecipeCategory"> | string
    createdAt?: DateTimeWithAggregatesFilter<"RecipeCategory"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"RecipeCategory"> | Date | string
  }

  export type NewsletterSubscriptionWhereInput = {
    AND?: NewsletterSubscriptionWhereInput | NewsletterSubscriptionWhereInput[]
    OR?: NewsletterSubscriptionWhereInput[]
    NOT?: NewsletterSubscriptionWhereInput | NewsletterSubscriptionWhereInput[]
    id?: StringFilter<"NewsletterSubscription"> | string
    email?: StringFilter<"NewsletterSubscription"> | string
    subscribed?: BoolFilter<"NewsletterSubscription"> | boolean
    createdAt?: DateTimeFilter<"NewsletterSubscription"> | Date | string
    updatedAt?: DateTimeFilter<"NewsletterSubscription"> | Date | string
  }

  export type NewsletterSubscriptionOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    subscribed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NewsletterSubscriptionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: NewsletterSubscriptionWhereInput | NewsletterSubscriptionWhereInput[]
    OR?: NewsletterSubscriptionWhereInput[]
    NOT?: NewsletterSubscriptionWhereInput | NewsletterSubscriptionWhereInput[]
    subscribed?: BoolFilter<"NewsletterSubscription"> | boolean
    createdAt?: DateTimeFilter<"NewsletterSubscription"> | Date | string
    updatedAt?: DateTimeFilter<"NewsletterSubscription"> | Date | string
  }, "id" | "email">

  export type NewsletterSubscriptionOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    subscribed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: NewsletterSubscriptionCountOrderByAggregateInput
    _max?: NewsletterSubscriptionMaxOrderByAggregateInput
    _min?: NewsletterSubscriptionMinOrderByAggregateInput
  }

  export type NewsletterSubscriptionScalarWhereWithAggregatesInput = {
    AND?: NewsletterSubscriptionScalarWhereWithAggregatesInput | NewsletterSubscriptionScalarWhereWithAggregatesInput[]
    OR?: NewsletterSubscriptionScalarWhereWithAggregatesInput[]
    NOT?: NewsletterSubscriptionScalarWhereWithAggregatesInput | NewsletterSubscriptionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"NewsletterSubscription"> | string
    email?: StringWithAggregatesFilter<"NewsletterSubscription"> | string
    subscribed?: BoolWithAggregatesFilter<"NewsletterSubscription"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"NewsletterSubscription"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"NewsletterSubscription"> | Date | string
  }

  export type NewsletterIssueWhereInput = {
    AND?: NewsletterIssueWhereInput | NewsletterIssueWhereInput[]
    OR?: NewsletterIssueWhereInput[]
    NOT?: NewsletterIssueWhereInput | NewsletterIssueWhereInput[]
    id?: StringFilter<"NewsletterIssue"> | string
    title?: StringFilter<"NewsletterIssue"> | string
    content?: StringFilter<"NewsletterIssue"> | string
    newsletterImage?: StringNullableFilter<"NewsletterIssue"> | string | null
    status?: EnumNewsletterStatusFilter<"NewsletterIssue"> | $Enums.NewsletterStatus
    createdAt?: DateTimeFilter<"NewsletterIssue"> | Date | string
    updatedAt?: DateTimeFilter<"NewsletterIssue"> | Date | string
    sentAt?: DateTimeNullableFilter<"NewsletterIssue"> | Date | string | null
    scheduledAt?: DateTimeNullableFilter<"NewsletterIssue"> | Date | string | null
  }

  export type NewsletterIssueOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    newsletterImage?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sentAt?: SortOrderInput | SortOrder
    scheduledAt?: SortOrderInput | SortOrder
  }

  export type NewsletterIssueWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NewsletterIssueWhereInput | NewsletterIssueWhereInput[]
    OR?: NewsletterIssueWhereInput[]
    NOT?: NewsletterIssueWhereInput | NewsletterIssueWhereInput[]
    title?: StringFilter<"NewsletterIssue"> | string
    content?: StringFilter<"NewsletterIssue"> | string
    newsletterImage?: StringNullableFilter<"NewsletterIssue"> | string | null
    status?: EnumNewsletterStatusFilter<"NewsletterIssue"> | $Enums.NewsletterStatus
    createdAt?: DateTimeFilter<"NewsletterIssue"> | Date | string
    updatedAt?: DateTimeFilter<"NewsletterIssue"> | Date | string
    sentAt?: DateTimeNullableFilter<"NewsletterIssue"> | Date | string | null
    scheduledAt?: DateTimeNullableFilter<"NewsletterIssue"> | Date | string | null
  }, "id">

  export type NewsletterIssueOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    newsletterImage?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sentAt?: SortOrderInput | SortOrder
    scheduledAt?: SortOrderInput | SortOrder
    _count?: NewsletterIssueCountOrderByAggregateInput
    _max?: NewsletterIssueMaxOrderByAggregateInput
    _min?: NewsletterIssueMinOrderByAggregateInput
  }

  export type NewsletterIssueScalarWhereWithAggregatesInput = {
    AND?: NewsletterIssueScalarWhereWithAggregatesInput | NewsletterIssueScalarWhereWithAggregatesInput[]
    OR?: NewsletterIssueScalarWhereWithAggregatesInput[]
    NOT?: NewsletterIssueScalarWhereWithAggregatesInput | NewsletterIssueScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"NewsletterIssue"> | string
    title?: StringWithAggregatesFilter<"NewsletterIssue"> | string
    content?: StringWithAggregatesFilter<"NewsletterIssue"> | string
    newsletterImage?: StringNullableWithAggregatesFilter<"NewsletterIssue"> | string | null
    status?: EnumNewsletterStatusWithAggregatesFilter<"NewsletterIssue"> | $Enums.NewsletterStatus
    createdAt?: DateTimeWithAggregatesFilter<"NewsletterIssue"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"NewsletterIssue"> | Date | string
    sentAt?: DateTimeNullableWithAggregatesFilter<"NewsletterIssue"> | Date | string | null
    scheduledAt?: DateTimeNullableWithAggregatesFilter<"NewsletterIssue"> | Date | string | null
  }

  export type PostCreateInput = {
    id?: string
    title: string
    slug: string
    description?: string | null
    content: string
    imageUrl?: string | null
    published?: boolean
    category?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PostUncheckedCreateInput = {
    id?: string
    title: string
    slug: string
    description?: string | null
    content: string
    imageUrl?: string | null
    published?: boolean
    category?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PostUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    category?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    category?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostCreateManyInput = {
    id?: string
    title: string
    slug: string
    description?: string | null
    content: string
    imageUrl?: string | null
    published?: boolean
    category?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PostUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    category?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    category?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecipeCreateInput = {
    id?: string
    title: string
    slug: string
    description: string
    ingredients: string
    instructions: string
    prepTime?: string | null
    cookTime?: string | null
    servings?: string | null
    category?: string | null
    imageUrl?: string | null
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    recipeCategory?: RecipeCategoryCreateNestedOneWithoutRecipesInput
  }

  export type RecipeUncheckedCreateInput = {
    id?: string
    title: string
    slug: string
    description: string
    ingredients: string
    instructions: string
    prepTime?: string | null
    cookTime?: string | null
    servings?: string | null
    category?: string | null
    imageUrl?: string | null
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    recipeCategoryId?: string | null
  }

  export type RecipeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    ingredients?: StringFieldUpdateOperationsInput | string
    instructions?: StringFieldUpdateOperationsInput | string
    prepTime?: NullableStringFieldUpdateOperationsInput | string | null
    cookTime?: NullableStringFieldUpdateOperationsInput | string | null
    servings?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recipeCategory?: RecipeCategoryUpdateOneWithoutRecipesNestedInput
  }

  export type RecipeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    ingredients?: StringFieldUpdateOperationsInput | string
    instructions?: StringFieldUpdateOperationsInput | string
    prepTime?: NullableStringFieldUpdateOperationsInput | string | null
    cookTime?: NullableStringFieldUpdateOperationsInput | string | null
    servings?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recipeCategoryId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RecipeCreateManyInput = {
    id?: string
    title: string
    slug: string
    description: string
    ingredients: string
    instructions: string
    prepTime?: string | null
    cookTime?: string | null
    servings?: string | null
    category?: string | null
    imageUrl?: string | null
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    recipeCategoryId?: string | null
  }

  export type RecipeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    ingredients?: StringFieldUpdateOperationsInput | string
    instructions?: StringFieldUpdateOperationsInput | string
    prepTime?: NullableStringFieldUpdateOperationsInput | string | null
    cookTime?: NullableStringFieldUpdateOperationsInput | string | null
    servings?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecipeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    ingredients?: StringFieldUpdateOperationsInput | string
    instructions?: StringFieldUpdateOperationsInput | string
    prepTime?: NullableStringFieldUpdateOperationsInput | string | null
    cookTime?: NullableStringFieldUpdateOperationsInput | string | null
    servings?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recipeCategoryId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RecipeCategoryCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    recipes?: RecipeCreateNestedManyWithoutRecipeCategoryInput
  }

  export type RecipeCategoryUncheckedCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    recipes?: RecipeUncheckedCreateNestedManyWithoutRecipeCategoryInput
  }

  export type RecipeCategoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recipes?: RecipeUpdateManyWithoutRecipeCategoryNestedInput
  }

  export type RecipeCategoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recipes?: RecipeUncheckedUpdateManyWithoutRecipeCategoryNestedInput
  }

  export type RecipeCategoryCreateManyInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RecipeCategoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecipeCategoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsletterSubscriptionCreateInput = {
    id?: string
    email: string
    subscribed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NewsletterSubscriptionUncheckedCreateInput = {
    id?: string
    email: string
    subscribed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NewsletterSubscriptionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    subscribed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsletterSubscriptionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    subscribed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsletterSubscriptionCreateManyInput = {
    id?: string
    email: string
    subscribed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NewsletterSubscriptionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    subscribed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsletterSubscriptionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    subscribed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsletterIssueCreateInput = {
    id?: string
    title: string
    content: string
    newsletterImage?: string | null
    status?: $Enums.NewsletterStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    sentAt?: Date | string | null
    scheduledAt?: Date | string | null
  }

  export type NewsletterIssueUncheckedCreateInput = {
    id?: string
    title: string
    content: string
    newsletterImage?: string | null
    status?: $Enums.NewsletterStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    sentAt?: Date | string | null
    scheduledAt?: Date | string | null
  }

  export type NewsletterIssueUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    newsletterImage?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumNewsletterStatusFieldUpdateOperationsInput | $Enums.NewsletterStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type NewsletterIssueUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    newsletterImage?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumNewsletterStatusFieldUpdateOperationsInput | $Enums.NewsletterStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type NewsletterIssueCreateManyInput = {
    id?: string
    title: string
    content: string
    newsletterImage?: string | null
    status?: $Enums.NewsletterStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    sentAt?: Date | string | null
    scheduledAt?: Date | string | null
  }

  export type NewsletterIssueUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    newsletterImage?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumNewsletterStatusFieldUpdateOperationsInput | $Enums.NewsletterStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type NewsletterIssueUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    newsletterImage?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumNewsletterStatusFieldUpdateOperationsInput | $Enums.NewsletterStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PostCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    content?: SortOrder
    imageUrl?: SortOrder
    published?: SortOrder
    category?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PostMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    content?: SortOrder
    imageUrl?: SortOrder
    published?: SortOrder
    category?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PostMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    content?: SortOrder
    imageUrl?: SortOrder
    published?: SortOrder
    category?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type RecipeCategoryNullableScalarRelationFilter = {
    is?: RecipeCategoryWhereInput | null
    isNot?: RecipeCategoryWhereInput | null
  }

  export type RecipeCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    ingredients?: SortOrder
    instructions?: SortOrder
    prepTime?: SortOrder
    cookTime?: SortOrder
    servings?: SortOrder
    category?: SortOrder
    imageUrl?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    recipeCategoryId?: SortOrder
  }

  export type RecipeMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    ingredients?: SortOrder
    instructions?: SortOrder
    prepTime?: SortOrder
    cookTime?: SortOrder
    servings?: SortOrder
    category?: SortOrder
    imageUrl?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    recipeCategoryId?: SortOrder
  }

  export type RecipeMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    ingredients?: SortOrder
    instructions?: SortOrder
    prepTime?: SortOrder
    cookTime?: SortOrder
    servings?: SortOrder
    category?: SortOrder
    imageUrl?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    recipeCategoryId?: SortOrder
  }

  export type RecipeListRelationFilter = {
    every?: RecipeWhereInput
    some?: RecipeWhereInput
    none?: RecipeWhereInput
  }

  export type RecipeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RecipeCategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RecipeCategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RecipeCategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NewsletterSubscriptionCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    subscribed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NewsletterSubscriptionMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    subscribed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NewsletterSubscriptionMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    subscribed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumNewsletterStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.NewsletterStatus | EnumNewsletterStatusFieldRefInput<$PrismaModel>
    in?: $Enums.NewsletterStatus[] | ListEnumNewsletterStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.NewsletterStatus[] | ListEnumNewsletterStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumNewsletterStatusFilter<$PrismaModel> | $Enums.NewsletterStatus
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NewsletterIssueCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    newsletterImage?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sentAt?: SortOrder
    scheduledAt?: SortOrder
  }

  export type NewsletterIssueMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    newsletterImage?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sentAt?: SortOrder
    scheduledAt?: SortOrder
  }

  export type NewsletterIssueMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    newsletterImage?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sentAt?: SortOrder
    scheduledAt?: SortOrder
  }

  export type EnumNewsletterStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NewsletterStatus | EnumNewsletterStatusFieldRefInput<$PrismaModel>
    in?: $Enums.NewsletterStatus[] | ListEnumNewsletterStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.NewsletterStatus[] | ListEnumNewsletterStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumNewsletterStatusWithAggregatesFilter<$PrismaModel> | $Enums.NewsletterStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNewsletterStatusFilter<$PrismaModel>
    _max?: NestedEnumNewsletterStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type RecipeCategoryCreateNestedOneWithoutRecipesInput = {
    create?: XOR<RecipeCategoryCreateWithoutRecipesInput, RecipeCategoryUncheckedCreateWithoutRecipesInput>
    connectOrCreate?: RecipeCategoryCreateOrConnectWithoutRecipesInput
    connect?: RecipeCategoryWhereUniqueInput
  }

  export type RecipeCategoryUpdateOneWithoutRecipesNestedInput = {
    create?: XOR<RecipeCategoryCreateWithoutRecipesInput, RecipeCategoryUncheckedCreateWithoutRecipesInput>
    connectOrCreate?: RecipeCategoryCreateOrConnectWithoutRecipesInput
    upsert?: RecipeCategoryUpsertWithoutRecipesInput
    disconnect?: RecipeCategoryWhereInput | boolean
    delete?: RecipeCategoryWhereInput | boolean
    connect?: RecipeCategoryWhereUniqueInput
    update?: XOR<XOR<RecipeCategoryUpdateToOneWithWhereWithoutRecipesInput, RecipeCategoryUpdateWithoutRecipesInput>, RecipeCategoryUncheckedUpdateWithoutRecipesInput>
  }

  export type RecipeCreateNestedManyWithoutRecipeCategoryInput = {
    create?: XOR<RecipeCreateWithoutRecipeCategoryInput, RecipeUncheckedCreateWithoutRecipeCategoryInput> | RecipeCreateWithoutRecipeCategoryInput[] | RecipeUncheckedCreateWithoutRecipeCategoryInput[]
    connectOrCreate?: RecipeCreateOrConnectWithoutRecipeCategoryInput | RecipeCreateOrConnectWithoutRecipeCategoryInput[]
    createMany?: RecipeCreateManyRecipeCategoryInputEnvelope
    connect?: RecipeWhereUniqueInput | RecipeWhereUniqueInput[]
  }

  export type RecipeUncheckedCreateNestedManyWithoutRecipeCategoryInput = {
    create?: XOR<RecipeCreateWithoutRecipeCategoryInput, RecipeUncheckedCreateWithoutRecipeCategoryInput> | RecipeCreateWithoutRecipeCategoryInput[] | RecipeUncheckedCreateWithoutRecipeCategoryInput[]
    connectOrCreate?: RecipeCreateOrConnectWithoutRecipeCategoryInput | RecipeCreateOrConnectWithoutRecipeCategoryInput[]
    createMany?: RecipeCreateManyRecipeCategoryInputEnvelope
    connect?: RecipeWhereUniqueInput | RecipeWhereUniqueInput[]
  }

  export type RecipeUpdateManyWithoutRecipeCategoryNestedInput = {
    create?: XOR<RecipeCreateWithoutRecipeCategoryInput, RecipeUncheckedCreateWithoutRecipeCategoryInput> | RecipeCreateWithoutRecipeCategoryInput[] | RecipeUncheckedCreateWithoutRecipeCategoryInput[]
    connectOrCreate?: RecipeCreateOrConnectWithoutRecipeCategoryInput | RecipeCreateOrConnectWithoutRecipeCategoryInput[]
    upsert?: RecipeUpsertWithWhereUniqueWithoutRecipeCategoryInput | RecipeUpsertWithWhereUniqueWithoutRecipeCategoryInput[]
    createMany?: RecipeCreateManyRecipeCategoryInputEnvelope
    set?: RecipeWhereUniqueInput | RecipeWhereUniqueInput[]
    disconnect?: RecipeWhereUniqueInput | RecipeWhereUniqueInput[]
    delete?: RecipeWhereUniqueInput | RecipeWhereUniqueInput[]
    connect?: RecipeWhereUniqueInput | RecipeWhereUniqueInput[]
    update?: RecipeUpdateWithWhereUniqueWithoutRecipeCategoryInput | RecipeUpdateWithWhereUniqueWithoutRecipeCategoryInput[]
    updateMany?: RecipeUpdateManyWithWhereWithoutRecipeCategoryInput | RecipeUpdateManyWithWhereWithoutRecipeCategoryInput[]
    deleteMany?: RecipeScalarWhereInput | RecipeScalarWhereInput[]
  }

  export type RecipeUncheckedUpdateManyWithoutRecipeCategoryNestedInput = {
    create?: XOR<RecipeCreateWithoutRecipeCategoryInput, RecipeUncheckedCreateWithoutRecipeCategoryInput> | RecipeCreateWithoutRecipeCategoryInput[] | RecipeUncheckedCreateWithoutRecipeCategoryInput[]
    connectOrCreate?: RecipeCreateOrConnectWithoutRecipeCategoryInput | RecipeCreateOrConnectWithoutRecipeCategoryInput[]
    upsert?: RecipeUpsertWithWhereUniqueWithoutRecipeCategoryInput | RecipeUpsertWithWhereUniqueWithoutRecipeCategoryInput[]
    createMany?: RecipeCreateManyRecipeCategoryInputEnvelope
    set?: RecipeWhereUniqueInput | RecipeWhereUniqueInput[]
    disconnect?: RecipeWhereUniqueInput | RecipeWhereUniqueInput[]
    delete?: RecipeWhereUniqueInput | RecipeWhereUniqueInput[]
    connect?: RecipeWhereUniqueInput | RecipeWhereUniqueInput[]
    update?: RecipeUpdateWithWhereUniqueWithoutRecipeCategoryInput | RecipeUpdateWithWhereUniqueWithoutRecipeCategoryInput[]
    updateMany?: RecipeUpdateManyWithWhereWithoutRecipeCategoryInput | RecipeUpdateManyWithWhereWithoutRecipeCategoryInput[]
    deleteMany?: RecipeScalarWhereInput | RecipeScalarWhereInput[]
  }

  export type EnumNewsletterStatusFieldUpdateOperationsInput = {
    set?: $Enums.NewsletterStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumNewsletterStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.NewsletterStatus | EnumNewsletterStatusFieldRefInput<$PrismaModel>
    in?: $Enums.NewsletterStatus[] | ListEnumNewsletterStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.NewsletterStatus[] | ListEnumNewsletterStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumNewsletterStatusFilter<$PrismaModel> | $Enums.NewsletterStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumNewsletterStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NewsletterStatus | EnumNewsletterStatusFieldRefInput<$PrismaModel>
    in?: $Enums.NewsletterStatus[] | ListEnumNewsletterStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.NewsletterStatus[] | ListEnumNewsletterStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumNewsletterStatusWithAggregatesFilter<$PrismaModel> | $Enums.NewsletterStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNewsletterStatusFilter<$PrismaModel>
    _max?: NestedEnumNewsletterStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type RecipeCategoryCreateWithoutRecipesInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RecipeCategoryUncheckedCreateWithoutRecipesInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RecipeCategoryCreateOrConnectWithoutRecipesInput = {
    where: RecipeCategoryWhereUniqueInput
    create: XOR<RecipeCategoryCreateWithoutRecipesInput, RecipeCategoryUncheckedCreateWithoutRecipesInput>
  }

  export type RecipeCategoryUpsertWithoutRecipesInput = {
    update: XOR<RecipeCategoryUpdateWithoutRecipesInput, RecipeCategoryUncheckedUpdateWithoutRecipesInput>
    create: XOR<RecipeCategoryCreateWithoutRecipesInput, RecipeCategoryUncheckedCreateWithoutRecipesInput>
    where?: RecipeCategoryWhereInput
  }

  export type RecipeCategoryUpdateToOneWithWhereWithoutRecipesInput = {
    where?: RecipeCategoryWhereInput
    data: XOR<RecipeCategoryUpdateWithoutRecipesInput, RecipeCategoryUncheckedUpdateWithoutRecipesInput>
  }

  export type RecipeCategoryUpdateWithoutRecipesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecipeCategoryUncheckedUpdateWithoutRecipesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecipeCreateWithoutRecipeCategoryInput = {
    id?: string
    title: string
    slug: string
    description: string
    ingredients: string
    instructions: string
    prepTime?: string | null
    cookTime?: string | null
    servings?: string | null
    category?: string | null
    imageUrl?: string | null
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RecipeUncheckedCreateWithoutRecipeCategoryInput = {
    id?: string
    title: string
    slug: string
    description: string
    ingredients: string
    instructions: string
    prepTime?: string | null
    cookTime?: string | null
    servings?: string | null
    category?: string | null
    imageUrl?: string | null
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RecipeCreateOrConnectWithoutRecipeCategoryInput = {
    where: RecipeWhereUniqueInput
    create: XOR<RecipeCreateWithoutRecipeCategoryInput, RecipeUncheckedCreateWithoutRecipeCategoryInput>
  }

  export type RecipeCreateManyRecipeCategoryInputEnvelope = {
    data: RecipeCreateManyRecipeCategoryInput | RecipeCreateManyRecipeCategoryInput[]
    skipDuplicates?: boolean
  }

  export type RecipeUpsertWithWhereUniqueWithoutRecipeCategoryInput = {
    where: RecipeWhereUniqueInput
    update: XOR<RecipeUpdateWithoutRecipeCategoryInput, RecipeUncheckedUpdateWithoutRecipeCategoryInput>
    create: XOR<RecipeCreateWithoutRecipeCategoryInput, RecipeUncheckedCreateWithoutRecipeCategoryInput>
  }

  export type RecipeUpdateWithWhereUniqueWithoutRecipeCategoryInput = {
    where: RecipeWhereUniqueInput
    data: XOR<RecipeUpdateWithoutRecipeCategoryInput, RecipeUncheckedUpdateWithoutRecipeCategoryInput>
  }

  export type RecipeUpdateManyWithWhereWithoutRecipeCategoryInput = {
    where: RecipeScalarWhereInput
    data: XOR<RecipeUpdateManyMutationInput, RecipeUncheckedUpdateManyWithoutRecipeCategoryInput>
  }

  export type RecipeScalarWhereInput = {
    AND?: RecipeScalarWhereInput | RecipeScalarWhereInput[]
    OR?: RecipeScalarWhereInput[]
    NOT?: RecipeScalarWhereInput | RecipeScalarWhereInput[]
    id?: StringFilter<"Recipe"> | string
    title?: StringFilter<"Recipe"> | string
    slug?: StringFilter<"Recipe"> | string
    description?: StringFilter<"Recipe"> | string
    ingredients?: StringFilter<"Recipe"> | string
    instructions?: StringFilter<"Recipe"> | string
    prepTime?: StringNullableFilter<"Recipe"> | string | null
    cookTime?: StringNullableFilter<"Recipe"> | string | null
    servings?: StringNullableFilter<"Recipe"> | string | null
    category?: StringNullableFilter<"Recipe"> | string | null
    imageUrl?: StringNullableFilter<"Recipe"> | string | null
    published?: BoolFilter<"Recipe"> | boolean
    createdAt?: DateTimeFilter<"Recipe"> | Date | string
    updatedAt?: DateTimeFilter<"Recipe"> | Date | string
    recipeCategoryId?: StringNullableFilter<"Recipe"> | string | null
  }

  export type RecipeCreateManyRecipeCategoryInput = {
    id?: string
    title: string
    slug: string
    description: string
    ingredients: string
    instructions: string
    prepTime?: string | null
    cookTime?: string | null
    servings?: string | null
    category?: string | null
    imageUrl?: string | null
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RecipeUpdateWithoutRecipeCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    ingredients?: StringFieldUpdateOperationsInput | string
    instructions?: StringFieldUpdateOperationsInput | string
    prepTime?: NullableStringFieldUpdateOperationsInput | string | null
    cookTime?: NullableStringFieldUpdateOperationsInput | string | null
    servings?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecipeUncheckedUpdateWithoutRecipeCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    ingredients?: StringFieldUpdateOperationsInput | string
    instructions?: StringFieldUpdateOperationsInput | string
    prepTime?: NullableStringFieldUpdateOperationsInput | string | null
    cookTime?: NullableStringFieldUpdateOperationsInput | string | null
    servings?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecipeUncheckedUpdateManyWithoutRecipeCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    ingredients?: StringFieldUpdateOperationsInput | string
    instructions?: StringFieldUpdateOperationsInput | string
    prepTime?: NullableStringFieldUpdateOperationsInput | string | null
    cookTime?: NullableStringFieldUpdateOperationsInput | string | null
    servings?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}