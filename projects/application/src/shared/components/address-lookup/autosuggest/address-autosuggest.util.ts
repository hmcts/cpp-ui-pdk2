import { Address, addressToSingleLine } from '../address.model';

const GROUPING_THRESHOLD = 3;
const addressOrder = new Intl.Collator('en-GB', { numeric: true });

export interface AddressSuggestion {
  title: string;
  subtitle: string;
  address?: Address;
  groupedSuggestions?: AddressSuggestion[];
}

export function toAddressSuggestions(addresses: Address[]): AddressSuggestion[] {
  const addressesByLocation = new Map<string, Address[]>();
  for (const address of addresses) {
    const location = `${address.postcode}|${streetOrBuildingName(address) ?? ''}`;
    addressesByLocation.set(location, [...(addressesByLocation.get(location) ?? []), address]);
  }

  const suggestions = [...addressesByLocation.values()].flatMap((sameLocation) =>
    sameLocation.length > GROUPING_THRESHOLD
      ? [toAddressGroupSuggestion(sameLocation)]
      : sameLocation.map(toAddressSuggestion)
  );

  if (suggestions.length === 1 && suggestions[0].groupedSuggestions) {
    return suggestions[0].groupedSuggestions;
  }
  return suggestions;
}

function toAddressSuggestion(address: Address): AddressSuggestion {
  return {
    title: address.line1,
    subtitle: addressToSingleLine({ ...address, line1: '' }),
    address
  };
}

function toAddressGroupSuggestion(addresses: Address[]): AddressSuggestion {
  const [first] = addresses;
  const town = first.dpa?.POST_TOWN || first.line4;
  const place = [streetOrBuildingName(first), town].filter(Boolean).join(', ');
  const count = `${addresses.length} addresses`;

  return {
    title: first.postcode,
    subtitle: place ? `${place} - ${count}` : count,
    groupedSuggestions: sortAddresses(addresses).map(toAddressSuggestion)
  };
}

function sortAddresses(addresses: Address[]): Address[] {
  return [...addresses].sort((a, b) =>
    addressOrder.compare(addressToSingleLine(a), addressToSingleLine(b))
  );
}

function streetOrBuildingName({ dpa }: Address): string | undefined {
  return dpa?.DEPENDENT_THOROUGHFARE_NAME || dpa?.THOROUGHFARE_NAME || dpa?.BUILDING_NAME;
}
