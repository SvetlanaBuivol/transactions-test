declare module "sql.js" {
  export class Database {
    constructor(data?: Uint8Array);

    exec(sqj: string): QueryResults[];
    run(sql: string, params?: any[]): this;
    each(
      sql: string,
      params: any[],
      callback: (row: any) => void,
      done: () => void
    ): void;
    prepare(sql: string, params?: any[]): Statement;
    export(): Uint8Array;
    close(): void;
    getRowsModified(): number;
  }

  export interface Statement {
    bind(values?: any[]): boolean;
    step(): boolean;
    get(): any[];
    geColumnNames(): string[];
    getAsObject(): any;
    free(): boolean;
    reset(): void;
  }

  export function open(data: Uint8Array): Database;
}
