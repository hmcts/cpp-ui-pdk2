export const coerceBooleanProperty = (value: unknown): boolean => {
  return value !== null && `${value}` !== 'false';
};

export const stripClassesByPrefix = (classList: HTMLElement['classList'], prefix: string) => {
  classList.forEach((className) => {
    if (className.startsWith(prefix)) {
      classList.remove(className);
    }
  });
};

let i = 0;

export const generateId = (prefix?: string, randomise: boolean = false): string => {
  if (
    typeof process !== 'undefined' &&
    process.env &&
    process.env.NODE_ENV &&
    process.env.NODE_ENV.toLowerCase() === 'test'
  ) {
    return `${prefix}-GENERATED_ID`;
  }
  const parts: unknown[] = prefix ? [prefix] : [];

  let suffix: number;

  if (randomise) {
    suffix = Date.now();
  } else {
    i += 1;
    suffix = i;
  }

  return parts.concat(suffix).join('-');
};
