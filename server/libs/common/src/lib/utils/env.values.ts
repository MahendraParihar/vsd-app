export const envExtractor = (key: string) => process.env[key];

// const envToString = converterFactory(envExtractor, valueToString);
// const envToBoolean = converterFactory(envExtractor, valueToBoolean);
// const envToNumber = converterFactory(envExtractor, valueToNumber);

export class Env {
  public static coreURL = process.env['CORE_URL'];
  // public static serverName = envToString('SERVER_NAME');
  // public static serverSecret = envToString('SERVER_SECRET');
  public static logLevel = process.env['LOGGER_LEVEL'];

  public static databaseUsername = process.env['DB_USERNAME'];
  public static databasePassword = process.env['DB_PASSWORD'];
  public static databaseName = process.env['DB_NAME'];
  public static databaseHost = process.env['DB_SERVER'];
  public static databasePort = Number(process.env['DB_PORT']);
  public static databaseSchema = process.env['DB_SCHEMA'];

  public static apiPort = process.env['API_PORT'];
}
