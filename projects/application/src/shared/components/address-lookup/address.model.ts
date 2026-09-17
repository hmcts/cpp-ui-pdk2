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

export interface ScoredAddress extends Address {
  match?: number;
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
