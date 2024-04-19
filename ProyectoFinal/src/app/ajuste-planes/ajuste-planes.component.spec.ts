import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjustePlanesComponent } from './ajuste-planes.component';

describe('AjustePlanesComponent', () => {
  let component: AjustePlanesComponent;
  let fixture: ComponentFixture<AjustePlanesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjustePlanesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjustePlanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
