import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TypesOfGamePage } from './types-of-game.page';

describe('TypesOfGamePage', () => {
  let component: TypesOfGamePage;
  let fixture: ComponentFixture<TypesOfGamePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TypesOfGamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
