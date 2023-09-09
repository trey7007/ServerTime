import { type ClassValue, clsx } from "clsx"
import dayjs, { Dayjs } from "dayjs";
import { twMerge } from "tailwind-merge"
 

export function dayjsToString(dayjsdate: Dayjs){
  const hours = dayjsdate.hour()
  const minutes = dayjsdate.minute()
  return `${hours}:${minutes.toString().padStart(2, '0')}`;
}

export function TimeToDayjs(timestring: string){

  const res = "2000-01-01T" + timestring
  return dayjs(res)
}
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateString(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString(undefined, options);

  const time = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${time} - ${formattedDate}`;
}


export async function getSequenceNextValue(seqName: string) {



}