import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: false
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  footerLinks = {
    quickLinks: [
      { label: 'Home', route: '/' },
      { label: 'Events', route: '/events' },
      { label: 'Mandals', route: '/mandals' },
      { label: 'Temples', route: '/temples' }
    ],
    resources: [
      { label: 'About Us', route: '/about' },
      { label: 'Contact', route: '/contact' },
      { label: 'Privacy Policy', route: '/privacy' },
      { label: 'Terms of Service', route: '/terms' }
    ]
  };

  socialLinks = [
    { icon: 'facebook', url: 'https://facebook.com', label: 'Facebook' },
    { icon: 'twitter', url: 'https://twitter.com', label: 'Twitter' },
    { icon: 'instagram', url: 'https://instagram.com', label: 'Instagram' },
    { icon: 'youtube', url: 'https://youtube.com', label: 'YouTube' }
  ];

  onSocialClick(url: string): void {
    window.open(url, '_blank');
  }
}

