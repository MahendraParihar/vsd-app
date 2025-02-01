import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FamilyService, SnackBarService } from '@vsd-frontend/core-lib';
import { find } from 'lodash';
import { debounceTime, switchMap, tap } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'vsd-ui-family-select',
  templateUrl: './ui-family-select.component.html',
  styleUrl: './ui-family-select.component.scss',
})
export class UiFamilySelectComponent implements OnInit {
  searchCtrl = new FormControl();
  isLoading = false;
  errorMsg!: string;
  filteredList!: { id: number; title: string, subTitle: string }[];
  selectedItemList: { id: number; title: string, subTitle: string }[] = [];

  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  masterList!: { id: number; title: string, subTitle: string }[];

  @Input()
  isMultiSelection = false;

  @Input()
  label!: string;

  @Input()
  isRequired = true;

  @Output() userChangeEvent = new EventEmitter<any>();

  @Input()
  selectedIds: number[] = [];

  @ViewChild('auto', { static: false }) matAutocomplete!: MatAutocomplete;
  @ViewChild('searchInput', { static: false }) searchInput!: ElementRef<HTMLInputElement>;

  constructor(private snackbarService: SnackBarService,
              private familyService: FamilyService) {
  }

  ngOnInit(): void {
    for (const s of this.selectedIds) {
      const f = find(this.masterList, { id: s });
      if (f) {
        this.selectedItemList.push(f);
      }
    }
    this.searchCtrl.valueChanges.pipe(
      debounceTime(500),
      tap(() => {
          this.errorMsg = '';
          this.filteredList = [];
          this.isLoading = true;
        },
      ),
      switchMap(async (value: string) => await this.getFilteredList(value)),
    ).subscribe(data => {
      this.filteredList = data;
    });
    if (this.selectedItemList && this.selectedItemList.length > 0) {
      this.emitEvent();
    }
  }

  async getFilteredList(searchStr: string): Promise<{ id: number; title: string, subTitle: string }[]> {
    let ddList: { id: number; title: string, subTitle: string }[] = [];
    try {
      if (!searchStr) {
        this.errorMsg = 'empty search text';
        this.isLoading = false;
        return ddList;
      }
      if (searchStr && searchStr.length < 1) {
        this.errorMsg = 'search text should be min 1 char.';
        this.isLoading = false;
        return ddList;
      }
      ddList = (await this.familyService.searchFamilies([],searchStr)).map((f)=>{
        return {
          id:f.familyId,
          title: `${f.firstName} ${f.middleName} ${f.lastName}`,
          subTitle: `${f.address && f.address.cityVillage ? f.address.cityVillage : ''}`
        }
      });
      this.isLoading = false;
      if (ddList.length === 0) {
        this.errorMsg = 'No member found';
      }
    } catch (e) {
      this.isLoading = false;
    }
    return ddList;
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (event.option.value) {
      const findObj = find(this.selectedItemList, { id: event.option.value.id });
      if (!findObj) {
        this.selectedItemList.push(event.option.value);
        this.emitEvent();
        this.searchInput.nativeElement.value = '';
        this.searchCtrl.setValue(null);
      }
    }
  }

  add(event: MatChipInputEvent): void {
    if (!this.isMultiSelection && this.selectedItemList && this.selectedItemList.length > 1) {
      this.snackbarService.showWarning('Only one item allow to select');
      return;
    }
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value: any = event.value;
      if (value) {
        const findObj = find(this.selectedItemList, { id: value.id });
        if (!findObj) {
          this.selectedItemList.push(value);
          this.emitEvent();
        }
        // Reset the input value
        if (input) {
          input.value = '';
        }
        this.searchCtrl.setValue(null);
      }
    }
  }

  remove(index: number): void {
    if (index >= 0) {
      this.selectedItemList.splice(index, 1);
      this.emitEvent();
    }
  }

  private emitEvent(): void {
    this.userChangeEvent.emit(this.selectedItemList);
  }
}
