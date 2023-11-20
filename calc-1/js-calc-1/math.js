// --- Math functions
export function getTotalDoughWeight(loafsCount, loafWeight) {
  return loafsCount * loafWeight;
}

export function getTotalFlour(totalDoughWeight, waterPercent, saltPercent) {
  return totalDoughWeight / (1 + waterPercent + saltPercent);
}

export function getTotalWater(totalFlour, waterPercent) {
  return totalFlour * waterPercent;
}

export function getTotalSalt(totalFlour, saltPercent) {
  return totalFlour * saltPercent;
}

export function getLeavenComponents(
  totalFlour,
  prefermentedFlourPercent,
  leavenHydratationPercent
) {
  const obj = {};
  obj.leavenFlour = totalFlour * prefermentedFlourPercent;
  obj.leavenWater = obj.leavenFlour * leavenHydratationPercent;
  obj.leavenTotal = obj.leavenFlour + obj.leavenWater;

  // const obj = {leavenTotal: '', leavenFlour: '', leavenWater: ''};
  return obj;
}

export function getIngredientsForKneading(
  totalFlour,
  totalWater,
  totalSalt,
  leavenFlour,
  leavenWater
) {
  const obj = {};
  obj.flour = totalFlour - leavenFlour;
  obj.water = totalWater - leavenWater;
  obj.salt = totalSalt;

  // const obj = { flour: '', water: '', salt: '' };
  return obj;
}
