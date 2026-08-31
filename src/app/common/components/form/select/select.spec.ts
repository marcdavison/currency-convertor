import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectEl } from './select';

describe('Select', () => {
  let component: SelectEl;
  let fixture: ComponentFixture<SelectEl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectEl]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectEl);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('error message rendering', () => {
    it('should display errors when touched', () => {
      fixture.componentRef.setInput('errors', [
        { message: 'Error one' },
        { message: 'Error two' }
      ]);
      fixture.componentRef.setInput('touched', true);

      fixture.detectChanges();

      const errors = fixture.nativeElement.querySelectorAll('.errorContainer li');

      expect(errors.length).toBe(2);
      expect(errors[0].textContent).toContain('Error one');
    });

    it('should display NO errors when NOT touched', () => {
      fixture.componentRef.setInput('errors', [
        { message: 'Error one' },
        { message: 'Error two' }
      ]);
      fixture.componentRef.setInput('touched', false);

      fixture.detectChanges();

      const errors = fixture.nativeElement.querySelectorAll('.errorContainer li');
      expect(errors.length).toBe(0);
    });
  });

  describe('onchange and blur check', () => {
    it('should emit the selected value when changed', () => {
      const emitSpy = vi.spyOn(component.valueChange, 'emit');

      fixture.componentRef.setInput('options', ['GBP', 'USD', 'EUR']);
      fixture.detectChanges();

      const select: HTMLSelectElement =
        fixture.nativeElement.querySelector('select');

      select.value = 'USD';
      select.dispatchEvent(new Event('change'));

      expect(emitSpy).toHaveBeenCalledWith('USD');
    });

    it('should emit when the select loses focus', () => {
      const emitSpy = vi.spyOn(component.blur, 'emit');

      const select: HTMLSelectElement =
        fixture.nativeElement.querySelector('select');

      select.dispatchEvent(new Event('blur'));

      expect(emitSpy).toHaveBeenCalled();
    });
  });
});
