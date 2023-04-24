import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {StringResources} from "../../../enum/string-resources";

@Component({
  selector: 'app-family-professional-detail',
  templateUrl: './family-professional-detail.component.html',
  styleUrls: ['./family-professional-detail.component.scss']
})
export class FamilyProfessionalDetailComponent implements OnInit, AfterViewInit, OnDestroy {

  stringRes = StringResources;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }

}
