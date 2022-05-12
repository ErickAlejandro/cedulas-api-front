import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentacionApiComponent } from './documentacion-api.component';

describe('DocumentacionApiComponent', () => {
  let component: DocumentacionApiComponent;
  let fixture: ComponentFixture<DocumentacionApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentacionApiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentacionApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
