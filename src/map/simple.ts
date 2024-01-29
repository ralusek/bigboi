// Types
import { Config } from '../types';

// Constants
import { MAX_KEY_COUNT } from '../constants';

// Utils
import buildDefaultGetKeyInt from '../utils/buildDefaultGetKeyInt';
import determineBucket from '../utils/determineBucket';
import getBucketsEntriesIterator from '../utils/getBucketsEntriesIterator';

type Private = {
  size: number;
};

const ref = new WeakMap<BigBoiMapSimple<any, any>, Private>();

function p(instance: BigBoiMapSimple<any, any>) {
  const p = ref.get(instance);
  if (p) return p;
  const newRef = {} as Private;
  ref.set(instance, newRef);
  return newRef;
}

export class BigBoiMapSimple<K extends any, V extends any> {
  public size!: number;

  private buckets: Map<K, V>[] = [];

  constructor() {
    this.buckets = [ new Map() ];
    p(this).size = 0;

    Object.defineProperty(this, 'size', { get() { return p(this).size; } });
  }

  set(key: K, value: V) {
    const existing = this.buckets.find((bucket) => bucket.has(key));
    if (existing) return existing.set(key, value);

    let last = this.buckets[this.buckets.length - 1];
    if (last.size >= MAX_KEY_COUNT) this.buckets.push(last = new Map());
    last.set(key, value);
    p(this).size++;
    return this;
  }

  has(key: K) {
    return this.buckets.some((bucket) => bucket.has(key));
  }

  get(key: K) {
    const bucket = this.buckets.find((bucket) => bucket.has(key));
    if (!bucket) return undefined;
    return bucket.get(key);
  }

  delete(key: K) {
    const bucket = this.buckets.find((bucket) => bucket.has(key));
    if (!bucket) return false;
    bucket.delete(key);
    p(this).size--;
    return true;
  }

  clear() {
    this.buckets.forEach((bucket) => bucket.clear());
    p(this).size = 0;
  }

  forEach(
    fn: (value: V, key: K, map: Map<K, V>) => void,
  ) {
    this.buckets.forEach((bucket) => bucket.forEach(fn));
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
