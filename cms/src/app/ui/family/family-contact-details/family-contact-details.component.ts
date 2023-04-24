import {AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ContactTypeEnum} from "../../../enum/contact-type-enum";
import {StringResources} from "../../../enum/string-resources";
import {FamilyContactNumberModel} from "../../../models/family.model";
import {AlertDialogDataInterface} from "../../../interfaces/alert-dialog-data.interface";
import {AlertTypeEnum} from "../../../enum/alert-type-enum";
import {DialogAlertComponent} from "../../common-ui/dialog-alert/dialog-alert.component";
import {MatDialog} from "@angular/material/dialog";
import {
  ManageContactDetailsDialogComponent
} from "../dialog/manage-contact-details-dialog/manage-contact-details-dialog.component";
import {ResponseDataModel} from "../../../models/response-data.model";
import {ApiUrlEnum} from "../../../enum/api-url-enum";
import {ServerResponseEnum} from "../../../enum/server-response-enum";
import {HttpService} from "../../../service/http.service";
import {SnackBarService} from "../../../service/snack-bar.service";
import {DropdownItem} from "../../../interfaces/dropdown-item";

@Component({
  selector: 'app-family-contact-details',
  templateUrl: './family-contact-details.component.html',
  styleUrls: ['./family-contact-details.component.scss']
})
export class FamilyContactDetailsComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {

  contactTypeEnum = ContactTypeEnum;

  stringRes = StringResources;

  @Input()
  familyId: number;

  @Input()
  familyContactNumberList: FamilyContactNumberModel[];

  constructor(private dialog: MatDialog,
              private httpService: HttpService,
              private snackBarService: SnackBarService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  async loadContactNumberTask(): Promise<void> {
    const res: ResponseDataModel = await this.httpService.getRequest(ApiUrlEnum.FAMILY_CONTACT_NUMBER, {id: this.familyId}, true);
    if (res) {
      switch (res.code) {
        case ServerResponseEnum.SUCCESS:
          const tempList:FamilyContactNumberModel[] = [];
          if (res.data && res.data.length > 0) {
            for (const s of res.data) {
              tempList.push(FamilyContactNumberModel.fromJson(s));
            }
          }
          this.familyContactNumberList = tempList;
          break;
        case ServerResponseEnum.WARNING:
          this.snackBarService.showWarning(res.message);
          break;
        case ServerResponseEnum.ERROR:
          this.snackBarService.showError(res.message);
          break;
      }
    }
  }

  manageContactDetail(contactNumberObj: FamilyContactNumberModel, isAdd: boolean = true, index: number = -1) {
    const dialogRef = this.dialog.open(ManageContactDetailsDialogComponent, {
      disableClose:true,
      width: '350px',
      data: {
        familyId: this.familyId,
        contactDetail: contactNumberObj,
        isAdd: isAdd
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', JSON.stringify(result));
      if (result) {
        this.loadContactNumberTask();
      }
    });
  }

  deleteContactNumber(contactNumberObj: FamilyContactNumberModel, index: number) {
    const dialogData: AlertDialogDataInterface = {
      title: StringResources.ALERT,
      message: StringResources.DELETE_CONTACT_NUMBER_DESC,
      positiveBtnTxt: StringResources.YES,
      negativeBtnTxt: StringResources.NO,
      alertType: AlertTypeEnum.WARNING
    };
    const dialogRef = this.dialog.open(DialogAlertComponent, {
      width: '450px',
      data: dialogData,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', JSON.stringify(result));
      if (result) {
        this.deleteContactNumberTask(contactNumberObj, index);
      }
    });
  }

  async deleteContactNumberTask(contactNumberObj: FamilyContactNumberModel, index: number): Promise<void> {
    const res: ResponseDataModel = await this.httpService.deleteRequest(ApiUrlEnum.FAMILY_CONTACT_NUMBER, contactNumberObj.id, true);
    if (res) {
      switch (res.code) {
        case ServerResponseEnum.SUCCESS:
          this.snackBarService.showSuccess(res.message);
          this.loadContactNumberTask();
          break;
        case ServerResponseEnum.WARNING:
          this.snackBarService.showWarning(res.message);
          break;
        case ServerResponseEnum.ERROR:
          this.snackBarService.showError(res.message);
          break;
      }
    }
  }
}
