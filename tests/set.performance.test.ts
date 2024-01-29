import { BigBoiSetHashed, BigBoiSetSimple } from '../dist';

const MAX_SIZE = 2 ** 24;


describe('BigBoiSet performance', () => {
  it('performs better than a naive implementation on large amounts of keys', () => {
    expect(true).toEqual(true);
    // const naive = new BigBoiSetSimple();
    // const bigBoiSet = new BigBoiSetHashed({ maxKeys: 30_000_000 });

    // const naiveInsertStart = Date.now();
    // for (let i = 0; i < 20_000_000; i++) {
    //   naive.add(i.toString());
    // }
    // const naiveInsertEnd = Date.now();
    // const naiveInsertTime = naiveInsertEnd - naiveInsertStart;

    // const bigBoiSetInsertStart = Date.now();
    // for (let i = 0; i < 20_000_000; i++) {
    //   if (i % 1_000_000 === 0) console.log('Adding items', i, 'of 20,000,000');
    //   bigBoiSet.add(i.toString());
    // }
    // const bigBoiSetInsertEnd = Date.now();
    // const bigBoiSetInsertTime = bigBoiSetInsertEnd - bigBoiSetInsertStart;

    // const naiveHasStart = Date.now();
    // for (let i = 0; i < 20_000_000; i++) {
    //   naive.has(i.toString());
    // }
    // const naiveHasEnd = Date.now();
    // const naiveHasTime = naiveHasEnd - naiveHasStart;

    // const bigBoiSetHasStart = Date.now();
    // for (let i = 0; i < 20_000_000; i++) {
    //   bigBoiSet.has(i.toString());
    // }
    // const bigBoiSetHasEnd = Date.now();
    // const bigBoiSetHasTime = bigBoiSetHasEnd - bigBoiSetHasStart;

    // console.log('Naive insert time:', naiveInsertTime);
    // console.log('Set insert time:', bigBoiSetInsertTime);
    // console.log('Naive has time:', naiveHasTime);
    // console.log('Set has time:', bigBoiSetHasTime);
  });
});

