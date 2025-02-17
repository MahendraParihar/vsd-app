import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from '@vsd-frontend/core-lib';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[vsdUIImageDrag]',
  standalone: false,
})
export class ImageDragDirective {
  @Output() files: EventEmitter<FileHandle[]> = new EventEmitter();
  @HostBinding('style.background') public background = '#eee';

  constructor(private sanitizer: DomSanitizer) {
  }

  @HostListener('dragover', ['$event'])
  public onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#999';
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee';
  }

  @HostListener('drop', ['$event'])
  public onDrop(evt: DragEvent) {
    if (!evt || !evt.dataTransfer) {
      return;
    }
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee';
    const files: FileHandle[] = [];
    for (let i = 0; i < evt.dataTransfer.files.length; i++) {
      const file = evt.dataTransfer.files[i];
      const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
      files.push({
        file,
        url,
        progress: 0,
        isRequested: false,
        fileUpdateStatus: 0,
        isPastFile: false,
      });
    }
    if (files.length > 0) {
      this.files.emit(files);
    }
  }
}
