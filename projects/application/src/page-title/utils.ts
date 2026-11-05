export interface PageTitleName {
  firstName?: string | null;
  lastName?: string | null;
}

// People become "Surname I". Organisations only have a firstName, so they are used as-is.
export const formatNameForTitle = (name?: PageTitleName | null): string => {
  const firstName = (name?.firstName || '').trim();
  const lastName = (name?.lastName || '').trim();
  const initial = firstName.charAt(0).toUpperCase();

  if (lastName) {
    return initial ? `${lastName} ${initial}` : lastName;
  }

  return firstName;
};
