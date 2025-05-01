import { converterFactory, valueToBoolean, valueToNumber, valueToString } from './config.utils';

export const envExtractor = (key: string) => process.env[key];

const envToString = converterFactory(envExtractor, valueToString);
const envToBoolean = converterFactory(envExtractor, valueToBoolean);
const envToNumber = converterFactory(envExtractor, valueToNumber);

export class Env {
  public static databaseUsername = envToString('DB_USERNAME');
  public static databasePassword = envToString('DB_PASSWORD');
  public static databaseName = envToString('DB_NAME');
  public static databaseHost = envToString('DB_SERVER');
  public static databasePort = envToNumber('DB_PORT');
  public static databaseSchema = envToString('DB_SCHEMA');

  public static jwtSecret = envToString('JWT_SECRET');
  public static accessTokenTime = envToString('ACCESS_TOKEN_TIME');
  public static refreshTokenTime   = envToString('REFRESH_TOKEN_TIME');

  public static apiPort = envToNumber('API_PORT');

  public static readonly staticAssetPath = envToString('ASSET_PATH');
  public static readonly persistentStorageAssetPath = `${Env.staticAssetPath}`;
}
