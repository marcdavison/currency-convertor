import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { CurrencyService } from './services/currency';
import { CurrencyConvertor } from './currency-convertor';

describe('CurrencyConvertor', () => {
  let component: CurrencyConvertor;
  let fixture: ComponentFixture<CurrencyConvertor>;
  const currencyServiceMock = {
    getAllCurrencies: vi.fn(),
    convertAmount: vi.fn()
  };

  beforeEach(async () => {
    currencyServiceMock.getAllCurrencies.mockReturnValue(
      of({
        GBP: 'GBP',
        USD: 'USD',
        EUR: 'EUR'
      })
    );

    currencyServiceMock.convertAmount.mockReturnValue(
      of({ value: 100 })
    );
    await TestBed.configureTestingModule({
      imports: [CurrencyConvertor],
      providers: [
        {
          provide: CurrencyService,
          useValue: currencyServiceMock
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyConvertor);
    component = fixture.componentInstance;
  });

  it('should load currencies on init', () => {
    fixture.detectChanges();

    expect(currencyServiceMock.getAllCurrencies)
      .toHaveBeenCalled();

    expect(component.currencies()).toEqual([
      'GBP',
      'USD',
      'EUR'
    ]);
  });

  describe('handleChange tests', () => {
    it('should update the FROM currency', () => {
      component.handleChange('from', 'GBP');
      expect(component.currencyModel().from).toBe('GBP');
    });

    it('should update the TO currency', () => {
      component.handleChange('to', 'USD');
      expect(component.currencyModel().to).toBe('USD');
    });

    it('should update the amount', () => {
      component.handleChange('amount', '100');
      expect(component.currencyModel().amount).toBe('100');
    });
  });

  describe('form validation checks', () => {
    it('should initially have an invalid form', () => {
      expect(component.currencyForm().invalid()).toBe(true);
    });

    it('should still be invalid if not setting all values', () => {
      component.handleChange('to', 'USD');
      component.handleChange('amount', '100');

      expect(component.currencyForm().invalid()).toBe(true);
    });

    it('should still be invalid if setting FROM and TO to be the same currency', () => {
      component.handleChange('to', 'USD');
      component.handleChange('from', 'USD');
      component.handleChange('amount', '100');
      expect(component.currencyForm().invalid()).toBe(true);
    });

    it('should still be VALID if settings are correct', () => {
      component.handleChange('to', 'USD');
      component.handleChange('from', 'GBP');
      component.handleChange('amount', '100');
      expect(component.currencyForm().invalid()).toBe(false);
    });

    it('should NOT call convertAmount when the form is invalid', () => {
      const convertSpy = vi.spyOn(currencyServiceMock, 'convertAmount');
      const event = new Event('submit');
      component.onSubmit(event);
      expect(convertSpy).not.toHaveBeenCalled();
    });

    it('should not call convertAmount when the form is invalid', () => {
      component.handleChange('to', 'USD');
      component.handleChange('from', 'GBP');
      component.handleChange('amount', '100');
      fixture.detectChanges();
      const convertSpy = vi.spyOn(currencyServiceMock, 'convertAmount');
      const event = new Event('submit');
      component.onSubmit(event);
      expect(convertSpy).toHaveBeenCalled();
    });
  });

  describe('keydown function checks', () => {
    it('should allow numeric keys', () => {
      const event = new KeyboardEvent('keydown', {
        key: '5'
      });

      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

      component.onAmountKeyDown(event);

      expect(preventDefaultSpy).not.toHaveBeenCalled();
    });

    it('should NOT allow non-numeric keys and then preventDefault', () => {
      const event = new KeyboardEvent('keydown', {
        key: 'T'
      });

      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

      component.onAmountKeyDown(event);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });
  });
});
