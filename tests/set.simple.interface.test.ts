import { BigBoiSetSimple } from '../dist';

function forEachIterable(iterator: IterableIterator<any>, callback: (value: any) => void) {
  while (true) {
    const next = iterator.next();
    if (next.done) break;
    callback(next.value);
  }
}

describe('BigBoiSetSimple basic interface', () => {
  it('should have a comparable interface to Map.add and Map.has', async () => {
    const values = ['a', 'b', 'c'] as const;
    const set = new Set<string>();
    const bigSet = new BigBoiSetSimple<string>();
    for (const value of values) {
      set.add(value);
      bigSet.add(value);
    }

    // Has
    expect(bigSet.has('a')).toEqual(set.has('a'));
    expect(bigSet.has('b')).toEqual(set.has('b'));
    expect(bigSet.has('c')).toEqual(set.has('c'));
    expect(bigSet.has('d')).toEqual(set.has('d'));

    expect(bigSet.size).toEqual(set.size);
  });

  it('should have a comparable interface to Map.delete', async () => {
    const values = ['a', 'b', 'c'] as const;
    const set = new Set<string>();
    const bigSet = new BigBoiSetSimple<string>();
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

  it('should have a comparable interface to Map.clear', async () => {
    const values = ['a', 'b', 'c'] as const;
    const set = new Set<string>();
    const bigSet = new BigBoiSetSimple<string>();
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

  it('should have a comparable interface to Map.forEach', async () => {
    const values = ['a', 'b', 'c'] as const;
    const set = new Set<string>();
    const bigSet = new BigBoiSetSimple<string>();
    for (const value of values) {
      set.add(value);
      bigSet.add(value);
    }

    // ForEach
    const setForEachValues: string[] = [];
    const bigSetForEachValues: string[] = [];

    set.forEach((value, key) => {
      setForEachValues.push(value);
    });
    bigSet.forEach((value, key) => {
      bigSetForEachValues.push(value);
    });

    expect(setForEachValues).toEqual(bigSetForEachValues);
  });

  it('should have a comparable interface to Map.entries', async () => {
    const values = ['a', 'b', 'c'] as const;
    const set = new Set<string>();
    const bigSet = new BigBoiSetSimple<string>();
    for (const value of values) {
      set.add(value);
      bigSet.add(value);
    }

    // Entries
    const setEntries: [string, number][] = [];
    const bigSetEntries: [string, number][] = [];
    forEachIterable(set.entries(), (entry) => setEntries.push(entry));
    forEachIterable(bigSet.entries(), (entry) => bigSetEntries.push(entry));

    expect(setEntries).toEqual(bigSetEntries);
  });

  it('should have a comparable interface to Map.keys', async () => {
    const values = ['a', 'b', 'c'] as const;
    const set = new Set<string>();
    const bigSet = new BigBoiSetSimple<string>();
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

  it('should have a comparable interface to Map.values', async () => {
    const values = ['a', 'b', 'c'] as const;
    const set = new Set<string>();
    const bigSet = new BigBoiSetSimple<string>();
    for (const value of values) {
      set.add(value);
      bigSet.add(value);
    }

    // Values
    const setValues: number[] = [];
    const bigSetValues: number[] = [];
    forEachIterable(set.values(), (value) => setValues.push(value));
    forEachIterable(bigSet.values(), (value) => bigSetValues.push(value));

    expect(setValues).toEqual(bigSetValues);
  });
});
