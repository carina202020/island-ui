import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductmodalComponent } from './productmodal.component';

describe('ProductmodalComponent', () => {
  let component: ProductmodalComponent;
  let fixture: ComponentFixture<ProductmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductmodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
