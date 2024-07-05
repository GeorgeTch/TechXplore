export default function betweenWeeks(
  dateToCheck: Date,
  startingDate: number,
  endingDate: number
) {
  const today = new Date();

  const startingTargetDate = new Date(today);
  startingTargetDate.setDate(startingTargetDate.getDate() - startingDate);

  const endingTargetDate = new Date(today);
  endingTargetDate.setDate(endingTargetDate.getDate() - endingDate);

  return dateToCheck >= startingTargetDate && dateToCheck <= endingTargetDate;
}
