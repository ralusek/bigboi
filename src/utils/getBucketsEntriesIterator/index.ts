
export default function getBucketsEntriesIterator<T, R>(
  buckets: Set<T>[],
  middleware: (entry: [T, T]) => R,
): IterableIterator<R>;
export default function getBucketsEntriesIterator<K, V, R>(
  buckets: Map<K, V>[],
  middleware: (entry: [K, V]) => R,
): IterableIterator<R>;
export default function getBucketsEntriesIterator(
  buckets: Array<Set<any> | Map<any, any>>,
  middleware: (entry: [any, any]) => any,
): IterableIterator<any> {
  let currentBucket = 0;
  let currentBucketIterator = buckets[currentBucket]?.entries();

  const iterator = {
    next: () => {
      while (currentBucketIterator) {
        const next = currentBucketIterator.next();
        if (!next.done) return { value: middleware(next.value), done: false };
        currentBucket++;
        currentBucketIterator = buckets[currentBucket]?.entries();
      }
      return {
        value: undefined,
        done: true,
      };
    },
    [Symbol.iterator]: function() { return this; }
  };

  return iterator;
}
