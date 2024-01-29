import hashString from '../hashString';

/**
 * Determines the bucket number in which a key should be placed.
 * 
 * @param keyInt Uniformly distributed integer representing the key.
 * @param numBuckets Total number of buckets.
 * @returns The bucket number in which the key should be placed.
 */
export default function determineBucket(
  keyInt: number,
  numBuckets: number,
): number {
  // Modulo the key by the number of buckets to get the bucket number
  return keyInt % numBuckets;
}
