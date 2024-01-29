export default function findMinExponent(num: number, base: number) {
  if (base <= 1) throw new Error('Base must be greater than 1.');
  if (num <= 0) throw new Error('N must be positive.');

  // Calculate the logarithm of num to the base, i.e. log_base(num),
  // i.e. exponent such that base ** exponent = num
  const exponent = Math.log(num) / Math.log(base);

  // Round up to get the minimum exponent such that base ** exponent >= num
  return Math.ceil(exponent);
}
