import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MangeMatrimonialComponent } from './mange-matrimonial.component';

describe('MangeMatrimonialComponent', () => {
  let component: MangeMatrimonialComponent;
  let fixture: ComponentFixture<MangeMatrimonialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MangeMatrimonialComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MangeMatrimonialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
