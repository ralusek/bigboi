import { BigBoiMapHashed } from '../dist';

describe('BigBoiMapHashed bucketing functionality', () => {
  it('should correctly bucket serial keys into the buckets', async () => {
    const map = new BigBoiMapHashed({ maxKeys: 20_000_000 });
    expect(map.numBuckets).toBe(2);
    for (let i = 0; i < 20_000_000; i++) {
      if (i % 1_000_000 === 0) console.log('Adding items', i, 'of 20,000,000');
      map.set(i.toString(), i);
    }

    // Expect bucket 0 to have between 9,980,000 and 10,020,000 keys
    expect(map.getBucketSize(0)).toBeGreaterThanOrEqual(9_980_000);
    expect(map.getBucketSize(0)).toBeLessThanOrEqual(10_020_000);

    // Expect bucket 1 to have between 9,980,000 and 10,020,000 keys
    expect(map.getBucketSize(1)).toBeGreaterThanOrEqual(9_980_000);
    expect(map.getBucketSize(1)).toBeLessThanOrEqual(10_020_000);
  });

  it('should correctly bucket random keys into the buckets', async () => {
    const map = new BigBoiMapHashed({ maxKeys: 20_000_000 });
    expect(map.numBuckets).toBe(2);
    for (let i = 0; i < 20_000_000; i++) {
      if (i % 1_000_000 === 0) console.log('Adding items', i, 'of 20,000,000');
      map.set(Math.random().toString(), i);
    }

    // Expect bucket 0 to have between 9,980,000 and 10,020,000 keys
    expect(map.getBucketSize(0)).toBeGreaterThanOrEqual(9_980_000);
    expect(map.getBucketSize(0)).toBeLessThanOrEqual(10_020_000);

    // Expect bucket 1 to have between 9,980,000 and 10,020,000 keys
    expect(map.getBucketSize(1)).toBeGreaterThanOrEqual(9_980_000);
    expect(map.getBucketSize(1)).toBeLessThanOrEqual(10_020_000);
  });
});
