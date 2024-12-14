import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MandalService } from '../mandal.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LabelService } from '@vsd-frontend/core-lib';
import { LabelKey } from '@vsd-common/lib';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'lib-manage-mandal',
  templateUrl: './manage-mandal.component.html',
  styleUrl: './manage-mandal.component.scss',
})
export class ManageMandalComponent implements OnInit {

  labelKeys = LabelKey;
  id!: number;
  pageTitle!: string;

  formGroup: FormGroup = new FormGroup({
    mandalName: new FormControl('', [Validators.required, Validators.maxLength(150)]),
  });

  constructor(private activatedRoute: ActivatedRoute, private mandalService: MandalService,
              public labelService: LabelService, private title: Title) {
    console.log(this.activatedRoute.snapshot);
    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    }
    this.pageTitle = this.labelService.getLabel(this.id ? this.labelKeys.EDIT_MANDAL : this.labelKeys.ADD_MANDAL);
    this.title.setTitle(this.pageTitle);
  }

  async ngOnInit() {
    await this.loadDetail();
  }

  async loadDetail() {
    if (!this.id) {
      return;
    }
    await this.mandalService.loadDetails(this.id);
  }

  async updateDetails() {

  }
}
