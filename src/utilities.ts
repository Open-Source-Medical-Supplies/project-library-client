/**
 * Sorts a list of items based on the provided sort option.
 * The items are expected to have properties like `createdAt`, `id` or `slug`, and `isFeatured`.
 */
export const sortItems = <T extends {
  slug?: string;
  createdAt?: string;
  addedOn?: string; 
  isFeatured?: boolean;
  primaryImage?: string;
}>(
  items: T[],
  sortOption: string
): T[] => {
  if (!items) return [];
  return [...items].sort((a, b) => {
    if (!a.primaryImage) {
      return 1;
    }
    // If b.name is null, move it to the end
    if (!b.primaryImage) {
      return -1;
    }

    if (sortOption === 'Most Recent') {
      const aTime = a.addedOn
        ? new Date(a.addedOn).getTime()
        : a.createdAt
        ? new Date(a.createdAt).getTime()
        : Number(a.slug || a.slug) || 0;
      const bTime = b.addedOn
        ? new Date(b.addedOn).getTime()
        : b.createdAt
        ? new Date(b.createdAt).getTime()
        : Number(b.slug || b.slug) || 0;
      return bTime - aTime;
    } else if (sortOption === 'Oldest') {
      const aTime = a.addedOn
        ? new Date(a.addedOn).getTime()
        : a.createdAt
        ? new Date(a.createdAt).getTime()
        : Number(a.slug || a.slug) || 0;
      const bTime = b.addedOn
        ? new Date(b.addedOn).getTime()
        : b.createdAt
        ? new Date(b.createdAt).getTime()
        : Number(b.slug || b.slug) || 0;
      return aTime - bTime;
    } else if (sortOption === 'Featured') {
      const aFeatured = a.isFeatured ? 1 : 0;
      const bFeatured = b.isFeatured ? 1 : 0;
      return bFeatured - aFeatured;
    }

    return 0;
  });
};
