import { formatNameForTitle } from '../utils';

describe('page title utils', () => {
  describe('formatNameForTitle', () => {
    it('should format a person as surname and first initial', () => {
      expect(formatNameForTitle({ firstName: 'John', lastName: 'Smith' })).toBe('Smith J');
    });

    it('should upper case the initial and trim the names', () => {
      expect(formatNameForTitle({ firstName: ' john ', lastName: ' Smith ' })).toBe('Smith J');
    });

    it('should use an organisation name as it is', () => {
      expect(formatNameForTitle({ firstName: 'Acme Ltd', lastName: '' })).toBe('Acme Ltd');
    });

    it('should use the surname alone when there is no first name', () => {
      expect(formatNameForTitle({ firstName: null, lastName: 'Smith' })).toBe('Smith');
    });

    it('should return an empty string when there is no name', () => {
      expect(formatNameForTitle(undefined)).toBe('');
      expect(formatNameForTitle({})).toBe('');
    });
  });
});
