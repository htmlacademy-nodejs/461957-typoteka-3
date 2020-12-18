export function convertCategoriesToArray(categories: Record<string, `on`>): string[] {
  return Object.keys(categories);
}
