export function formatTimeRemaining(targetDate, now = new Date()) {
  const diff = targetDate.getTime() - now.getTime();
  const abs = Math.abs(diff);
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (abs < minute) return 'Due now!';

  if (diff > 0) {
    if (abs < hour) {
      const minutes = Math.round(abs / minute);
      return `Due in ${minutes} minute${minutes === 1 ? '' : 's'}`;
    }

    if (abs < day) {
      const hours = Math.round(abs / hour);
      return `Due in ${hours} hour${hours === 1 ? '' : 's'}`;
    }

    const days = Math.round(abs / day);
    if (days === 1) return 'Due tomorrow';
    return `Due in ${days} days`;
  }

  if (abs < hour) {
    const minutes = Math.round(abs / minute);
    return `Overdue by ${minutes} minute${minutes === 1 ? '' : 's'}`;
  }

  if (abs < day) {
    const hours = Math.round(abs / hour);
    return `Overdue by ${hours} hour${hours === 1 ? '' : 's'}`;
  }

  const days = Math.round(abs / day);
  return `Overdue by ${days} day${days === 1 ? '' : 's'}`;
}
