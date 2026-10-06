import { expect } from '@jest/globals';

import { HighlightMatchPipe } from './highlight-match.pipe';

describe('HighlightMatchPipe', () => {
  const pipe = new HighlightMatchPipe();

  it('splits the text around the first match, ignoring case', () => {
    expect(pipe.transform('Testville, ZZ1 1AA', 'zz1')).toEqual({
      before: 'Testville, ',
      match: 'ZZ1',
      after: ' 1AA'
    });
  });

  it('leaves the text whole when nothing matches', () => {
    expect(pipe.transform('104 Test Street', 'sample')).toEqual({
      before: '104 Test Street',
      match: '',
      after: ''
    });
  });

  it('leaves the text whole when nothing has been typed', () => {
    expect(pipe.transform('104 Test Street', '')).toEqual({
      before: '104 Test Street',
      match: '',
      after: ''
    });
  });
});
