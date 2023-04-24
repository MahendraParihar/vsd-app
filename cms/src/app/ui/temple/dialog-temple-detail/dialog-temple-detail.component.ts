import {Component, Inject, OnInit} from '@angular/core';
import {TempleModel} from "../../../models/temple.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-temple-detail',
  templateUrl: './dialog-temple-detail.component.html',
  styleUrls: ['./dialog-temple-detail.component.scss']
})
export class DialogTempleDetailComponent implements OnInit {

  templeObj: TempleModel;

  constructor(public dialogRef: MatDialogRef<DialogTempleDetailComponent>,
              @Inject(MAT_DIALOG_DATA) public data: TempleModel) {
    this.templeObj = data;
  }

  ngOnInit(): void {
  }

  onPositiveClick(): void {
    this.closeDialog(true);
  }

  onNegativeClick(): void {
    this.closeDialog(false);
  }

  closeDialog(flag: boolean) {
    this.dialogRef.close(flag);
  }

}
