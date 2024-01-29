// Types
import { Config } from '../types';

// Constants
import { MAX_ARRAY_LENGTH, MAX_KEY_COUNT } from '../constants';

// Utils
import getBucketsEntriesIterator from '../utils/getBucketsEntriesIterator';

type Private = {
  size: number;
};

const ref = new WeakMap<BigBoiSetSimple<any>, Private>();

function p(instance: BigBoiSetSimple<any>) {
  const p = ref.get(instance);
  if (p) return p;
  const newRef = {} as Private;
  ref.set(instance, newRef);
  return newRef;
}

export class BigBoiSetSimple <T extends any>{
  public size!: number;

  private buckets: Set<T>[] = [];

  constructor() {
    this.buckets = [ new Set() ];
    p(this).size = 0;

    Object.defineProperty(this, 'size', { get() { return p(this).size; } });
  }

  add(key: T) {
    if (this.has(key)) return this;

    let last = this.buckets[this.buckets.length - 1];
    if (last.size >= MAX_KEY_COUNT) this.buckets.push(last = new Set());
    last.add(key);
    p(this).size++;
    return this;
  }

  has(key: T) {
    return this.buckets.some((bucket) => bucket.has(key));
  }

  clear() {
    this.buckets.forEach((bucket) => bucket.clear());
    p(this).size = 0;
  }

  forEach(
    // The use of both value1 and value2 is simply matching the JS Set.forEach API
    // It does this to match the JS Map.forEach API
    fn: (value1: T, value2: T, set: Set<T>) => void,
  ) {
    this.buckets.forEach((bucket) => bucket.forEach(fn));
  }

  delete(key: T) {
    const bucket = this.buckets.find((bucket) => bucket.has(key));
    if (!bucket) return false;
    bucket.delete(key);
    p(this).size--;
    return true;
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
    const numBuckets = this.buckets.length;
    let acc = initialValue;
    for (let i = 0; i < numBuckets; i++) {
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
    const numBuckets = this.buckets.length;
    const mapped: R[] = [];
    for (let i = 0; i < numBuckets; i++) {
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
