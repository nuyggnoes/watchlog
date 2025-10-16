const BASE_IMAGE_URL = "https://image.tmdb.org/t/p";
const PLACEHOLDER_IMAGE_URL = "/placeholder.svg";

export type ImageSize = "w300" | "w500" | "original";

export function buildImageUrl(
  path: string | null | undefined,
  size: ImageSize = "original",
  fallback: string = PLACEHOLDER_IMAGE_URL
): string {
  if (!path) return fallback;
  return `${BASE_IMAGE_URL}/${size}${path}`;
}
