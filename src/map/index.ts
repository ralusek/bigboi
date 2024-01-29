// Types
import { Config } from '../types';

// Constants
import { MAX_KEY_COUNT } from '../constants';

// Utils
import buildDefaultGetKeyInt from '../utils/buildDefaultGetKeyInt';
import determineBucket from '../utils/determineBucket';
import getBucketsEntriesIterator from '../utils/getBucketsEntriesIterator';

export class BigBoiMap<K extends string, V extends any> {
  public getKeyInt: (key: K) => number;
  public numBuckets!: number;
  public size!: number;

  private buckets: Map<K, V>[] = [];

  constructor({
    maxKeys,
    disableLogging,
    getKeyInt,
  }: Config) {
    if (maxKeys > Number.MAX_SAFE_INTEGER) throw new Error('maxKeys must be less than Number.MAX_SAFE_INTEGER.');
    if ((maxKeys <= MAX_KEY_COUNT) && !disableLogging) console.warn('maxKeys is less than the max number of unique keys allowed in a Map. Consider using a regular Map instead.');

    const numBuckets = Math.ceil(maxKeys / MAX_KEY_COUNT);

    for (let i = 0; i < numBuckets; i++) {
      this.buckets[i] = new Map<K, V>();
    }

    this.getKeyInt = getKeyInt || buildDefaultGetKeyInt(numBuckets);

    Object.defineProperty(this, 'numBuckets', { get() { return numBuckets; } });
    Object.defineProperty(this, 'size', { get() { return this.buckets.reduce((acc: number, bucket: Map<K, V>) => acc + bucket.size, 0); } });
  }

  set(key: K, value: V) {
    const keyInt = this.getKeyInt(key);
    const bucketNumber = determineBucket(keyInt, this.numBuckets);
    this.buckets[bucketNumber].set(key, value);
  }

  has(key: K) {
    const keyInt = this.getKeyInt(key);
    const bucketNumber = determineBucket(keyInt, this.numBuckets);
    return this.buckets[bucketNumber].has(key);
  }

  get(key: K) {
    const keyInt = this.getKeyInt(key);
    const bucketNumber = determineBucket(keyInt, this.numBuckets);
    return this.buckets[bucketNumber].get(key);
  }


  clear() {
    for (let i = 0; i < this.numBuckets; i++) {
      this.buckets[i].clear();
    }
  }

  forEach(
    fn: (value: V, key: K, map: Map<K, V>) => void,
  ) {
    for (let i = 0; i < this.numBuckets; i++) {
      this.buckets[i].forEach(fn);
    }
  }

  delete(key: K) {
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

  getBucketSize(bucketNumber: number) {
    return this.buckets[bucketNumber].size;
  }
}
