import type { Category, Tag } from "../../features/taxonomy/types/taxonomy";

type ContentTaxonomyProps = {
  category: Category | null;
  tags: Tag[];
};

export function ContentTaxonomy({ category, tags }: ContentTaxonomyProps) {
  if (!category && tags.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      {category && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-tertiary-500">
            Category
          </p>

          <p className="mt-2 font-medium">{category.title}</p>
        </div>
      )}

      {tags.length > 0 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-tertiary-500">
            Tags
          </p>

          <ul className="mt-2 flex flex-wrap gap-2" aria-label="Content tags">
            {tags.map((tag) => (
              <li
                key={tag._id}
                className="border border-tertiary-300 px-3 py-1 text-sm"
              >
                {tag.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
