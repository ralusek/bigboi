import { BigBoiSetHashed } from '../dist';

function forEachIterable(iterator: IterableIterator<any>, callback: (value: any) => void) {
  while(true) {
    const next = iterator.next();
    if (next.done) break;
    callback(next.value);
  }
}

function generateKey() {
  return Math.random().toString(16).slice(2, 10);
}

function getKeyInt(key: string) {
  return parseInt(key, 16);
}

describe('BigBoiSetHashed using custom getKeyInt', () => {
  it('should be able to use a custom getKeyInt', async () => {
    const KEY_COUNT = 20_000_000;

    const custom = new BigBoiSetHashed<string>({
      maxKeys: KEY_COUNT,
      getKeyInt,
    });

    const standard = new BigBoiSetHashed<string>({
      maxKeys: KEY_COUNT,
    });

    const keys: string[] = [];
    for (let i = 0; i < KEY_COUNT; i++) {
      keys.push(generateKey());
    }
    
    const customStart = Date.now();
    keys.forEach(key => custom.add(key));
    const customTime = Date.now() - customStart;

    const standardStart = Date.now();
    keys.forEach(key => standard.add(key));
    const standardTime = Date.now() - standardStart;

    console.log('Custom getKeyInt', customTime);
    console.log('Standard getKeyInt', standardTime);

    expect(custom.size).toEqual(standard.size);

    expect(customTime).toBeLessThan(standardTime);
  });
});
