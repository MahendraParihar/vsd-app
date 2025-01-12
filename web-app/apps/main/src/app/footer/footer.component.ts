import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'vsd-web-app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
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
  infoContent!: string;

  btnList = [
    { label: 'आयोजन', path: 'event', isActive: false },
    { label: 'मंदिर सूची', path: 'temple', isActive: false },
    { label: 'मंडल सूची', path: 'mandal', isActive: false },
    { label: 'इतिहास', path: 'history', isActive: false },
    { label: 'संपर्क करें', path: 'contact-us', isActive: false },
    { label: 'हमारे बारे में', path: 'about-us', isActive: false },
  ];

  constructor(private router: Router) {
    this.setActiveState()
  }

  async onClick(btn: { label: string; path: string; isActive: boolean }) {
    await this.router.navigate([btn.path]);
    this.setActiveState();
  }

  setActiveState() {
    const url = this.router.url.substring(1, this.router.url.length);
    for (const s of this.btnList) {
      s.isActive = (url.includes(s.path));
    }
  }
}
