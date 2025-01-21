import { Component } from '@angular/core';

@Component({
  selector: 'vsd-web-app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  templeTitle = 'मंदिर';
  eventTitle = 'आगामी कार्यक्रम';
  aboutUsTitle = 'हमारे बारे में';
  trusteeTitle = 'हमारे ट्रस्टी';
}
