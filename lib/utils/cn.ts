/* Class name utility — merge Tailwind classes safely */

type ClassValue = string | undefined | null | false | ClassValue[]

export function cn(...inputs: ClassValue[]): string {
  return inputs
    .flat(Infinity as 10)
    .filter(Boolean)
    .join(' ')
    .trim()
}
