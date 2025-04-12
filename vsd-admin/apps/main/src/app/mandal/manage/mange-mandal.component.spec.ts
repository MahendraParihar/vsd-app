import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MangeMandalComponent } from './mange-mandal.component';

describe('MangeMandalComponent', () => {
  let component: MangeMandalComponent;
  let fixture: ComponentFixture<MangeMandalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MangeMandalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MangeMandalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
