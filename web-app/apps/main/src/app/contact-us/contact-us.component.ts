import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LabelService } from '@core-lib';
import { IMandalDetail, LabelKey } from '@vsd-common/lib';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { MandalService } from '../mandal/services/mandal.service';

@Component({
  selector: 'vsd-web-app-contact-us',
  standalone: false,
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
})
export class ContactUsComponent implements OnInit, AfterViewInit {
  labelKeys = LabelKey;

  mapOptions: google.maps.MapOptions = {
    center: { lat: 25.1264456, lng: 73.3134433 },
    zoom: 12,
    zoomControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
  };
  marker = {
    position: { lat: 25.1264456, lng: 73.3134433 },
  };

  formGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    emailId: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required, Validators.maxLength(500)]),
  });

  infoContent!: string;
  primaryMandal!: IMandalDetail;

  @ViewChild(GoogleMap) map!: GoogleMap;

  constructor(public labelService: LabelService,
              private mandalService: MandalService) {
  }

  async ngOnInit() {
    await this.loadPrimaryMandal();
  }

  ngAfterViewInit() {
  }

  public openInfoWindow(marker: MapMarker, infoWindow: MapInfoWindow) {
    infoWindow.open(marker);
  }

  async loadPrimaryMandal() {
    this.primaryMandal = await this.mandalService.loadPrimaryMandalDetails();
  }
}
