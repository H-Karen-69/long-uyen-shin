import { parse, isAfter, isBefore, addYears, differenceInDays, isSameDay } from 'date-fns';

export function getNextBirthday(birthdayString: string) {
  if (!birthdayString) return null;
  const today = new Date();
  
  // Format is DD/MM. Parse using current year first.
  let bday = parse(birthdayString, 'dd/MM', new Date());
  
  // If the birthday this year has already passed, next birthday is next year
  if (isBefore(bday, today) && !isSameDay(bday, today)) {
    bday = addYears(bday, 1);
  }
  
  return bday;
}

export function isBirthdayToday(birthdayString: string) {
  if (!birthdayString) return false;
  const bday = parse(birthdayString, 'dd/MM', new Date());
  return isSameDay(bday, new Date());
}

export function getDaysUntilBirthday(birthdayString: string) {
  if (!birthdayString) return -1;
  const nextBday = getNextBirthday(birthdayString);
  if (!nextBday) return -1;
  const today = new Date();
  // Reset time to start of day for accurate day difference
  today.setHours(0, 0, 0, 0);
  nextBday.setHours(0, 0, 0, 0);
  return differenceInDays(nextBday, today);
}
