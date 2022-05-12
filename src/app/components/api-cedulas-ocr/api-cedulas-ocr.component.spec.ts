import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiCedulasOcrComponent } from './api-cedulas-ocr.component';

describe('ApiCedulasOcrComponent', () => {
  let component: ApiCedulasOcrComponent;
  let fixture: ComponentFixture<ApiCedulasOcrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiCedulasOcrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiCedulasOcrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
