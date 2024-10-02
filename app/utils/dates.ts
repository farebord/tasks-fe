export function generateDeadline(): string {
  const now = new Date();

  const randomDays = Math.floor(Math.random() * 6);

  now.setDate(now.getDate() + randomDays);

  const randomHours = Math.floor(Math.random() * 24);
  const randomMinutes = Math.floor(Math.random() * 60);

  now.setHours(randomHours, randomMinutes);

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export function isValidDeadline(deadline: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;

  if (!regex.test(deadline)) {
    return false;
  }

  const [datePart, timePart] = deadline.split(" ");

  const [year, month, day] = datePart.split("-").map(Number);
  const [hours, minutes] = timePart.split(":").map(Number);

  const date = new Date(year, month - 1, day, hours, minutes);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day ||
    date.getHours() !== hours ||
    date.getMinutes() !== minutes
  ) {
    return false;
  }

  return true;
}

export function formatIsoToDeadline(isoDate: string): string | null {
  const date = new Date(isoDate);

  if (isNaN(date.getTime())) {
    return null;
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export function isDateInThePast(date: string) {
  const today = new Date();
  return new Date(date) < today;
}
