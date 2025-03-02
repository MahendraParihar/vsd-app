import { Component, Input } from '@angular/core';
import { IAddressDetail } from '@vsd-common/lib';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'shared-ui-lib-uikit-google-map',
  templateUrl: './uikit-google-map.component.html',
  standalone: false,
  styleUrl: './uikit-google-map.component.scss',
})
export class UikitGoogleMapComponent {
  _address!: IAddressDetail;
  @Input() set address(address: IAddressDetail) {
    this._address = address;
  }

  mapOptions: google.maps.MapOptions = {
    center: { lat: 25.1264456, lng: 73.3134433 },
    zoom: 12,
    zoomControl: false,
    disableDoubleClickZoom: true,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
  };
  marker = {
    position: { lat: 25.1264456, lng: 73.3134433 },
  };
  infoContent!: string;

  public openInfoWindow(marker: MapMarker, infoWindow: MapInfoWindow) {
    infoWindow.open(marker);
  }
}
