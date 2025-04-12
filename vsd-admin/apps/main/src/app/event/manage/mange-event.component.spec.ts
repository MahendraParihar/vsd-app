import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MangeEventComponent } from './mange-event.component';

describe('MangeEventComponent', () => {
  let component: MangeEventComponent;
  let fixture: ComponentFixture<MangeEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MangeEventComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MangeEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
