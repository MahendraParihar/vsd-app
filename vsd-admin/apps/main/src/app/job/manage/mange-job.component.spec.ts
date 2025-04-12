import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MangeJobComponent } from './mange-job.component';

describe('MangeJobComponent', () => {
  let component: MangeJobComponent;
  let fixture: ComponentFixture<MangeJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MangeJobComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MangeJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
