import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamRenderer } from './param-renderer';

describe('ParamRenderer', () => {
  let component: ParamRenderer;
  let fixture: ComponentFixture<ParamRenderer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParamRenderer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParamRenderer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
