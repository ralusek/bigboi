import crypto from 'crypto';

/**
 * Hashes a string using SHA-256 to produce a uniformly distributed hash.
 */
export default function hashString(key: string): string {
  return crypto.createHash('sha256').update(key).digest('hex');
}
