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
