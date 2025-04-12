import { Toolbar } from 'ngx-editor';

export const CH_PK = 'kjadhk asklad alsd';
export const CH_IV_K = 'kjadhk asklad alsd';
export const MASTER_PAGE_SIZE = 25;
export const PAGE_SIZE_LIST = [25, 50, 75, 100];

export const DEFAULT_DATE_FORMAT = 'DD-MMM-YYYY';
export const DEFAULT_DATE_TIME_FORMAT = 'DD-MMM-YYYY hh:mm A';
export const DEFAULT_TIME_FORMAT = 'hh:mm:ss';
export const DISPLAY_TIME_FORMAT = 'hh:mm A';

export const TOOLBAR: Toolbar = [
  ['bold', 'italic'],
  ['underline', 'strike'],
  ['code', 'blockquote'],
  ['ordered_list', 'bullet_list'],
  [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
  ['link'],
  ['text_color', 'background_color'],
  ['align_left', 'align_center', 'align_right', 'align_justify'],
  ['horizontal_rule', 'format_clear', 'indent', 'outdent'],
  ['undo', 'redo'],
];

export const ngxEditor = {
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
};
