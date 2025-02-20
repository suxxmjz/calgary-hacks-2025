export function formatAnimalName(animal: string): string {
  return animal
    .replace(/_/g, " ") // Replace underscores with spaces
    .replace(/\b\w/g, (c) => c.toUpperCase()); // Capitalize the first letter of each word
}
