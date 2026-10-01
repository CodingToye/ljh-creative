import { Link } from "react-router";

import ArticleCard from "./ArticleCard";
import type { ArticleSummary } from "./types/article";

export type LatestArticlesProps = {
  articles: ArticleSummary[];
  // Compact is the slimmed-down version: no intro or "explore" link, four smaller cards per row
  variant?: "default" | "compact";
};

export function LatestArticles({
  articles,
  variant = "default",
}: LatestArticlesProps) {
  if (variant === "compact") {
    return (
      <section className="flex flex-col">
        <header className="mb-8 text-center">
          <h2 className="text-4xl font-heading">Ideas and perspectives</h2>
        </header>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {articles.map((article) => (
            <ArticleCard key={article._id} article={article} variant="compact" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col">
      <header className="mb-8 flex flex-col items-center text-center">
        <h1 className="text-4xl font-heading mb-4">Ideas &amp; Perspectives</h1>
        <p className="max-w-3xl">
          Thoughts on creative leadership, customer experience, AI innovation
          and the systems, processes and frameworks that help designers do their
          best work.
        </p>
      </header>
      <div className="grid grid-cols-1 gap-3">
        {articles.length === 0 ? (
          <p className="mt-10 text-primary-400">
            No thoughts have been selected.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-4">
            {articles.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        )}
        <div className="flex mx-auto pb-4">
          <Link to="/thinking" className="text-primary-500 underline">
            Explore all Thoughts
          </Link>
        </div>
      </div>
    </section>
  );
}
