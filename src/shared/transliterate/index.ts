import slugify from "@sindresorhus/slugify";

export function transliterate(value: string): string {
  return slugify(value, {decamelize: true, lowercase: true, preserveLeadingUnderscore: false, separator: `-`});
}
