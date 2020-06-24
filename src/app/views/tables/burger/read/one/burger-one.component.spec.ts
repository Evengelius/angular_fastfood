import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BurgerOneComponent } from './burger-one.component';

describe('BurgerOneComponent', () => {
  let component: BurgerOneComponent;
  let fixture: ComponentFixture<BurgerOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BurgerOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BurgerOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
