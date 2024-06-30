import { Injectable } from '@angular/core';
import { HttpService } from '../services/http.service';
import { ApiUrls } from '../api-urls';
import { IResponse, capitalizeFirstLetter } from '@vsd-common/lib';
import { StorageService } from '../services';

@Injectable()
export class LabelService {
  labels: Map<string, string> = new Map<string, string>();

  constructor(private httpService: HttpService,
              private storageService: StorageService) {
  }

  async loadLabels() {
    const labels = (await this.httpService.getRequest<IResponse<any>>(ApiUrls.GET_ALL_LABELS)) as {
      [p: string]: string
    };
    const keys = Object.keys(labels);
    for (const l of keys) {
      this.labels.set(l, labels[l]);
    }
    this.storageService.setLabels(this.labels);
  }

  getLabel(key: string): string {
    if (this.labels.size === 0) {
      console.log(this.storageService.getLabels());
      this.labels = this.storageService.getLabels();
    }
    const l = this.labels.get(key) as string;
    if (l) {
      return l;
    }
    return capitalizeFirstLetter(key);
  }
}
