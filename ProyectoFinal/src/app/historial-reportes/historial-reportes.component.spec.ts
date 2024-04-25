import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialReportesComponent } from './historial-reportes.component';

describe('HistorialReportesComponent', () => {
  let component: HistorialReportesComponent;
  let fixture: ComponentFixture<HistorialReportesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialReportesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistorialReportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
