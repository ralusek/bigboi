import crypto from 'crypto';

/**
 * Hashes a string using SHA-256 to produce a uniformly distributed hash.
 */
export default function hashString(key: string): string {
  // NOTE: I tried murmurhash, because this doesn't need to be cypographically secure,
  // but it was actually slower than SHA-256, presumably because SHA-256 is implemented
  // at lower level.
  return crypto.createHash('sha256').update(key).digest('hex');
}
