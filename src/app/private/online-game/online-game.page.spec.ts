import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OnlineGamePage } from './online-game.page';

describe('OnlineGamePage', () => {
  let component: OnlineGamePage;
  let fixture: ComponentFixture<OnlineGamePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OnlineGamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
