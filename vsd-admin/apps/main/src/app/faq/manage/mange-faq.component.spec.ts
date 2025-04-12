import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MangeFaqComponent } from './mange-faq.component';

describe('MangeFaqComponent', () => {
  let component: MangeFaqComponent;
  let fixture: ComponentFixture<MangeFaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MangeFaqComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MangeFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
