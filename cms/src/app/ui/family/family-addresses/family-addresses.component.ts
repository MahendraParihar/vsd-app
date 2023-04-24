import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {StringResources} from "../../../enum/string-resources";

@Component({
  selector: 'app-family-addresses',
  templateUrl: './family-addresses.component.html',
  styleUrls: ['./family-addresses.component.scss']
})
export class FamilyAddressesComponent implements OnInit, AfterViewInit, OnDestroy {

  stringRes = StringResources;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }

}
