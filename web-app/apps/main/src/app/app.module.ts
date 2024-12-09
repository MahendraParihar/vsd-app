import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { CoreLibModule } from '@core-lib';
import { HomeComponent } from './home/home.component';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import { FooterComponent } from './footer/footer.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { EventComponent } from './event/event.component';
import { EventDetailComponent } from './event/details/event-detail.component';
import { HistoryComponent } from './history/history.component';
import { MandalComponent } from './mandal/mandal.component';
import { MandalDetailComponent } from './mandal/details/mandal-detail.component';
import { TempleComponent } from './temple/temple.component';
import { TempleDetailComponent } from './temple/details/temple-detail.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedUiLibModule } from '@shared-ui-lib';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { GoogleMap, MapAdvancedMarker, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { MandalService } from './mandal/services/mandal.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BaseLayoutComponent,
    FooterComponent,
    AboutUsComponent,
    ContactUsComponent,
    EventComponent,
    EventDetailComponent,
    HistoryComponent,
    MandalComponent,
    MandalDetailComponent,
    TempleComponent,
    TempleDetailComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    CommonModule,
    SharedUiLibModule,
    CoreLibModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    MatInput,
    GoogleMap,
    MapAdvancedMarker,
    MapMarker,
    MapInfoWindow,
  ],
  providers: [
    MandalService,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline', subscriptSizing: 'dynamic' },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
