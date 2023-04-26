import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudCursosComponent } from './crud-cursos.component';

describe('CrudCursosComponent', () => {
  let component: CrudCursosComponent;
  let fixture: ComponentFixture<CrudCursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudCursosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
