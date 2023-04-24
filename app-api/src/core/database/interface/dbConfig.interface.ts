export interface IDatabaseConfigAttributes {
    username?: string;
    password?: string;
    database?: string;
    host?: string;
    port?: number | string;
    dialect?: string;
    urlDatabase?: string;
    synchronize?: boolean;
    logging: any;
    retryAttempts?: number;
    retryDelay?: number;
    autoLoadModels?: boolean;
    keepConnectionAlive?: boolean;
    models?: any[];
}

export interface IDatabaseConfig {
    development: IDatabaseConfigAttributes;
    test: IDatabaseConfigAttributes;
    production: IDatabaseConfigAttributes;
}