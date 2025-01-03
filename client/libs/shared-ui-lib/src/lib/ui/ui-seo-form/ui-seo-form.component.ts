import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICommonSEO, InputLength, LabelKey } from '@vsd-common/lib';
import { LabelService } from '@vsd-frontend/core-lib';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'vsd-ui-seo-form',
  templateUrl: './ui-seo-form.component.html',
  styleUrl: './ui-seo-form.component.scss',
})
export class UiSeoFormComponent implements OnInit {

  labelKeys = LabelKey;
  inputLength = InputLength;
  _seo!: ICommonSEO;
  tagsList: string[] = [];
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  @Input()
  formGroup!: FormGroup;

  @Input() set seo(tempSeo: ICommonSEO) {
    this._seo = tempSeo;
    this.bindSEO();
  }

  seoFormGroup: FormGroup = new FormGroup({
    tags: new FormControl(null, [Validators.required]),
    metaTitle: new FormControl(null, [Validators.required, Validators.maxLength(InputLength.MAX_META_TITLE)]),
    metaDescription: new FormControl(null, [Validators.required, Validators.maxLength(InputLength.MAX_META_DESCRIPTION)]),
    url: new FormControl(null, []),
  });

  constructor(public labelService: LabelService) {
  }

  ngOnInit() {
    this.formGroup.addControl('seo', this.seoFormGroup);
    this.bindSEO();
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our data
    if (value) {
      const index = this.tagsList.indexOf(value);
      if (index >= 0) {
        // Clear the input value
        event.chipInput!.clear();
        return;
      }
      this.tagsList.push(value);
    }
    // Clear the input value
    event.chipInput!.clear();
    this.seoFormGroup.patchValue({ tags: this.tagsList.join(',') });
  }

  remove(tag: string): void {
    const index = this.tagsList.indexOf(tag);
    if (index >= 0) {
      this.tagsList.splice(index, 1);
    }
    this.seoFormGroup.patchValue({ tags: this.tagsList.join(',') });
  }

  bindSEO() {
    if (!this._seo) {
      return;
    }
    this.seoFormGroup.patchValue({
      tags: this._seo.tags ? this._seo.tags.join(',') : '',
      metaTitle: this._seo.metaTitle,
      metaDescription: this._seo.metaDescription,
      url: this._seo.url,
    });
  }
}
