import { BigBoiSet } from '../dist';

describe('BigBoiSet bucketing functionality', () => {
  it('should correctly bucket serial keys into the buckets', async () => {
    const set = new BigBoiSet({ maxKeys: 20_000_000 });
    expect(set.numBuckets).toBe(2);
    for (let i = 0; i < 20_000_000; i++) {
      if (i % 1_000_000 === 0) console.log('Adding items', i, 'of 20,000,000');
      set.add(i.toString());
    }

    // Expect bucket 0 to have between 9,980,000 and 10,020,000 keys
    expect(set.getBucketSize(0)).toBeGreaterThanOrEqual(9_980_000);
    expect(set.getBucketSize(0)).toBeLessThanOrEqual(10_020_000);

    // Expect bucket 1 to have between 9,980,000 and 10,020,000 keys
    expect(set.getBucketSize(1)).toBeGreaterThanOrEqual(9_980_000);
    expect(set.getBucketSize(1)).toBeLessThanOrEqual(10_020_000);
  });

  it('should correctly bucket random keys into the buckets', async () => {
    const set = new BigBoiSet({ maxKeys: 20_000_000 });
    expect(set.numBuckets).toBe(2);
    for (let i = 0; i < 20_000_000; i++) {
      if (i % 1_000_000 === 0) console.log('Adding items', i, 'of 20,000,000');
      set.add(Math.random().toString());
    }

    // Expect bucket 0 to have between 9,980,000 and 10,020,000 keys
    expect(set.getBucketSize(0)).toBeGreaterThanOrEqual(9_980_000);
    expect(set.getBucketSize(0)).toBeLessThanOrEqual(10_020_000);

    // Expect bucket 1 to have between 9,980,000 and 10,020,000 keys
    expect(set.getBucketSize(1)).toBeGreaterThanOrEqual(9_980_000);
    expect(set.getBucketSize(1)).toBeLessThanOrEqual(10_020_000);
  });
});
