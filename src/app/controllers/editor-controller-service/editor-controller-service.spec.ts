import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorControllerService } from './editor-controller-service';

describe('EditorControllerService', () => {
  let component: EditorControllerService;
  let fixture: ComponentFixture<EditorControllerService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorControllerService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorControllerService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
