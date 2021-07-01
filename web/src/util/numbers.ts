// Utilities to work with FixedNumber, because it seems hard to do it directly.
import { utils, FixedNumber, BigNumber } from 'ethers';

export function fixedNum(n: number): FixedNumber {
  // This is the best way I could find, passing in number directly seems to always gives "underflow" error
  return FixedNumber.from(reduceDecimalString(n.toString(), 18));
}

function reduceDecimalString(value: string, decimals: number): string {
  const parts = value.split('.');
  if (parts.length === 1 || parts[1].length <= decimals) {
    return value;
  }
  return parts[0] + '.' + parts[1].substr(0, decimals);
}

export function compareFixed(a: FixedNumber, b: FixedNumber): number {
  const bn1 = fixedToBigNumber(a, 18);
  const bn2 = fixedToBigNumber(b, 18);
  if (bn1.gt(bn2)) {
    return 1;
  } else if (bn1.eq(bn2)) {
    return 0;
  } else {
    return -1;
  }
}

export function reduceDecimals(n: FixedNumber, decimals: number): FixedNumber {
  const stringRep = n.toString();
  return FixedNumber.fromString(reduceDecimalString(stringRep, decimals), decimals);
}

export function fixedToBigNumber(n: FixedNumber, decimals: number): BigNumber {
  return utils.parseUnits(n.toString(), decimals);
}
