import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MangePagesComponent } from './mange-pages.component';

describe('MangePagesComponent', () => {
  let component: MangePagesComponent;
  let fixture: ComponentFixture<MangePagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MangePagesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MangePagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
