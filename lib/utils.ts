import { type ClassValue, clsx } from "clsx"
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