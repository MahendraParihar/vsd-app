import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FamilyDetailComponent } from './family-detail/family-detail.component';
import { FamilyComponent } from './family/family.component';
import { ManageFamilyComponent } from './manage-family/manage-family.component';
import { CoreLibModule } from '@vsd-frontend/core-lib';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { FamilyService } from './family.service';
import { MatDividerModule } from '@angular/material/divider';
import { NgxEditorModule } from 'ngx-editor';
import { DateAdapter, MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS } from '@vsd-common/lib';
import { SharedUiLibModule } from '@vsd-frontend/shared-ui-lib';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [CommonModule,
    CoreLibModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
    SharedUiLibModule,
    MatCardModule,
    NgxEditorModule.forRoot({
      locals: {
        // menu
        bold: 'Bold',
        italic: 'Italic',
        code: 'Code',
        underline: 'Underline',
        strike: 'Strike',
        blockquote: 'Blockquote',
        bullet_list: 'Bullet List',
        ordered_list: 'Ordered List',
        heading: 'Heading',
        h1: 'Header 1',
        h2: 'Header 2',
        h3: 'Header 3',
        h4: 'Header 4',
        h5: 'Header 5',
        h6: 'Header 6',
        align_left: 'Left Align',
        align_center: 'Center Align',
        align_right: 'Right Align',
        align_justify: 'Justify',
        text_color: 'Text Color',
        background_color: 'Background Color',
        horizontal_rule: 'Horizontal rule',
        format_clear: 'Clear Formatting',
        insertLink: 'Insert Link',
        removeLink: 'Remove Link',
        insertImage: 'Insert Image',
        indent: 'Increase Indent',
        outdent: 'Decrease Indent',
        superscript: 'Superscript',
        subscript: 'Subscript',
        undo: 'Undo',
        redo: 'Redo',

        // pupups, forms, others...
        url: 'URL',
        text: 'Text',
        openInNewTab: 'Open in new tab',
        insert: 'Insert',
        altText: 'Alt Text',
        title: 'Title',
        remove: 'Remove',
        enterValidUrl: 'Please enter a valid URL',
      },
    }),
    MatNativeDateModule,
    MatDatepickerModule,
    MatDividerModule],
  declarations: [FamilyDetailComponent, FamilyComponent, ManageFamilyComponent],
  exports: [FamilyDetailComponent, FamilyComponent, ManageFamilyComponent],
  providers: [
    FamilyService,
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: DateAdapter, useValue: MomentDateAdapter },
  ],
})
export class FamilyLibModule {}
