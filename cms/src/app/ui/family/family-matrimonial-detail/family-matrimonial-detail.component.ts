import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {StringResources} from "../../../enum/string-resources";

@Component({
  selector: 'app-family-matrimonial-detail',
  templateUrl: './family-matrimonial-detail.component.html',
  styleUrls: ['./family-matrimonial-detail.component.scss']
})
export class FamilyMatrimonialDetailComponent implements OnInit, AfterViewInit, OnDestroy {

  stringRes = StringResources;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }

}
