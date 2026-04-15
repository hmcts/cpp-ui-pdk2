import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdkBadge } from '..';

describe('pdk-badge', () => {
  let fixture: ComponentFixture<BadgeTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgeTestComponent);
    fixture.detectChanges();
  });

  it('should render', () => {
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'pdk-badge-test',
  template: ` <pdk-badge>CONTENT</pdk-badge> `,
  imports: [PdkBadge]
})
class BadgeTestComponent {}
