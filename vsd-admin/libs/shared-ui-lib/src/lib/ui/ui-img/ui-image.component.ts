import { Component, Input, OnInit } from '@angular/core';
import { IMediaUpload } from '@vsd-common/lib';

@Component({
  selector: 'shared-ui-lib-image',
  standalone: false,
  templateUrl: './ui-image.component.html',
  styleUrl: './ui-image.component.scss',
})
export class UiImageComponent implements OnInit {
  @Input()
  webUrl!: IMediaUpload[];

  @Input()
  isAvatar = true;

  @Input()
  alt!: string;

  @Input()
  mediaPath!: string;

  imageUrl!: string;

  ngOnInit(): void {
    if (this.webUrl) {
      if (Array.isArray(this.webUrl) && this.webUrl.length > 0) {
        this.imageUrl = this.webUrl[0].webUrl;
      } else {
        // custom img show
      }
    } else {
      // custom img show
    }
  }
}
