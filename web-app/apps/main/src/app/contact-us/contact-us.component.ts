import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService, LabelService } from '@core-lib';
import { convertAddress, IInquiry, IMandalDetail, LabelKey } from '@vsd-common/lib';
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
  pageTitle!: string | undefined;
  labelKeys = LabelKey;

  formGroup = new FormGroup({
    name: new FormControl('Mahendra', [Validators.required]),
    emailId: new FormControl('mahendra@gmail.com', [Validators.required, Validators.email]),
    contactNumber: new FormControl('8097421877', [Validators.required]),
    message: new FormControl('hi testing data', [Validators.required, Validators.maxLength(500)]),
  });

  primaryMandal!: IMandalDetail;

  @ViewChild(GoogleMap) map!: GoogleMap;

  constructor(public labelService: LabelService,
              private mandalService: MandalService,
              private title: Title,
              private httpService: HttpService,
              private metaService: Meta) {
    this.pageTitle = this.labelService.labels.get(LabelKey.SIDE_MENU_CONTACT_US);
    if (this.pageTitle) {
      this.title.setTitle(this.pageTitle);
    }
  }

  async ngOnInit() {
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

  async submitForm() {
    ValidationUtil.validateAllFormFields(this.formGroup);
    if (!this.formGroup.valid) {
      return;
    }
    await this.httpService.postRequest(CONTACT_US, <IInquiry>this.formGroup.value);
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
