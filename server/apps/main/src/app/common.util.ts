import { join } from 'path';

export class CommonUtil{
  static getMediaFolderPath(): string {
    return join(__dirname, '../../../apps/main/src', 'assets/media-files');
  }
}
