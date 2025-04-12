import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MangeNewsComponent } from './mange-news.component';

describe('MangeNewsComponent', () => {
  let component: MangeNewsComponent;
  let fixture: ComponentFixture<MangeNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MangeNewsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MangeNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
