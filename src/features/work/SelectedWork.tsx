import type { SanityImageObject } from "@sanity/image-url";
import { Link } from "react-router";

import { ButtonLink } from "../../components/ui/Button";
import { urlFor } from "../../services/sanity/image";
import type { HomeContent } from "../home/api/getHomeContent";

type SelectedWorkProps = {
  projects: HomeContent["featuredWork"];
};

function getImageUrl(image: SanityImageObject, width: number) {
  return urlFor(image).width(width).auto("format").url();
}

export function SelectedWork({ projects }: SelectedWorkProps) {
  return (
    <div className="flex flex-col">
      <header className="mb-4">
        <h1 className="text-4xl font-serif">Selected Works</h1>
      </header>
      <div className="grid grid-cols-1 gap-3">
        {projects.length === 0 ? (
          <p className="mt-10 text-slate-600">
            No featured projects have been selected.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-4">
            {projects.map((project) => (
              <article key={project._id} className="flex flex-col items-center">
                <div className="px-16 bg-secondary-400 w-full">
                  <Link to={`/work/${project.slug}`} className="group block">
                    {project.heroImage && (
                      <div className="overflow-hidden">
                        <img
                          src={getImageUrl(project.heroImage, 300)}
                          alt={project.heroImage.alt}
                          className="aspect-4/3 w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </Link>
                </div>
                <h3 className="mt-5 text-regular text-primary-500 underline hover:text-primary-400 transition">
                  {project.title} &gt;
                </h3>
              </article>
            ))}
          </div>
        )}
        <div className="flex mx-auto">
          <ButtonLink to="/work" variant="primary">
            Explore all work
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
