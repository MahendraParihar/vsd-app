import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {StringResources} from "../../../../enum/string-resources";
import {Constants} from "../../../../constants/Constants";
import {CommonSearchModel} from "../../../../models/common-search.model";
import {StatusList} from "../../../../constants/status-list";

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {

  @Input()
  searchModel: CommonSearchModel;

  @Output()
  searchResultEvent = new EventEmitter<CommonSearchModel>();

  stringRes = StringResources;
  statusList = StatusList;

  searchFormGroup = this.fb.group({
    name: [null],
    active: [null],
    createdFrom: [null],
    createdTo: [null]
  });

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    if (this.searchModel) {
      /*this.searchFormGroup.patchValue({
        name: this.searchModel.name ? this.searchModel.name : '',
        active: this.searchModel.active ? this.searchModel.active : '',
        createdFrom: this.searchModel.createdFrom ? this.searchModel.createdFrom : null,
        createdTo: this.searchModel.createdTo ? this.searchModel.createdTo : null,
      });*/
    }
  }

  async clearSearchForm(): Promise<void> {
    this.searchFormGroup.reset();
    this.setFormDataToModel();
    this.searchResultEvent.emit(this.searchModel);
  }

  async searchResult(): Promise<void> {
    this.setFormDataToModel();
    this.searchResultEvent.emit(this.searchModel);
  }

  private setFormDataToModel(): void {
    const formValue = this.searchFormGroup.value;
    if (!this.searchModel){
      this.searchModel = new CommonSearchModel();
    }
    this.searchModel.name = formValue.name ? formValue.name : null;
    this.searchModel.active = formValue.active ? formValue.active : null;
    this.searchModel.createdFrom = formValue.createdFrom ? formValue.createdFrom : null;
    this.searchModel.createdTo = formValue.createdTo ? formValue.createdTo : null;
  }

}
