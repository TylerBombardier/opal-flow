import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Wire } from './wire';

describe('Wire', () => {
  let component: Wire;
  let fixture: ComponentFixture<Wire>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Wire]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Wire);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
