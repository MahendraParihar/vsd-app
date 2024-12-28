import { ChangeDetectorRef, Component, Input, IterableDiffers, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  FormArray,
  FormGroup,
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { FileTypeEnum, IMediaUpload, LabelKey, MediaForEnum } from '@vsd-common/lib';
import { DomSanitizer } from '@angular/platform-browser';
import {
  AlertDialogDataInterface,
  AlertTypeEnum,
  ApiUrls,
  FileHandle,
  HttpService,
  LabelService,
  SnackBarService,
} from '@vsd-frontend/core-lib';
import { MatDialog } from '@angular/material/dialog';
import { UiAlertDialogComponent } from '../ui-alert-dialog/ui-alert-dialog.component';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'vsd-ui-upload-form',
  templateUrl: './ui-upload-form.component.html',
  styleUrl: './ui-upload-form.component.scss',
})
export class UiUploadFormComponent implements OnInit, OnChanges {
  labelKeys = LabelKey;

  @Input() formGroup!: UntypedFormGroup;
  @Input() isMultiFile = false;
  @Input() mediaFor!: MediaForEnum;
  @Input() mediaType: FileTypeEnum = FileTypeEnum.IMAGE;
  @Input() isRequired = true;
  @Input() uploadedMediaList: IMediaUpload[] = [];
  @Input() controlName!: string;
  @Input() labels!: Map<string, string>;

  fileUploadForm: UntypedFormArray = this.fb.array([]);
  mediaTypeEnum = FileTypeEnum;
  uploadedFiles: FileHandle[] = [];
  mediaPath = ApiUrls.MEDIA_PATH;

  constructor(private fb: UntypedFormBuilder,
              private sanitizer: DomSanitizer,
              private httpService: HttpService,
              private differs: IterableDiffers,
              private cdr: ChangeDetectorRef,
              private snackbarService: SnackBarService,
              private labelService: LabelService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.formGroup.addControl(this.controlName, this.fileUploadForm);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.uploadedMediaList && this.uploadedMediaList.length > 0) {
      for (const s of this.uploadedMediaList) {
        this.addFile(s);
        this.uploadedFiles.push(<FileHandle>{
          url: s.webUrl,
          name: s.originalName,
          size: s.size,
          progress: 100,
          fileUpdateStatus: 1,
          isRequested: true,
          isPastFile: true,
        });
      }
    }
  }

  fileArray(): FormArray {
    return this.formGroup.get(this.controlName) as FormArray;
  }

  newFile(f: IMediaUpload): FormGroup {
    return this.fb.group({
      fieldName: [f.fieldName, [Validators.required]],
      originalName: [f.originalName, [Validators.required]],
      encoding: [f.encoding, [Validators.required]],
      mimetype: [f.mimetype, [Validators.required]],
      fileName: [f.fileName, [Validators.required]],
      webUrl: [f.webUrl, [Validators.required]],
      size: [f.size, [Validators.required]],
    });
  }

  addFile(f: IMediaUpload) {
    this.fileArray().push(this.newFile(f));
  }

  removeFile(i: number) {
    this.fileArray().removeAt(i);
    this.cdr.detectChanges();
  }

  selectFile(event: any): void {
    const files: FileHandle[] = [];
    for (const f of event.target.files) {
      const file = f;
      const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
      files.push(<FileHandle>{
        file: file,
        url: url,
        progress: 0,
        isRequested: false,
        isPastFile: false,
      });
    }
    this.validateNAddFiles(files);
  }

  filesDropped(files: FileHandle[]): void {
    this.validateNAddFiles(files);
  }

  removeItem(index: number): void {
    this.uploadedFiles.splice(index, 1);
    this.removeFile(index);
    this.cdr.detectChanges();
  }

  getFileSize(size: number | undefined): string {
    if (!size) {
      return '';
    }
    if (size >= 1024) {
      size = size / 1024;
      if (size >= 1024) {
        size = size / 1024;
        if (size >= 1024) {
          return `${size.toFixed(2)} gb`;
        } else {
          return `${size.toFixed(2)} mb`;
        }
      } else {
        return `${size.toFixed(2)} kb`;
      }
    } else {
      return `${size} byte`;
    }
  }

  validateNAddFiles(files: FileHandle[]): void {
    if (!this.uploadedFiles) {
      this.uploadedFiles = [];
    }
    if (this.uploadedFiles.length === 1 && !this.isMultiFile) {
      this.showAlertDialog();
      return;
    }
    for (const f of files) {
      if (f.file && f.file.type.toString().includes(this.mediaType)) {
        this.uploadedFiles.push(f);
      }
      if (this.uploadedFiles.length === 1 && !this.isMultiFile) {
        break;
      }
    }
    this.validateNUploadFiles();
  }

  validateNUploadFiles(): void {
    for (const f of this.uploadedFiles) {
      if (f.isRequested || f.fileUpdateStatus === 1) {
        continue;
      }
      if (f.file) {
        f.isRequested = true;
        const formData: FormData = new FormData();
        formData.append('file', f.file);
        formData.append('mediaFor', this.mediaFor);
        formData.append('mediaType', this.mediaType);
        f.progress = 0;
        this.httpService.uploadMedia(ApiUrls.MEDIA_UPLOAD, formData).subscribe({
          next: (res: HttpResponse<any>) => {
            f.fileUpdateStatus = 1;
            f.progress = 100;
            const mediaResponse = <IMediaUpload>{
              fieldName: res.body.fileName,
              originalName: res.body.originalName,
              encoding: res.body.encoding,
              mimetype: res.body.mimetype,
              fileName: res.body.fileName,
              size: res.body.size,
              webUrl: res.body.webUrl,
            };
            this.addFile(mediaResponse);
          },
          error: (v) => {
            f.progress = 0;
            f.fileUpdateStatus = -1;
            this.snackbarService.showError(v);
          },
        });
      }
    }
  }

  showAlertDialog(): void {
    const dialogData: AlertDialogDataInterface = {
      title: this.labelService.getLabel(this.labelKeys.ALERT),
      message: this.labelService.getLabel(this.labelKeys.SINGLE_MEDIA_FILE_ALERT),
      positiveBtnTxt: this.labelService.getLabel(this.labelKeys.ACTION_OK),
      negativeBtnTxt: null,
      alertType: AlertTypeEnum.WARNING,
    };
    const dialogRef = this.dialog.open(UiAlertDialogComponent, {
      width: '350px',
      data: dialogData,
    });
    dialogRef.afterClosed().subscribe(result => {
      return;
    });
  }
}
