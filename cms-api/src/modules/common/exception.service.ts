import {Inject, Injectable} from '@nestjs/common';
import {LOG_ERROR,} from '../../constants/config-constants';
import {LogError} from "../../core/database/models/log-error.model";

@Injectable()
export class ExceptionService {

  constructor(@Inject(LOG_ERROR) private readonly logErrorRepository: typeof LogError) {

  }

  public async logError(method: string, controller: string, error: any): Promise<boolean> {
    return true;
    /*try {
      const addressObj = await this.logErrorRepository.create({
        environment: '',
        hosturl: '',
        controller: controller,
        methodname: method,
        exceptionMessage: '',
        exceptionMessageSQL: '',
        exceptionCode: '',
        exceptionType: '',
        exceptionStacktrace: error,
      });
    } catch (e) {
      return null;
    }*/
  }
}
