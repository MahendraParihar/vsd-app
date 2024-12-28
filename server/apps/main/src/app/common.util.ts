import { Env } from '@server/common';

export class CommonUtil {
  public static readonly getMediaFolderPath = Env.persistentStorageAssetPath;
}
