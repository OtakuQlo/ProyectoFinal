import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponderReporteComponent } from './responder-reporte.component';

describe('ResponderReporteComponent', () => {
  let component: ResponderReporteComponent;
  let fixture: ComponentFixture<ResponderReporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponderReporteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResponderReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
