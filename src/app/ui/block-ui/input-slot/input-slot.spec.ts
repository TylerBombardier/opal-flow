import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSlot } from './input-slot';

describe('InputSlot', () => {
  let component: InputSlot;
  let fixture: ComponentFixture<InputSlot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputSlot]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputSlot);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
