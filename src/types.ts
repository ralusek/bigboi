export type Config = {
  // Max number of unique keys
  maxKeys: number;
  // Provide a function which takes a key and returns an integer. Must be deterministic
  // and uniformly distributed, or buckets will not be uniformly distributed.
  getKeyInt?: (key: string) => number;
  disableLogging?: boolean;
};
