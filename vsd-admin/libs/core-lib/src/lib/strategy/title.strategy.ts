import { inject, Injectable } from '@angular/core';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { LabelService } from '../label/label.service';
import { LabelKey } from '@vsd-common/lib';

@Injectable({ providedIn: 'root' })
export class PageTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly labelService = inject(LabelService);

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this.title.setTitle(`${this.labelService.getLabel(LabelKey.APP_NAME)} | ${title}`);
    } else {
      this.title.setTitle(`${this.labelService.getLabel(LabelKey.APP_NAME)}`);
    }
  }
}
