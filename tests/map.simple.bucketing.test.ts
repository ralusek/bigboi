import { BigBoiMapSimple } from '../dist';

describe('BigBoiMapSimple bucketing functionality', () => {
  it('should correctly bucket serial keys into the buckets', async () => {
    const map = new BigBoiMapSimple();
    for (let i = 0; i < 20_000_000; i++) {
      if (i % 1_000_000 === 0) console.log('Adding items', i, 'of 20,000,000');
      map.set(i.toString(), i);
    }

    expect(map.getBucketSize(0)).toEqual(2 ** 24);
    expect(map.getBucketSize(1)).toEqual(20_000_000 - (2 ** 24));
  });
});
