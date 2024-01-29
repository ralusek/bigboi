// Types
import { Config } from '../types';

// Constants
import { MAX_ARRAY_LENGTH, MAX_KEY_COUNT } from '../constants';

// Utils
import buildDefaultGetKeyInt from '../utils/buildDefaultGetKeyInt';
import determineBucket from '../utils/determineBucket';
import getBucketsEntriesIterator from '../utils/getBucketsEntriesIterator';

export class BigBoiSet <T extends string>{
  public getKeyInt: (key: T) => number;
  public numBuckets!: number;
  public size!: number;

  private buckets: Set<T>[] = [];

  constructor({
    maxKeys,
    disableLogging,
    getKeyInt,
  }: Config) {
    if (maxKeys > Number.MAX_SAFE_INTEGER) throw new Error('maxKeys must be less than Number.MAX_SAFE_INTEGER.');
    if ((maxKeys <= MAX_KEY_COUNT) && !disableLogging) console.warn('maxKeys is less than the max number of unique keys allowed in a Set. Consider using a regular Set instead.');

    const numBuckets = Math.ceil(maxKeys / MAX_KEY_COUNT);

    for (let i = 0; i < numBuckets; i++) {
      this.buckets[i] = new Set<T>();
    }

    this.getKeyInt = getKeyInt || buildDefaultGetKeyInt(numBuckets);

    Object.defineProperty(this, 'numBuckets', { get() { return numBuckets; } });
    Object.defineProperty(this, 'size', { get() { return this.buckets.reduce((acc: number, bucket: Set<string>) => acc + bucket.size, 0); } });
  }

  add(key: T) {
    const keyInt = this.getKeyInt(key);
    const bucketNumber = determineBucket(keyInt, this.numBuckets);
    this.buckets[bucketNumber].add(key);
  }

  has(key: T) {
    const keyInt = this.getKeyInt(key);
    const bucketNumber = determineBucket(keyInt, this.numBuckets);
    return this.buckets[bucketNumber].has(key);
  }

  clear() {
    for (let i = 0; i < this.numBuckets; i++) {
      this.buckets[i].clear();
    }
  }

  forEach(
    // The use of both value1 and value2 is simply matching the JS Set.forEach API
    // It does this to match the JS Map.forEach API
    fn: (value1: T, value2: T, set: Set<T>) => void,
  ) {
    for (let i = 0; i < this.numBuckets; i++) {
      this.buckets[i].forEach(fn);
    }
  }

  delete(key: T) {
    const keyInt = this.getKeyInt(key);
    const bucketNumber = determineBucket(keyInt, this.numBuckets);
    return this.buckets[bucketNumber].delete(key);
  }

  entries() {
    return getBucketsEntriesIterator(this.buckets, (entry) => entry);
  }

  keys() {
    return getBucketsEntriesIterator(this.buckets, (entry) => entry[0]);
  }

  values() {
    return getBucketsEntriesIterator(this.buckets, (entry) => entry[1]);
  }

  // Additional methods not in the JS Set API
  reduce<R extends any>(
    fn: (acc: R, value1: T, set: Set<T>) => R,
    initialValue: R,
  ) {
    let acc = initialValue;
    for (let i = 0; i < this.numBuckets; i++) {
      this.buckets[i].forEach((value1: T, value2: T, set: Set<T>) => {
        acc = fn(acc, value1, set);
      });
    }
    return acc;
  }

  map<R extends any>(
    fn: (value1: T, set: Set<T>) => R,
  ) {
    if (this.size > MAX_ARRAY_LENGTH) throw new Error(`BigBoiSet .map() is not supported when set size is greater than 2 ** 32 - 1 (${MAX_ARRAY_LENGTH}), the max JS array length. Current size: ${this.size}`);
    const mapped: R[] = [];
    for (let i = 0; i < this.numBuckets; i++) {
      this.buckets[i].forEach((value1: T, value2: T, set: Set<T>) => {
        mapped.push(fn(value1, set));
      });
    }
    return mapped;
  }

  getBucketSize(bucketNumber: number) {
    return this.buckets[bucketNumber].size;
  }
}
