import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayallComponent } from './payall.component';

describe('PayallComponent', () => {
  let component: PayallComponent;
  let fixture: ComponentFixture<PayallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
