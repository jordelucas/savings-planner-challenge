export function sortParticipationByPercentage(a, b) {
  if (a.percentage < b.percentage) return 1;
  if (a.percentage > b.percentage) return -1;

  return 0;
}