import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MandalService } from '../mandal.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'lib-manage-mandal',
  templateUrl: './manage-mandal.component.html',
  styleUrl: './manage-mandal.component.scss',
})
export class ManageMandalComponent implements OnInit {

  mandalId!: number;

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(150)]),
  });

  constructor(private activatedRoute: ActivatedRoute, private mandalService: MandalService) {
    console.log(this.activatedRoute.snapshot);
    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this.mandalId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    }
  }

  async ngOnInit() {
    await this.loadDetail();
  }

  async loadDetail() {
    if (!this.mandalId) {
      return;
    }
    await this.mandalService.loadDetails(this.mandalId);
  }

  async updateDetails() {

  }
}
