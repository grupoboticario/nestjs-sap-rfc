export function createToken(
  prefix: string,
  suffix: string | symbol,
): string | symbol | undefined {
  if (!prefix && !suffix) {
    return undefined;
  }

  if (!prefix && suffix) {
    return suffix;
  }

  if (!suffix) {
    return undefined;
  }

  let nameSuffix = typeof suffix === 'symbol' ? suffix.description : suffix;

  const namePrefix = `${prefix.trim().toUpperCase()}`;
  nameSuffix = `${nameSuffix.trim().toUpperCase()}`;
  return `${namePrefix}_${nameSuffix}`;
}
