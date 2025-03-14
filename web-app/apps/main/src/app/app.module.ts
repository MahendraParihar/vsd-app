import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideRouter, RouterModule, withComponentInputBinding } from '@angular/router';
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
import { FacilityComponent } from './facility/facility.component';
import { FacilityDetailComponent } from './facility/details/facility-detail.component';
import { TempleComponent } from './temple/temple.component';
import { TempleDetailComponent } from './temple/details/temple-detail.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedUiLibModule } from '@shared-ui-lib';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FacilityService } from './facility/services/facility.service';
import { CommonService } from './common.service';
import { EventService } from './event/services/event.service';
import { TempleService } from './temple/services/temple.service';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { EventCardComponent } from './event/event-card/event-card.component';
import { TempleCardComponent } from './temple/temple-card/temple-card.component';
import { MandalComponent } from './mandal/mandal.component';
import { MandalDetailComponent } from './mandal/details/mandal-detail.component';
import { MandalService } from './mandal/services/mandal.service';
import { FacilityCardComponent } from './facility/facility-card/facility-card.component';
import { MatChip, MatChipSet } from '@angular/material/chips';

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
    FacilityComponent,
    FacilityDetailComponent,
    TempleComponent,
    TempleDetailComponent,
    EventCardComponent,
    TempleCardComponent,
    FacilityCardComponent
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
    MatCardModule,
    MatGridListModule,
    MatChipSet,
    MatChip,
  ],
  providers: [
    FacilityService,
    CommonService,
    EventService,
    MandalService,
    TempleService,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline', subscriptSizing: 'dynamic' },
    },
    provideRouter(appRoutes, withComponentInputBinding()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
