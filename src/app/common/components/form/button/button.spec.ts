import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonEl } from './button';

describe('Button', () => {
  let component: ButtonEl;
  let fixture: ComponentFixture<ButtonEl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonEl]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonEl);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show loadingText if loading true', async () => {
    const html = fixture.nativeElement;
    fixture.componentRef.setInput('loading', true);
    fixture.componentRef.setInput('loadingText', 'Loading text...');
    fixture.detectChanges();
    const buttonEl = html.querySelector('button');
    const buttonText = buttonEl?.innerText;
    expect(buttonText).toBe("LOADING TEXT...");
  });

  it('should show loadingText if loading false', async () => {
    const html = fixture.nativeElement;
    fixture.componentRef.setInput('loading', false);
    fixture.componentRef.setInput('loadingText', 'Loading text...');
    fixture.componentRef.setInput('valueText', 'Convert');
    fixture.detectChanges();
    const buttonEl = html.querySelector('button');
    const buttonText = buttonEl?.innerText;
    expect(buttonText).toBe("CONVERT");
  });

});
