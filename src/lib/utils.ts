import clsx, { ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function handleClassNames(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
