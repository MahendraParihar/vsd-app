import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EventModel} from "../../../models/event.model";
import {StringResources} from "../../../enum/string-resources";

@Component({
  selector: 'app-dialog-event-detail',
  templateUrl: './dialog-event-detail.component.html',
  styleUrls: ['./dialog-event-detail.component.scss']
})
export class DialogEventDetailComponent implements OnInit {

  eventObj: EventModel;
  strResource= StringResources;

  constructor(public dialogRef: MatDialogRef<DialogEventDetailComponent>,
              @Inject(MAT_DIALOG_DATA) public data: EventModel) {
    this.eventObj = data;
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
