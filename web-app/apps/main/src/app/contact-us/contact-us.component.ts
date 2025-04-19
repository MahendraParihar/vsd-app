import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BannerService, HttpService, LabelService, SnackBarService } from '@core-lib';
import { convertAddress, IBannerList, IMandalDetail, LabelKey, MediaForEnum } from '@vsd-common/lib';
import { GoogleMap } from '@angular/google-maps';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { MandalService } from '../mandal/services/mandal.service';
import { CONTACT_US } from './contact-us.url';
import { ValidationUtil } from '@shared-ui-lib';

@Component({
  selector: 'vsd-web-app-contact-us',
  standalone: false,
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
})
export class ContactUsComponent implements OnInit, AfterViewInit {
  bannerService = inject(BannerService);
  banners: IBannerList[] = [];
  pageTitle!: string | undefined;
  labelKeys = LabelKey;

  formGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    emailId: new FormControl(null, [Validators.required, Validators.email]),
    contactNumber: new FormControl(null, [Validators.required]),
    message: new FormControl(null, [Validators.required, Validators.maxLength(500)]),
    recaptcha: new FormControl(null, Validators.required),
  });

  primaryMandal!: IMandalDetail;
  captchaKey: string = '6Le0mB0rAAAAAJU7t9fHTnMGjRtLl2Xiq743WTNd';

  @ViewChild(GoogleMap) map!: GoogleMap;

  constructor(public labelService: LabelService,
              private mandalService: MandalService,
              private title: Title,
              private httpService: HttpService,
              private metaService: Meta,
              private snackBarService: SnackBarService) {
    this.pageTitle = this.labelService.labels.get(LabelKey.SIDE_MENU_CONTACT_US);
    if (this.pageTitle) {
      this.title.setTitle(this.pageTitle);
    }
  }

  async ngOnInit() {
    this.banners = await this.bannerService.loadBanner(MediaForEnum.CONTACT_US);
    await this.loadPrimaryMandal();
  }

  ngAfterViewInit() {
  }

  async loadPrimaryMandal() {
    this.primaryMandal = await this.mandalService.loadPrimaryMandalDetails();
    this.bindSEOData();
  }

  get address() {
    if (this.primaryMandal)
      return convertAddress(this.primaryMandal.address);
    else return '';
  }

  resolved(captchaResponse: string | null) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  errored(error: never[]): void {
    console.warn(`reCAPTCHA error encountered`, error);
  }

  openLink(link: string) {
    window.open(link, '_blank');
  }

  async submitForm() {
    ValidationUtil.validateAllFormFields(this.formGroup);
    if (!this.formGroup.valid) {
      return;
    }
    await this.httpService.postRequest(CONTACT_US, this.formGroup.value);
    this.snackBarService.showSuccess(this.labelService.getLabel(LabelKey.SUCCESS_INQUIRY));
    this.formGroup.reset();
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
}
