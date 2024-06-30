import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageEducationDegreeComponent } from './manage-education-degree.component';

describe('ManageEducationDegreeComponent', () => {
  let component: ManageEducationDegreeComponent;
  let fixture: ComponentFixture<ManageEducationDegreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageEducationDegreeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageEducationDegreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
