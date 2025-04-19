import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IAddressMaster, ICommonSEO, IFaqCategory, IManageFaq, InputLength, IOption, LabelKey } from '@vsd-common/lib';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FaqService } from '../faq.service';
import { Title } from '@angular/platform-browser';
import { LabelService, NavigationService, SnackBarService, TOOLBAR } from '@vsd-frontend/core-lib';
import { ValidationUtil } from '@vsd-frontend/shared-ui-lib';
import { Editor, toDoc, toHTML, Toolbar } from 'ngx-editor';
import { FaqCategoryService } from '@vsd-frontend/lovs-lib';

@Component({
  selector: 'faq-lib-manage-faq',
  standalone: false,
  templateUrl: './manage-faq.component.html',
  styleUrl: './manage-faq.component.scss',
})
export class ManageFaqComponent implements OnInit, OnDestroy {
  inputLength = InputLength;
  labelKeys = LabelKey;
  @Input() id!: number;
  pageTitle!: string;
  addressMaster!: IAddressMaster;
  faq!: IManageFaq;
  seoData!: ICommonSEO;
  category: IOption[] = [];
  toolbar: Toolbar = TOOLBAR;
  editor!: Editor;
  faqCategories!: IFaqCategory[];

  formGroup: FormGroup = new FormGroup({
    faq: new FormControl(null, [Validators.required, Validators.maxLength(InputLength.CHAR_500)]),
    answer: new FormControl(null),
    faqCategoryId: new FormControl(null, [Validators.required]),
  });

  constructor(
    private service: FaqService,
    private faqCategoryService: FaqCategoryService,
    public labelService: LabelService,
    private title: Title,
    private snackBarService: SnackBarService,
    private navigation: NavigationService,
  ) {
    this.pageTitle = this.labelService.getLabel(this.id ? this.labelKeys.EDIT_FAQ : this.labelKeys.ADD_FAQ);
    this.title.setTitle(this.pageTitle);
  }

  async ngOnInit() {
    this.editor = new Editor({
      content: '',
      history: true,
      keyboardShortcuts: true,
      inputRules: true,
    });
    this.faqCategories = await this.faqCategoryService.loadAll();
    await this.loadDetail();
  }

  async loadDetail() {
    if (!this.id) {
      return;
    }
    this.faq = await this.service.loadDetails(this.id);
    this.bindData();
  }

  bindData() {
    if (!this.faq) {
      return;
    }
    this.formGroup.patchValue({
      faq: this.faq.faq,
      faqCategoryId: this.faq.faqCategoryId,
      answer: toDoc(this.faq.answer),
    });
  }

  onCancel() {
    this.navigation.back();
  }

  async updateDetails() {
    ValidationUtil.validateAllFormFields(this.formGroup);
    if (!this.formGroup.valid) {
      return;
    }
    const payload: IManageFaq = {
      faq: this.formGroup.value.faq,
      faqCategoryId: this.formGroup.value.faqCategoryId,
      answer: toHTML(this.formGroup.value.answer),
    };
    if (this.id) {
      payload.faqId = Number(this.id);
    }
    try {
      await this.service.manageFaq(payload);
      this.snackBarService.showSuccess(
        this.labelService.getLabel(this.id ? this.labelKeys.SUCCESS_DATA_UPDATED : this.labelKeys.SUCCESS_DATA_ADDED),
      );
      this.onCancel();
    } catch (e) {
      this.snackBarService.showError(this.labelService.getLabel(this.labelKeys.ERROR_SOMETHING_WENT_WRONG));
    }
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
