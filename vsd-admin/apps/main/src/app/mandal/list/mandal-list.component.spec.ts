import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MandalListComponent } from './mandal-list.component';

describe('MandalListComponent', () => {
  let component: MandalListComponent;
  let fixture: ComponentFixture<MandalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MandalListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MandalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
