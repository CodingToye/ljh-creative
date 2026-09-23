import { Link } from "react-router";

import type { HomeContent } from "../home/api/getHomeContent";
import ArticleCard from "./ArticleCard";

export type LatestArticlesProps = {
  articles: HomeContent["latestArticles"];
};

export function LatestArticles({ articles }: LatestArticlesProps) {
  return (
    <section className="flex flex-col">
      <header className="mb-8">
        <h1 className="text-4xl font-serif mb-4">
          Thoughts, Ideas &amp; Perspectives
        </h1>
        <div className="grid grid-cols-3">
          <p>
            Thoughts on creative leadership, customer experience, AI innovation
            and the systems, processes and frameworks that help designers do
            their best work.
          </p>
        </div>
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
