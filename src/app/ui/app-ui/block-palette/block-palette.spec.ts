import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockPalette } from './block-palette';

describe('BlockPalette', () => {
  let component: BlockPalette;
  let fixture: ComponentFixture<BlockPalette>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockPalette]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockPalette);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
