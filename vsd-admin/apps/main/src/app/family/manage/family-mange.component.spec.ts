import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FamilyMangeComponent } from './family-mange.component';

describe('MangeFamilyComponent', () => {
  let component: FamilyMangeComponent;
  let fixture: ComponentFixture<FamilyMangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FamilyMangeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FamilyMangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
