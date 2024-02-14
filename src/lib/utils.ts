import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractNameFromFilename(filename: string) {
  // Remove the file extension (.pdf) from the filename
  let nameWithoutExtension = filename.replace(".pdf", "");

  // Replace underscores (_) with spaces to separate words
  let nameWithSpaces = nameWithoutExtension.replace(/_/g, " ");

  // Capitalize the first letter of each word
  let capitalizedWords = nameWithSpaces.replace(/\b\w/g, (char) =>
    char.toUpperCase()
  );

  return capitalizedWords;
}
