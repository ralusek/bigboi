import { BigBoiSet } from '../dist';

function forEachIterable(iterator: IterableIterator<any>, callback: (value: any) => void) {
  while(true) {
    const next = iterator.next();
    if (next.done) break;
    callback(next.value);
  }
}

describe('BigBoiSet basic interface', () => {
  it('should have a comparable interface to Set.add and Set.has', async () => {
    const values = ['a', 'b', 'c'];
    const set = new Set<string>();
    const bigSet = new BigBoiSet<string>({ maxKeys: 20_000_000 }); // 2 buckets
    for (const value of values) {
      set.add(value);
      bigSet.add(value);
    }

    // Unrelated to test, just a sanity check ensuring that buckets are deterministic
    // and that we have keys in both buckets for the remaining tests.
    // For what it's worth, a, b go to bucket 0 and c goes to bucket 1.
    // This was just lucky, because sets are "unordered" but actually iterable by insertion order.
    // So the fact that they got bucketed this way via hashing is just a coincidence, but
    // allows for the .forEach and iterator tests to be easy to test/compare between set and BigBoiSet.
    expect(bigSet.getBucketSize(0)).toEqual(2);
    expect(bigSet.getBucketSize(1)).toEqual(1);

    // Has
    expect(bigSet.has('a')).toEqual(set.has('a'));
    expect(bigSet.has('b')).toEqual(set.has('b'));
    expect(bigSet.has('c')).toEqual(set.has('c'));
    expect(bigSet.has('d')).toEqual(set.has('d'));

    expect(bigSet.size).toEqual(set.size);
  });

  it('should have a comparable interface to Set.delete', async () => {
    const values = ['a', 'b', 'c'];
    const set = new Set<string>();
    const bigSet = new BigBoiSet<string>({ maxKeys: 20_000_000 }); // 2 buckets
    for (const value of values) {
      set.add(value);
      bigSet.add(value);
    }


    // Delete
    expect(bigSet.delete('a')).toEqual(set.delete('a'));
    expect(bigSet.has('a')).toEqual(set.has('a'));
    expect(bigSet.has('a')).toEqual(false);

    expect(bigSet.size).toEqual(set.size);
    expect(bigSet.size).toEqual(2);

    expect(bigSet.has('b')).toEqual(set.has('b'));
    expect(bigSet.has('b')).toEqual(true);

    expect(bigSet.has('c')).toEqual(set.has('c'));
    expect(bigSet.has('c')).toEqual(true);
  });

  it('should have a comparable interface to Set.clear', async () => {
    const values = ['a', 'b', 'c'];
    const set = new Set<string>();
    const bigSet = new BigBoiSet<string>({ maxKeys: 20_000_000 }); // 2 buckets
    for (const value of values) {
      set.add(value);
      bigSet.add(value);
    }

    // Clear
    expect(bigSet.clear()).toEqual(set.clear());
    expect(bigSet.has('b')).toEqual(set.has('b'));
    expect(bigSet.has('b')).toEqual(false);
    expect(bigSet.has('c')).toEqual(set.has('c'));
    expect(bigSet.has('c')).toEqual(false);

    expect(bigSet.size).toEqual(set.size);
    expect(bigSet.size).toEqual(0);
  });

  it('should have a comparable interface to Set.forEach', async () => {
    const values = ['a', 'b', 'c'];
    const set = new Set<string>();
    const bigSet = new BigBoiSet<string>({ maxKeys: 20_000_000 }); // 2 buckets
    for (const value of values) {
      set.add(value);
      bigSet.add(value);
    }

    // ForEach
    const setForEachValues: string[] = [];
    const bigSetForEachValues: string[] = [];
    set.forEach((value) => setForEachValues.push(value));
    bigSet.forEach((value) => bigSetForEachValues.push(value));

    expect(setForEachValues).toEqual(bigSetForEachValues);
  });

  it('should have a comparable interface to Set.entries', async () => {
    const values = ['a', 'b', 'c'];
    const set = new Set<string>();
    const bigSet = new BigBoiSet<string>({ maxKeys: 20_000_000 }); // 2 buckets
    for (const value of values) {
      set.add(value);
      bigSet.add(value);
    }

    // Entries
    const setEntries: [string, string][] = [];
    const bigSetEntries: [string, string][] = [];
    forEachIterable(set.entries(), (entry) => setEntries.push(entry));
    forEachIterable(bigSet.entries(), (entry) => bigSetEntries.push(entry));

    expect(setEntries).toEqual(bigSetEntries);
  });

  it('should have a comparable interface to Set.keys', async () => {
    const values = ['a', 'b', 'c'];
    const set = new Set<string>();
    const bigSet = new BigBoiSet<string>({ maxKeys: 20_000_000 }); // 2 buckets
    for (const value of values) {
      set.add(value);
      bigSet.add(value);
    }

    // Keys
    const setKeys: string[] = [];
    const bigSetKeys: string[] = [];
    forEachIterable(set.keys(), (key) => setKeys.push(key));
    forEachIterable(bigSet.keys(), (key) => bigSetKeys.push(key));

    expect(setKeys).toEqual(bigSetKeys);
  });

  it('should have a comparable interface to Set.values', async () => {
    const values = ['a', 'b', 'c'];
    const set = new Set<string>();
    const bigSet = new BigBoiSet<string>({ maxKeys: 20_000_000 }); // 2 buckets
    for (const value of values) {
      set.add(value);
      bigSet.add(value);
    }

    // Values
    const setValues: string[] = [];
    const bigSetValues: string[] = [];
    forEachIterable(set.values(), (value) => setValues.push(value));
    forEachIterable(bigSet.values(), (value) => bigSetValues.push(value));

    expect(setValues).toEqual(bigSetValues);
  });

  describe('BigBoiSet custom functions', () => {
    it('should have a .reduce that behaves as it does on an array', () => {
      const values = ['a', 'b', 'c'];
      const bigSet = new BigBoiSet<string>({ maxKeys: 20_000_000 }); // 2 buckets
      for (const value of values) {
        bigSet.add(value);
      }

      const arrReduce = values.reduce((acc, value) => acc + value, '');
      const bigSetReduce = bigSet.reduce((acc, value) => acc + value, '');
      expect(arrReduce).toEqual(bigSetReduce);
    });

    it('should have a .map that behaves as it does on an array', () => {
      const values = ['a', 'b', 'c'];
      const bigSet = new BigBoiSet<string>({ maxKeys: 20_000_000 }); // 2 buckets
      for (const value of values) {
        bigSet.add(value);
      }

      const arrMap = values.map((value) => value + '!');
      const bigSetMap = bigSet.map((value) => value + '!');
      expect(arrMap).toEqual(bigSetMap);
    });
  });
});
