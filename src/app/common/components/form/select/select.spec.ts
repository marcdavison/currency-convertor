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
});
