import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Header } from './header';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders an h1 tag', async () => {
    const html = fixture.nativeElement;

    const h1 = html.querySelector('h1');

    expect(h1).toBeTruthy();
    expect(h1?.textContent).toContain('TDS Tech Test - Marc Davison');
  });
});
