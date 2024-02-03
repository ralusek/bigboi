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


# Simple vs Hashed
There are 2 variants of the `Set` and `Map` available.

```typescript
import {
  BigBoiSetSimple,
  BigBoiMapSimple,
  BigBoiSetHashed,
  BigBoiMapHashed,
}
```

## Simple:
The Simple variants will simply push items into a Set/Map until there is no room, then move onto the next one, and so on. The lookup process is naive, and will simply go through the buckets of items to check if a given key is present. This means that any given lookup has a worst case of `(total items) / (2 ^ 24)`. Bear in mind, lookups happen on reads/checks, but also on insertions, as we don't want to add the same item to multiple different buckets.

### Simple Pros:
- Preserves insertion order
- Don't have to specify item count ahead of time
- Despite being naive, is actually faster up until ~500 million items
- Keys can be any keys used in native JS `Map` or `Set`

### Simple Cons:
- Reads/writes slow down exponentially, but again, this only starts to penalize after ~500 million items

## Hashed:
The Hashed variants will hash the keys and get a deterministic and uniformly distributed bucket assignment for each item. This means that there is O(1) reads and writes, allowing this solution to scale to an arbitrarily high number of items limited only by the available memory in the runtime environment.

### Hashed Pros:
- O(1) reads and writes allowing performant scaling to arbitrary size.

### Hashed Cons:
- The hashing of keys is computationally intensive. Because of this, despite being a scalable solution, up until ~500 million items, this implementation is slower
- Only string keys
- No insertion order preserved


```typescript
const bigSet = new BigBoiSetSimple();

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
const bigMap = new BigBoiMapSimple();

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


# Contributing
We welcome contributions! Please see our contributing guidelines for more information.

# License
MIT
