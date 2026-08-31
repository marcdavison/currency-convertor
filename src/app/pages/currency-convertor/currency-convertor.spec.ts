import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyConvertor } from './currency-convertor';

describe('CurrencyConvertor', () => {
  let component: CurrencyConvertor;
  let fixture: ComponentFixture<CurrencyConvertor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencyConvertor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyConvertor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
