import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputSlot } from './output-slot';

describe('OutputSlot', () => {
  let component: OutputSlot;
  let fixture: ComponentFixture<OutputSlot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutputSlot]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutputSlot);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
