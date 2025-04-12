import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MangeFacilityComponent } from './mange-facility.component';

describe('MangeFacilityComponent', () => {
  let component: MangeFacilityComponent;
  let fixture: ComponentFixture<MangeFacilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MangeFacilityComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MangeFacilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
