import { type ClassValue, clsx } from "clsx"
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { es } from "date-fns/locale";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function convertAmountToMiliunits(amount: number) {
  
  const newAmount = amount * 1000;

  console.log(newAmount)
  
  return newAmount;

}

export function convertAmountFromMiliunits(amount: number) {
  return amount / 1000
};

export function formatCurrency(value: number) {
  return Intl.NumberFormat("en-US",{
    style: 'currency',
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value)
}

export function calculatePercentageChange(
  current: number,
  previous: number,
){
  
  if(previous === 0) {
    return previous === current ? 0 : 100;
  }

  return ((current - previous) / previous) * 100;

}


export function fillMissingDays(
  activeDays: {
    date: Date,
    income: number,
    expenses: number,
  }[],
  startDate: Date,
  endDate: Date,
){

  const allDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  })

  const transactionsByDay = allDays.map((day) => {

    const found = activeDays.find((d) => isSameDay(d.date, day));

    if(found) {
      return found
    } else {
      return {
        date: day,
        income: 0, 
        expenses: 0
      }
    }
  });

  return transactionsByDay;

}

type Period = {
  from: string | Date | undefined;
  to: string | Date | undefined;
}

export function formatDateRange(period?: Period) {
  const defaultTo = new Date();
  const defaultFrom = subDays(defaultTo, 30);
  const locale = es;

  if(!period?.from) {
    return `${format(defaultFrom, "LLL dd", {locale})} - ${format(defaultTo, "LLL dd, y", {locale})}`
  }

  if(period.to) {
    return `${format(period.from, "LLL dd")} - ${format(period.to, "LLL dd, y", {locale})}`
  }

  return format(period.from, "LLL dd, y", {locale});
}

export function formatPercentage(
  value: number,
  options: {addPrefix?: boolean} = {
    addPrefix: false,
  }
) {
  const result = new Intl.NumberFormat("en-US", {
    style: "percent",
  }).format(value/100);

  if(options.addPrefix && value > 0) {
    return `+${result}`
  } 

  return result;
}