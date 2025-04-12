import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MangeLovComponent } from './mange-lov.component';

describe('MangeLovComponent', () => {
  let component: MangeLovComponent;
  let fixture: ComponentFixture<MangeLovComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MangeLovComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MangeLovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
