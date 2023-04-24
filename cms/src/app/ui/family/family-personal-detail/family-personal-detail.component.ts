import {AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {StringResources} from "../../../enum/string-resources";
import {FamilyContactNumberModel, FamilyProfileModel} from "../../../models/family.model";
import {ContactTypeEnum} from "../../../enum/contact-type-enum";
import {NavigationPathEnum} from "../../../enum/navigation-path-enum";
import {NavigationService} from "../../../service/navigation.service";

@Component({
  selector: 'app-family-personal-detail',
  templateUrl: './family-personal-detail.component.html',
  styleUrls: ['./family-personal-detail.component.scss']
})
export class FamilyPersonalDetailComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {

  @Input()
  familyProfile: FamilyProfileModel;

  stringRes = StringResources;

  constructor(private navigationService: NavigationService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  editFamily() {
    this.navigationService.navigateToById(NavigationPathEnum.FAMILY_EDIT_PERSONAL_DETAIL, this.familyProfile.familyId);
  }

}
