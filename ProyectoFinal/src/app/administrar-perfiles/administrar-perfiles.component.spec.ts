import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarPerfilesComponent } from './administrar-perfiles.component';

describe('AdministrarPerfilesComponent', () => {
  let component: AdministrarPerfilesComponent;
  let fixture: ComponentFixture<AdministrarPerfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministrarPerfilesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdministrarPerfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
