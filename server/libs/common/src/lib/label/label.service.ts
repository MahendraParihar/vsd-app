import { Inject, Injectable } from '@nestjs/common';
import { LABEL_VALUES } from './label.factory';

@Injectable()
export class LabelService {
  constructor(@Inject(LABEL_VALUES) private readonly config) {
  }

  public get = (key: string) => this.config[key];

  // public getString = converterFactory(this.get, valueToString);
  // public getBoolean = converterFactory(this.get, valueToBoolean);
  // public getNumber = converterFactory(this.get, valueToNumber);
}
