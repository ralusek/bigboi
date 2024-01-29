[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ralusek/bigboi/blob/master/LICENSE)
[![npm version](https://img.shields.io/npm/v/bigboi.svg?style=flat)](https://www.npmjs.com/package/bigboi)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/ralusek/bigboi/blob/master/LICENSE)

# BigBoi
JavaScript `Set` and `Map` native utilities have a maximum key size of 2 ^ 24 (16,777,216). `BigBoiSet` and `BigBoiMap` preserve the interface methods of the native `Set` and `Map`, while silently putting the items into bucketed instances of their respective native counterparts. Keys are hashed before bucketing, and therefore do not need to be uniformly distributed in order to be bucketed appropriately.

## Installation
`npm install --save bigboi`
or
`yarn add bigboi`

## Usage
Except for constructor, same interface as `Set` and `Map`

```typescript
const bigSet = new BigBoiSet({
  maxKeys: 500_000_000, // 500 million
});

// Add elements
for (let i = 0; i < 20_000_000; i++) {
  bigSet.add('Hello' + i);
}

// Check if an element exists
bigSet.has('Hello0'); // returns true

// Remove an element
bigSet.delete('Hello0');

// Iterate over elements
bigSet.forEach((value) => {
  console.log(value);
});

// Return iterators
bigSet.entries();
bigSet.keys();
bigSet.values();

// Clear
bigSet.clear();
```

```typescript
const bigMap = new BigBoiMap({
  maxKeys: 500_000_000, // 500 million
});

// Add elements
for (let i = 0; i < 20_000_000; i++) {
  bigMap.add('Hello' + i, i);
}

// Get a value at a given key
bigMap.get('Hello0'); // returns 0

// Check if an element exists
bigMap.has('Hello0'); // returns true

// Remove an element
bigMap.delete('Hello0');

// Iterate over elements
bigMap.forEach((value, key) => {
  console.log(key, value);
});

// Return iterators
bigMap.entries();
bigMap.keys();
bigMap.values();

// Clear
bigMap.clear();
```


## Limitations
- While `Set` and `Map` allow objects as keys, `BigBoiSet` and `BigBoiMap` are exclusively to be keyed with strings.
- While `Set` and `Map` are technically unordered structures, they can be iterated in insertion order. `BigBoiSet` and `BigBoiMap` will not be iterated in insertion order.
- `BigBoiSet` and `BigBoiMap` require you to specify the maximum number of items that will be stored in them, as this will be used to create the appropriate number of buckets
- The maximum number of items cannot exceed `Number.MAX_SAFE_INTEGER` (9,007,199,254,740,991). The number of items is used to calculate the number of buckets needed, and while exceeding this figure can still allow for accurate calculations of such a figure, the lack of guaranteed precision places this as the limit.


# Contributing
We welcome contributions! Please see our contributing guidelines for more information.

# License
MIT
