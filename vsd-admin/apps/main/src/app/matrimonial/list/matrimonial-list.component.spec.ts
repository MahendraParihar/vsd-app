import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatrimonialListComponent } from './matrimonial-list.component';

describe('MatrimonialListComponent', () => {
  let component: MatrimonialListComponent;
  let fixture: ComponentFixture<MatrimonialListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatrimonialListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MatrimonialListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
