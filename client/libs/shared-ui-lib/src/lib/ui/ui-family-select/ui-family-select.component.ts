import { Component, computed, ElementRef, EventEmitter, Input, OnInit, Output, signal, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FamilyService, LabelService, LoadingStage, SnackBarService } from '@vsd-frontend/core-lib';
import { find } from 'lodash';
import { debounceTime, tap } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';
import { IFamilyList, LabelKey } from '@vsd-common/lib';

@Component({
  selector: 'vsd-ui-family-select',
  templateUrl: './ui-family-select.component.html',
  styleUrl: './ui-family-select.component.scss',
})
export class UiFamilySelectComponent implements OnInit {
  searchCtrl = new FormControl();
  filteredList!: { id: number; title: string, subTitle: string }[];
  selectedItemList: { id: number; title: string, subTitle: string }[] = [];
  protected readonly LabelKey = LabelKey;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  protected readonly LoadingStages = LoadingStage;
  loadingStage = signal(LoadingStage.LOADED);
  checkLoadStage = computed(() => {
    return this.loadingStage();
  });

  @Input()
  masterList: { id: number; title: string, subTitle: string }[] = [];

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
              protected labelService: LabelService,
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
          this.filteredList = [];
        },
      ),
    ).subscribe(async (value) => {
      if (typeof value !== 'string') {
        this.filteredList = [];
      } else {
        this.filteredList = await this.getFilteredList(value);
      }
    });
    if (this.selectedItemList && this.selectedItemList.length > 0) {
      this.emitEvent();
    }
  }

  async getFilteredList(searchStr: string): Promise<{ id: number; title: string, subTitle: string }[]> {
    this.loadingStage.set(this.LoadingStages.LOADING);
    let ddList: { id: number; title: string, subTitle: string }[] = [];
    try {
      if (!searchStr) {
        this.loadingStage.set(this.LoadingStages.EMPTY_SET);
        return ddList;
      }
      if (searchStr && searchStr.length < 1) {
        this.loadingStage.set(this.LoadingStages.EMPTY_SET);
        return ddList;
      }
      const tempFamily = await this.familyService.searchFamilies([], searchStr);
      ddList = tempFamily.map((f: IFamilyList) => {
        return {
          id: f.familyId,
          title: `${f.firstName} ${f.middleName} ${f.lastName}`,
          subTitle: `${f.address && f.address.cityVillage ? f.address.cityVillage : ''}`,
        };
      });
      if (ddList.length === 0) {
        this.loadingStage.set(this.LoadingStages.EMPTY_SET);
      } else {
        this.loadingStage.set(this.LoadingStages.LOADED);
      }
    } catch (e) {
      this.loadingStage.set(this.LoadingStages.LOADED);
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
