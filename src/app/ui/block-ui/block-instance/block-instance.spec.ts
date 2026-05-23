import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockInstance } from './block-instance';

describe('BlockInstance', () => {
  let component: BlockInstance;
  let fixture: ComponentFixture<BlockInstance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockInstance]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockInstance);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
