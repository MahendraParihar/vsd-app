import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LabelService } from '@core-lib';
import { IMandalDetail, LabelKey } from '@vsd-common/lib';
import { Meta, MetaDefinition } from '@angular/platform-browser';
import { MandalService } from '../mandal/services/mandal.service';

@Component({
  selector: 'vsd-web-app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit {
  protected readonly LabelKey = LabelKey;
  btnList: { label: string, path: string, isActive: boolean }[] = [];
  primaryMandal!: IMandalDetail;

  constructor(private router: Router,
              protected labelService: LabelService,
              private mandalService: MandalService,
              private metaService: Meta) {
    this.btnList = [
      { label: this.labelService.getLabel(LabelKey.SIDE_MENU_EVENT), path: 'event', isActive: false },
      { label: this.labelService.getLabel(LabelKey.SIDE_MENU_TEMPLE), path: 'temple', isActive: false },
      { label: this.labelService.getLabel(LabelKey.SIDE_MENU_MANDAL), path: 'mandal', isActive: false },
      { label: this.labelService.getLabel(LabelKey.SIDE_MENU_FACILITY), path: 'facility', isActive: false },
      { label: this.labelService.getLabel(LabelKey.SIDE_MENU_HISTORY), path: 'history', isActive: false },
      { label: this.labelService.getLabel(LabelKey.SIDE_MENU_ABOUT_US), path: 'about-us', isActive: false },
      { label: this.labelService.getLabel(LabelKey.SIDE_MENU_CONTACT_US), path: 'contact-us', isActive: false },
    ];
    this.router.events.subscribe((params) => {
      if (params instanceof NavigationEnd) {
        this.setActiveState();
      }
    });
  }

  async ngOnInit() {
    await this.loadPrimaryMandal();
  }

  async loadPrimaryMandal() {
    this.primaryMandal = await this.mandalService.loadPrimaryMandalDetails();
    this.bindSEOData();
  }

  bindSEOData() {
    if (!this.primaryMandal) {
      return;
    }
    const seoArray: MetaDefinition[] = [];
    if (this.primaryMandal.tags) {
      seoArray.push({ name: 'keyword', content: this.primaryMandal.tags.join(',') });
    }
    if (this.primaryMandal.metaDescription) {
      seoArray.push({ name: 'description', content: this.primaryMandal.metaDescription });
    }
    this.metaService.addTags(seoArray);
  }

  openLink(link: string) {
    window.open(link, '_blank');
  }

  async onClick(btn: { label: string; path: string; isActive: boolean }) {
    await this.router.navigate([btn.path]);
    this.setActiveState();
  }

  setActiveState() {
    const url = this.router.url.substring(1, this.router.url.length).split('/');
    for (let s of this.btnList) {
      s.isActive = s.path.split('/').includes(url[0]);
    }
  }
}
