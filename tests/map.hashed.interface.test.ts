import { BigBoiMapHashed } from '../dist';

function forEachIterable(iterator: IterableIterator<any>, callback: (value: any) => void) {
  while (true) {
    const next = iterator.next();
    if (next.done) break;
    callback(next.value);
  }
}

describe('BigBoiMapHashed basic interface', () => {
  it('should have a comparable interface to Map.add and Map.has', async () => {
    const values = [['a', 1], ['b', 2], ['c', 3]] as const;
    const map = new Map<string, number>();
    const bigMap = new BigBoiMapHashed<string, number>({ maxKeys: 20_000_000 }); // 2 buckets
    for (const [key, value] of values) {
      map.set(key, value);
      bigMap.set(key, value);
    }

    // Unrelated to test, just a sanity check ensuring that buckets are deterministic
    // and that we have keys in both buckets for the remaining tests.
    // For what it's worth, a, b go to bucket 0 and c goes to bucket 1.
    // This was just lucky, because sets are "unordered" but actually iterable by insertion order.
    // So the fact that they got bucketed this way via hashing is just a coincidence, but
    // allows for the .forEach and iterator tests to be easy to test/compare between set and BigBoiMapHashed.
    expect(bigMap.getBucketSize(0)).toEqual(2);
    expect(bigMap.getBucketSize(1)).toEqual(1);

    // Has
    expect(bigMap.has('a')).toEqual(map.has('a'));
    expect(bigMap.has('b')).toEqual(map.has('b'));
    expect(bigMap.has('c')).toEqual(map.has('c'));
    expect(bigMap.has('d')).toEqual(map.has('d'));

    expect(bigMap.size).toEqual(map.size);
  });

  it('should have a comparable interface to Map.get', async () => {
    const values = [['a', 1], ['b', 2], ['c', 3]] as const;
    const map = new Map<string, number>();
    const bigMap = new BigBoiMapHashed<string, number>({ maxKeys: 20_000_000 }); // 2 buckets
    for (const [key, value] of values) {
      map.set(key, value);
      bigMap.set(key, value);
    }

    // Get
    expect(bigMap.get('a')).toEqual(map.get('a'));
    expect(bigMap.get('b')).toEqual(map.get('b'));
    expect(bigMap.get('c')).toEqual(map.get('c'));
    expect(bigMap.get('d')).toEqual(map.get('d'));

    expect(bigMap.size).toEqual(map.size);
  });

  it('should have a comparable interface to Map.delete', async () => {
    const values = [['a', 1], ['b', 2], ['c', 3]] as const;
    const map = new Map<string, number>();
    const bigMap = new BigBoiMapHashed<string, number>({ maxKeys: 20_000_000 }); // 2 buckets
    for (const [key, value] of values) {
      map.set(key, value);
      bigMap.set(key, value);
    }


    // Delete
    expect(bigMap.delete('a')).toEqual(map.delete('a'));
    expect(bigMap.has('a')).toEqual(map.has('a'));
    expect(bigMap.has('a')).toEqual(false);

    expect(bigMap.size).toEqual(map.size);
    expect(bigMap.size).toEqual(2);

    expect(bigMap.has('b')).toEqual(map.has('b'));
    expect(bigMap.has('b')).toEqual(true);

    expect(bigMap.has('c')).toEqual(map.has('c'));
    expect(bigMap.has('c')).toEqual(true);
  });

  it('should have a comparable interface to Map.clear', async () => {
    const values = [['a', 1], ['b', 2], ['c', 3]] as const;
    const map = new Map<string, number>();
    const bigMap = new BigBoiMapHashed<string, number>({ maxKeys: 20_000_000 }); // 2 buckets
    for (const [key, value] of values) {
      map.set(key, value);
      bigMap.set(key, value);
    }

    // Clear
    expect(bigMap.clear()).toEqual(map.clear());
    expect(bigMap.has('b')).toEqual(map.has('b'));
    expect(bigMap.has('b')).toEqual(false);
    expect(bigMap.has('c')).toEqual(map.has('c'));
    expect(bigMap.has('c')).toEqual(false);

    expect(bigMap.size).toEqual(map.size);
    expect(bigMap.size).toEqual(0);
  });

  it('should have a comparable interface to Map.forEach', async () => {
    const values = [['a', 1], ['b', 2], ['c', 3]] as const;
    const map = new Map<string, number>();
    const bigMap = new BigBoiMapHashed<string, number>({ maxKeys: 20_000_000 }); // 2 buckets
    for (const [key, value] of values) {
      map.set(key, value);
      bigMap.set(key, value);
    }

    // ForEach
    const setForEachValues: number[] = [];
    const setForEachKeys: string[] = [];
    const bigMapForEachValues: number[] = [];
    const bigMapForEachKeys: string[] = [];

    map.forEach((value, key) => {
      setForEachValues.push(value);
      setForEachKeys.push(key);
    });
    bigMap.forEach((value, key) => {
      bigMapForEachValues.push(value);
      bigMapForEachKeys.push(key);
    });

    expect(setForEachValues).toEqual(bigMapForEachValues);
    expect(setForEachKeys).toEqual(bigMapForEachKeys);
  });

  it('should have a comparable interface to Map.entries', async () => {
    const values = [['a', 1], ['b', 2], ['c', 3]] as const;
    const map = new Map<string, number>();
    const bigMap = new BigBoiMapHashed<string, number>({ maxKeys: 20_000_000 }); // 2 buckets
    for (const [key, value] of values) {
      map.set(key, value);
      bigMap.set(key, value);
    }

    // Entries
    const setEntries: [string, number][] = [];
    const bigMapEntries: [string, number][] = [];
    forEachIterable(map.entries(), (entry) => setEntries.push(entry));
    forEachIterable(bigMap.entries(), (entry) => bigMapEntries.push(entry));

    expect(setEntries).toEqual(bigMapEntries);
  });

  it('should have a comparable interface to Map.keys', async () => {
    const values = [['a', 1], ['b', 2], ['c', 3]] as const;
    const map = new Map<string, number>();
    const bigMap = new BigBoiMapHashed<string, number>({ maxKeys: 20_000_000 }); // 2 buckets
    for (const [key, value] of values) {
      map.set(key, value);
      bigMap.set(key, value);
    }

    // Keys
    const setKeys: string[] = [];
    const bigMapKeys: string[] = [];
    forEachIterable(map.keys(), (key) => setKeys.push(key));
    forEachIterable(bigMap.keys(), (key) => bigMapKeys.push(key));

    expect(setKeys).toEqual(bigMapKeys);
  });

  it('should have a comparable interface to Map.values', async () => {
    const values = [['a', 1], ['b', 2], ['c', 3]] as const;
    const map = new Map<string, number>();
    const bigMap = new BigBoiMapHashed<string, number>({ maxKeys: 20_000_000 }); // 2 buckets
    for (const [key, value] of values) {
      map.set(key, value);
      bigMap.set(key, value);
    }

    // Values
    const setValues: number[] = [];
    const bigMapValues: number[] = [];
    forEachIterable(map.values(), (value) => setValues.push(value));
    forEachIterable(bigMap.values(), (value) => bigMapValues.push(value));

    expect(setValues).toEqual(bigMapValues);
  });
});
