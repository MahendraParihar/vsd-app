import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ISocialLink, LabelKey } from '@vsd-common/lib';
import { LabelService } from '@vsd-frontend/core-lib';

@Component({
  selector: 'vsd-ui-social-link-form',
  templateUrl: './ui-social-link-form.component.html',
  styleUrl: './ui-social-link-form.component.scss',
})
export class UiSocialLinkFormComponent implements OnInit {

  labelKeys = LabelKey;
  _socialLinks!: ISocialLink[];

  @Input()
  formGroup!: FormGroup;

  @Input() set socialLinks(linkList: ISocialLink[]) {
    this._socialLinks = linkList;
    this.bindSocialLinks();
  }

  socialSiteLink = new FormArray([]);
  socialFormGroup = new FormGroup({
    socialSiteLink: this.socialSiteLink,
  });


  constructor(public labelService: LabelService) {
  }

  ngOnInit() {
    this.formGroup.addControl('socialSiteLink', this.socialFormGroup);
  }

  bindSocialLinks() {
    if (!this._socialLinks || this._socialLinks.length === 0) {
      return;
    }
    for (const s of this._socialLinks) {
      this.addSocialLink(s);
    }
  }

  socialLinkFormGroup(obj: ISocialLink | null): FormGroup {
    return new FormGroup({
      label: new FormControl(obj ? obj.label : null, [Validators.required]),
      link: new FormControl(obj ? obj.link : null, [Validators.required]),
      icon: new FormControl(obj ? obj.icon : null, [Validators.required]),
    });
  }

  get socialLinkFormArray() {
    return this.socialFormGroup.get('socialSiteLink') as FormArray;
  }

  addSocialLink(obj: ISocialLink | null) {
    this.socialLinkFormArray.push(this.socialLinkFormGroup(obj));
  }

  removeSocialLink(index: number) {
    this.socialLinkFormArray.removeAt(index);
  }
}
