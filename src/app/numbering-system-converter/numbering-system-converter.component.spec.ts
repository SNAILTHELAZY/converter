import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberingSystemConverterComponent } from './numbering-system-converter.component';

describe('NumberingSystemConverterComponent', () => {
  let component: NumberingSystemConverterComponent;
  let fixture: ComponentFixture<NumberingSystemConverterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberingSystemConverterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberingSystemConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
