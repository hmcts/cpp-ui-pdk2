import { LabelType } from '@cpp/pdk';

export interface Address {
  line1: string;
  line2?: string;
  line3?: string;
  line4?: string;
  line5?: string;
  postcode: string;
  uprn?: string;
}

export type VerificationStatus = 'valid' | 'needs-verification' | 'invalid' | 'unverified';

export interface AddressLineErrorMessages {
  required?: string;
  addressLine?: string;
  maximumLength?: string;
}

export interface AddressPostcodeErrorMessages {
  required?: string;
  postcode?: string;
}

export interface AddressFieldConfig {
  label?: string;
  labelType?: LabelType | 'none';
  maxChars?: number;
  errorMessages?: AddressLineErrorMessages;
}

export interface AddressPostcodeFieldConfig {
  label?: string;
  labelType?: LabelType | 'none';
  errorMessages?: AddressPostcodeErrorMessages;
}

export interface AddressFieldsConfig {
  line1?: AddressFieldConfig;
  line2?: AddressFieldConfig;
  line3?: AddressFieldConfig;
  line4?: AddressFieldConfig;
  line5?: AddressFieldConfig;
  postcode?: AddressPostcodeFieldConfig;
}

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

const ADDRESS_LINE_SLOTS = 3;

function packAddressLines(parts: string[]): string[] {
  const lines = [...parts];

  while (lines.length > ADDRESS_LINE_SLOTS) {
    let joinAt = 0;
    for (let index = 1; index < lines.length - 1; index++) {
      const shortest = lines[joinAt].length + lines[joinAt + 1].length;
      if (lines[index].length + lines[index + 1].length < shortest) {
        joinAt = index;
      }
    }
    lines.splice(joinAt, 2, `${lines[joinAt]}, ${lines[joinAt + 1]}`);
  }

  return lines;
}

export function osDpaToAddress(dpa: OsDpaResult): Address {
  const numberAndStreet = [dpa.BUILDING_NUMBER, dpa.THOROUGHFARE_NAME]
    .filter((part) => !!part && part.trim().length > 0)
    .join(' ')
    .trim();

  const [line1, line2, line3] = packAddressLines(
    [
      dpa.ORGANISATION_NAME,
      dpa.SUB_BUILDING_NAME,
      dpa.BUILDING_NAME,
      numberAndStreet || undefined,
      dpa.DEPENDENT_LOCALITY
    ].filter((part): part is string => !!part && part.trim().length > 0)
  );

  return {
    line1: line1 ?? dpa.ADDRESS,
    line2,
    line3,
    line4: dpa.POST_TOWN,
    line5: undefined,
    postcode: dpa.POSTCODE,
    uprn: dpa.UPRN
  };
}

export function isPopulatedAddress(address: Address | null | undefined): address is Address {
  return !!address && !!address.line1?.trim() && !!address.postcode?.trim();
}

export function addressToSingleLine(address: Address): string {
  return [
    address.line1,
    address.line2,
    address.line3,
    address.line4,
    address.line5,
    address.postcode
  ]
    .filter((part) => !!part && part.trim().length > 0)
    .join(', ');
}
