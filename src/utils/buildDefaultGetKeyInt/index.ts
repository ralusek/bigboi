// Utils
import findMinExponent from '../findMinExponent';
import hashString from '../hashString';

export default function buildDefaultGetKeyInt(numBuckets: number) {
  // Because our hash is hex, we want to find the minimum exponent such that the
  // number of characters in the hash is greater than or equal to the number of
  // buckets. This ensures that there are enough characters pulled from the hash
  // to actually capture the full range of possible bucket indices.
  // For example, if we have 16 buckets, we need at least 1 character from the hash
  // to capture the full range of possible bucket indices (0-15). If we have 256 buckets
  // we need at least 2 characters from the hash to capture, etc.
  // Note, just to be safe, we'll use 8 characters as the minimum precision.
  // It just so happens that 8 characters is actually sufficient precision to capture
  // the full range of possible buckets for maxKeys all the way up to MAX_SAFE_INTEGER,
  // so this will literally always result in a precision of 8, but I'm leaving this code
  // in place I decide to support BigInt maxKeys in the future.
  const minExponent = findMinExponent(numBuckets, 16);
  const precision = Math.max(8, minExponent);

  return (key: string) => {
    const hash = hashString(key);
    // Take the first few characters to ensure uniform distribution
    const shortenedHash = hash.substring(0, precision);
    return parseInt(shortenedHash, 16);
  };
}
