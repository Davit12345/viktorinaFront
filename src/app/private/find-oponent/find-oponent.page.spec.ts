import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FindOponentPage } from './find-oponent.page';

describe('FindOponentPage', () => {
  let component: FindOponentPage;
  let fixture: ComponentFixture<FindOponentPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FindOponentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
