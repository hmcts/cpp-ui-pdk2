import { expect } from '@jest/globals';

import { Address } from '../address.model';
import { toAddressSuggestions } from './address-autosuggest.util';

const addressesAt = (count: number, postcode: string, dpa: Address['dpa'] = {}): Address[] =>
  Array.from({ length: count }, (_, index) => ({
    line1: `Flat ${index + 1}`,
    line4: 'Testville',
    postcode,
    uprn: `${postcode}${index}`.replace(/\s/g, ''),
    dpa: { POST_TOWN: 'TESTVILLE', ...dpa }
  }));

const [addressElsewhere] = addressesAt(1, 'ZZ8 8YY', { THOROUGHFARE_NAME: 'MOCK LANE' });

describe('toAddressSuggestions', () => {
  it('shows 3 or fewer addresses at a location individually', () => {
    const addresses = addressesAt(3, 'ZZ1 1AA', { THOROUGHFARE_NAME: 'TEST STREET' });

    expect(toAddressSuggestions(addresses)).toEqual([
      { title: 'Flat 1', subtitle: 'Testville, ZZ1 1AA', address: addresses[0] },
      { title: 'Flat 2', subtitle: 'Testville, ZZ1 1AA', address: addresses[1] },
      { title: 'Flat 3', subtitle: 'Testville, ZZ1 1AA', address: addresses[2] }
    ]);
  });

  it('groups more than 3 addresses at a location into one suggestion', () => {
    const addresses = addressesAt(4, 'ZZ1 1AA', { THOROUGHFARE_NAME: 'TEST STREET' });

    const [group, ...rest] = toAddressSuggestions([...addresses, addressElsewhere]);

    expect(rest.map(({ address }) => address)).toEqual([addressElsewhere]);
    expect(group.title).toBe('ZZ1 1AA');
    expect(group.subtitle).toBe('TEST STREET, TESTVILLE - 4 addresses');
    expect(group.address).toBeUndefined();
    expect(group.groupedSuggestions?.map(({ address }) => address)).toEqual(addresses);
  });

  it('sorts the addresses in a group, with numbers in numeric order', () => {
    const addresses = addressesAt(10, 'ZZ1 1AA', { THOROUGHFARE_NAME: 'TEST STREET' });

    const [group] = toAddressSuggestions([...addresses].reverse().concat(addressElsewhere));

    expect(group.groupedSuggestions?.map(({ title }) => title)).toEqual(
      addresses.map(({ line1 }) => line1)
    );
  });

  it('lists the addresses directly when they all share one location', () => {
    const addresses = addressesAt(4, 'ZZ1 1AA', { THOROUGHFARE_NAME: 'TEST STREET' });

    expect(toAddressSuggestions(addresses).map(({ address }) => address)).toEqual(addresses);
  });

  it('groups each street in a postcode separately', () => {
    const addresses = [
      ...addressesAt(4, 'ZZ1 1AA', { THOROUGHFARE_NAME: 'TEST STREET' }),
      ...addressesAt(5, 'ZZ1 1AA', { THOROUGHFARE_NAME: 'SAMPLE ROAD' })
    ];

    expect(toAddressSuggestions(addresses).map(({ subtitle }) => subtitle)).toEqual([
      'TEST STREET, TESTVILLE - 4 addresses',
      'SAMPLE ROAD, TESTVILLE - 5 addresses'
    ]);
  });

  it('prefers the dependent street over the street', () => {
    const addresses = addressesAt(4, 'ZZ1 1AA', {
      DEPENDENT_THOROUGHFARE_NAME: 'MOCK COURT',
      THOROUGHFARE_NAME: 'TEST STREET'
    });

    expect(toAddressSuggestions([...addresses, addressElsewhere])[0].subtitle).toBe(
      'MOCK COURT, TESTVILLE - 4 addresses'
    );
  });

  it('groups by building name when there is no street', () => {
    const addresses = addressesAt(4, 'ZZ9 9ZZ', { BUILDING_NAME: 'SAMPLE HOUSE' });

    expect(toAddressSuggestions([...addresses, addressElsewhere])[0].subtitle).toBe(
      'SAMPLE HOUSE, TESTVILLE - 4 addresses'
    );
  });

  it('groups by postcode alone when there is no street or building name', () => {
    const addresses = addressesAt(4, 'ZZ9 9ZZ');

    expect(toAddressSuggestions([...addresses, addressElsewhere])[0].subtitle).toBe(
      'TESTVILLE - 4 addresses'
    );
  });
});
