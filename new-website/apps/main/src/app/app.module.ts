import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideRouter, RouterModule, withComponentInputBinding } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { CoreLibModule } from '@core-lib';
import { HomeComponent } from './home/home.component';
import { HindiDemoComponent } from './home/hindi-demo.component';
import { HeaderComponent } from './components/header/header.component';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedUiLibModule } from '@shared-ui-lib';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HindiDemoComponent,
    HeaderComponent,
    ThemeToggleComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    CommonModule,
    CoreLibModule,
    SharedUiLibModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
  ],
  providers: [
    provideRouter(appRoutes, withComponentInputBinding()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

