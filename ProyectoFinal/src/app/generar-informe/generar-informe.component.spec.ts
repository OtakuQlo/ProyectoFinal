import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarInformeComponent } from './generar-informe.component';

describe('GenerarInformeComponent', () => {
  let component: GenerarInformeComponent;
  let fixture: ComponentFixture<GenerarInformeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerarInformeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenerarInformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
