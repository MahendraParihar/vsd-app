import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MangeBannerComponent } from './mange-banner.component';

describe('MangeBannerComponent', () => {
  let component: MangeBannerComponent;
  let fixture: ComponentFixture<MangeBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MangeBannerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MangeBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
