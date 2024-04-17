import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPerfilJefeComponent } from './crear-perfil-jefe.component';

describe('CrearPerfilJefeComponent', () => {
  let component: CrearPerfilJefeComponent;
  let fixture: ComponentFixture<CrearPerfilJefeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearPerfilJefeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearPerfilJefeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
