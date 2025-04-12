import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MangeTempleComponent } from './mange-temple.component';

describe('MangeTempleComponent', () => {
  let component: MangeTempleComponent;
  let fixture: ComponentFixture<MangeTempleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MangeTempleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MangeTempleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
