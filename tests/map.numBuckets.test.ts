import { BigBoiMap } from '../dist';

const MAX_KEY_COUNT = 2 ** 24;

describe('BigBoiMap numBuckets functionality', () => {
  it('should correctly determine the number of buckets based off of the max number of keys', async () => {
    const map1 = new BigBoiMap({ maxKeys: 2 ** 25 });
    expect(map1.numBuckets).toBe(2);
    
    const map2 = new BigBoiMap({ maxKeys: MAX_KEY_COUNT * 2 });
    expect(map2.numBuckets).toBe(2);

    const map3 = new BigBoiMap({ maxKeys: (MAX_KEY_COUNT * 2) + 1 });
    expect(map3.numBuckets).toBe(3);

    const map4 = new BigBoiMap({ maxKeys: (MAX_KEY_COUNT * 3) + 1 });
    expect(map4.numBuckets).toBe(4);
  });

  it('should give a console warning if the max number of keys is less than the max number of unique keys allowed in a Map', async () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const map = new BigBoiMap({ maxKeys: MAX_KEY_COUNT });
    expect(warnSpy).toHaveBeenCalledWith('maxKeys is less than the max number of unique keys allowed in a Map. Consider using a regular Map instead.');
    warnSpy.mockRestore();
  });

  it('should error if the max number of keys is greater than Number.MAX_SAFE_INTEGER', async () => {
    expect(() => new BigBoiMap({ maxKeys: Number.MAX_SAFE_INTEGER + 1 })).toThrow('maxKeys must be less than Number.MAX_SAFE_INTEGER.');
  });

  // This will be a test to uncomment in future times with beefier rigs. I set node --max-old-space-size=8192 and it
  // ran out of memory after creating about 50,000,000 buckets. If we went all the way up to MAX_SAFE_INTEGER, we'd have
  // to create 536,870,912 buckets. So extrapolating, we'd need ~80GB of memory to create a BigBoiMap with MAX_SAFE_INTEGER
  // keys.
  // it('should be okay if the max number of keys is equal to Number.MAX_SAFE_INTEGER', async () => {
  //   expect(() => new BigBoiMap({ maxKeys: Number.MAX_SAFE_INTEGER })).not.toThrow();
  // });
});
