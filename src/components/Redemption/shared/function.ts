export function getExpectedCollateral(
  redemption: number,
  redeemableCandidate: number,
  GRR: number
) {
  const redeemableAmount =
    redemption > redeemableCandidate ? redeemableCandidate : redemption;

  const expectedCollateral = redeemableAmount * ((100 - GRR) / 100);
  return expectedCollateral;
}

export function getExpectedReward(candidateAmount: number, GRR: number) {
  return candidateAmount / (100 - GRR);
}

export function getRedeemableCandidate(
  redeemableCandidate: number,
  rateOfEthJpy: number
): { eth: number; cjpy: number } {
  if (!redeemableCandidate || !rateOfEthJpy) {
    return { eth: 0, cjpy: 0 };
  }

  const valueOfCjpy = redeemableCandidate * rateOfEthJpy;
  return { eth: redeemableCandidate, cjpy: valueOfCjpy };
}

export function getEthFromCjpy(value: number, rateOfEthJpy: number) {
  if (!rateOfEthJpy) {
    return 0;
  }
  const converted = value / rateOfEthJpy;
  return converted;
}
