import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LabelService } from '@core-lib';
import { LabelKey } from '@vsd-common/lib';

@Component({
  selector: 'vsd-web-app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  protected readonly LabelKey = LabelKey;
  btnList: { label: string, path: string, isActive: boolean }[] = [];

  constructor(private router: Router,
              protected labelService: LabelService) {
    this.btnList = [
      { label: this.labelService.getLabel(LabelKey.SIDE_MENU_EVENT), path: 'event', isActive: false },
      { label: this.labelService.getLabel(LabelKey.SIDE_MENU_TEMPLE), path: 'temple', isActive: false },
      { label: this.labelService.getLabel(LabelKey.SIDE_MENU_MANDAL), path: 'mandal', isActive: false },
      { label: this.labelService.getLabel(LabelKey.SIDE_MENU_FACILITY), path: 'facility', isActive: false },
      { label: this.labelService.getLabel(LabelKey.SIDE_MENU_HISTORY), path: 'history', isActive: false },
      { label: this.labelService.getLabel(LabelKey.SIDE_MENU_ABOUT_US), path: 'about-us', isActive: false },
      { label: this.labelService.getLabel(LabelKey.SIDE_MENU_CONTACT_US), path: 'contact-us', isActive: false },
    ];
    this.setActiveState();
  }

  async onClick(btn: { label: string; path: string; isActive: boolean }) {
    await this.router.navigate([btn.path]);
    this.setActiveState();
  }

  setActiveState() {
    const url = this.router.url.substring(1, this.router.url.length);
    for (const s of this.btnList) {
      s.isActive = (url.includes(s.path));
    }
  }
}
