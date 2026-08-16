export interface Address {
  line1: string;
  line2?: string;
  line3?: string;
  line4?: string;
  line5?: string;
  town: string;
  county?: string;
  postcode: string;
  uprn?: string;
  noFixedAbode?: boolean;
}

export type VerificationStatus = 'valid' | 'needs-verification' | 'invalid' | 'unverified';

export interface OsDpaResult {
  UPRN: string;
  ADDRESS: string;
  ORGANISATION_NAME?: string;
  SUB_BUILDING_NAME?: string;
  BUILDING_NAME?: string;
  BUILDING_NUMBER?: string;
  THOROUGHFARE_NAME?: string;
  DEPENDENT_LOCALITY?: string;
  POST_TOWN: string;
  POSTCODE: string;
  MATCH?: number;
}

export interface ScoredAddress extends Address {
  match?: number;
}

export function osDpaToAddress(dpa: OsDpaResult): Address {
  const numberAndStreet = [dpa.BUILDING_NUMBER, dpa.THOROUGHFARE_NAME]
    .filter((part) => !!part && part.trim().length > 0)
    .join(' ')
    .trim();

  const leadingParts = [
    dpa.ORGANISATION_NAME,
    dpa.SUB_BUILDING_NAME,
    dpa.BUILDING_NAME,
    numberAndStreet || undefined,
    dpa.DEPENDENT_LOCALITY
  ].filter((part): part is string => !!part && part.trim().length > 0);

  const [line1, line2, line3, line4, line5] = leadingParts;

  return {
    line1: line1 ?? dpa.ADDRESS,
    line2,
    line3,
    line4,
    line5,
    town: dpa.POST_TOWN,
    county: undefined,
    postcode: dpa.POSTCODE,
    uprn: dpa.UPRN
  };
}

export function isOsDpaResult(value: Address | OsDpaResult): value is OsDpaResult {
  return 'POST_TOWN' in value;
}

export function isPopulatedAddress(address: Address | null | undefined): address is Address {
  return (
    !!address && !!address.line1?.trim() && !!address.town?.trim() && !!address.postcode?.trim()
  );
}

export function addressToSingleLine(address: Address): string {
  return [
    address.line1,
    address.line2,
    address.line3,
    address.line4,
    address.line5,
    address.town,
    address.county,
    address.postcode
  ]
    .filter((part) => !!part && part.trim().length > 0)
    .join(', ');
}
