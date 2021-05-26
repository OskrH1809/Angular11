import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextoEditorComponent } from './texto-editor.component';

describe('TextoEditorComponent', () => {
  let component: TextoEditorComponent;
  let fixture: ComponentFixture<TextoEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextoEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
