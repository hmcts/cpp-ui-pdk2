import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdkBackLink } from '..';

describe('pdk-back-link', () => {
  let fixture: ComponentFixture<BackLinkTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BackLinkTestComponent);
    fixture.detectChanges();
  });

  it('should render', () => {
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'pdk-back-link-test',
  template: ` <a href="#" pdk-back-link>Back</a> `,
  imports: [PdkBackLink]
})
class BackLinkTestComponent {}
