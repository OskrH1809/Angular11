import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadosSeComponent } from './listados-se.component';

describe('ListadosSeComponent', () => {
  let component: ListadosSeComponent;
  let fixture: ComponentFixture<ListadosSeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadosSeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadosSeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
