import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionPerfilesComponent } from './seccion-perfiles.component';

describe('SeccionPerfilesComponent', () => {
  let component: SeccionPerfilesComponent;
  let fixture: ComponentFixture<SeccionPerfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeccionPerfilesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeccionPerfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
