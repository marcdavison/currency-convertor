import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { InputEl } from './input';

describe('Input', () => {
  let component: InputEl;
  let fixture: ComponentFixture<InputEl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputEl]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputEl);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('component input settings', () => {
    it('should display the label based on input', () => {
      fixture.componentRef.setInput('label', 'From');
      fixture.detectChanges();
      const label = fixture.nativeElement.querySelector('label');
      expect(label.textContent).toBe('From');
    });

    it('should set the input field to value input', () => {
      fixture.componentRef.setInput('value', 'GBP');
      fixture.detectChanges();
      const label = fixture.nativeElement.querySelector('input');
      expect(label.value).toBe('GBP');
    });
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

  describe('value change check on emit', () => {
    it('should emit the value when the input changes', () => {
      vi.spyOn(component.valueChange, 'emit');
      const input: HTMLInputElement =
        fixture.nativeElement.querySelector('input');

      input.value = '100';
      input.dispatchEvent(new Event('input'));

      expect(component.valueChange.emit).toHaveBeenCalledWith('100');
    });

    it('should emit keydown events', () => {
      const emitSpy = vi.spyOn(component.keyDown, 'emit');
      const input: HTMLInputElement =
        fixture.nativeElement.querySelector('input');
      const event = new KeyboardEvent('keydown', {
        key: 'A'
      });

      input.dispatchEvent(event);
      expect(emitSpy).toHaveBeenCalledWith(event);
    });

    it('should emit on blur', () => {
      const emitSpy = vi.spyOn(component.blur, 'emit');
      const input: HTMLInputElement =
        fixture.nativeElement.querySelector('input');

      input.dispatchEvent(new Event('blur'));
      expect(emitSpy).toHaveBeenCalled();
    });
  });
});
