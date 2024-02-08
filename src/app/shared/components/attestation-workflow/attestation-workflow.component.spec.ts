import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttestationWorkflowComponent } from './attestation-workflow.component';

describe('AttestationWorkflowComponent', () => {
  let component: AttestationWorkflowComponent;
  let fixture: ComponentFixture<AttestationWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttestationWorkflowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttestationWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
