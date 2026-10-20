import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

import type { Article } from "../_data/types";
import { BlogCard } from "./blog-card";

/**
 * Blog Plan Sections 3.7 (Related Articles) and 3.9 (Previous/Next) —
 * both were explicit placeholders until a second article existed
 * (docs/06-blog-plan.md Section 11). Now that Blog Post #2 is published,
 * this renders the real thing: array-order previous/next (same pattern
 * as the Portfolio case study nav) and up to 3 related articles from the
 * same category, falling back to any other published article.
 */
export function ArticleNav({
  previous,
  next,
}: {
  previous: Article | null;
  next: Article | null;
}) {
  if (!previous && !next) return null;

  return (
    <div className="tablet:grid-cols-2 grid grid-cols-1 gap-4 border-t border-neutral-200 pt-8">
      {previous ? (
        <Link
          href={`/blog/${previous.slug}`}
          className="group hover:border-primary flex items-center gap-3 rounded-md border border-neutral-200 p-4 transition-colors duration-150"
        >
          <ArrowLeft
            aria-hidden
            className="text-muted-foreground group-hover:text-primary-text size-4 shrink-0 transition-transform duration-150 group-hover:-translate-x-1"
          />
          <div>
            <span className="text-muted-foreground block text-xs">
              Previous
            </span>
            <span className="font-heading text-foreground text-sm font-semibold">
              {previous.title}
            </span>
          </div>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link
          href={`/blog/${next.slug}`}
          className="group hover:border-primary flex items-center justify-end gap-3 rounded-md border border-neutral-200 p-4 text-right transition-colors duration-150"
        >
          <div>
            <span className="text-muted-foreground block text-xs">Next</span>
            <span className="font-heading text-foreground text-sm font-semibold">
              {next.title}
            </span>
          </div>
          <ArrowRight
            aria-hidden
            className="text-muted-foreground group-hover:text-primary-text size-4 shrink-0 transition-transform duration-150 group-hover:translate-x-1"
          />
        </Link>
      )}
    </div>
  );
}

/**
 * The article's own internal links from the manuscript, already filtered
 * to destinations that are live (see [slug]/page.tsx).
 */
export function FurtherReading({
  links,
}: {
  links: { label: string; href: string }[];
}) {
  if (links.length === 0) return null;

  return (
    <div className="border-t border-neutral-200 pt-8">
      <h2 className="font-heading text-foreground text-lg font-semibold">
        Further Reading
      </h2>
      <ul className="mt-4 flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group text-foreground hover:text-primary-text inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-150"
            >
              <ArrowRight
                aria-hidden
                className="text-muted-foreground group-hover:text-primary-text size-4 shrink-0 transition-transform duration-150 group-hover:translate-x-1"
              />
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function RelatedArticles({
  articles,
  readingTimes,
}: {
  articles: Article[];
  readingTimes: Record<string, number>;
}) {
  if (articles.length === 0) return null;

  return (
    <div className="border-t border-neutral-200 pt-8">
      <h2 className="font-heading text-foreground text-lg font-semibold">
        Related Articles
      </h2>
      <div className="tablet:grid-cols-2 desktop:grid-cols-3 mt-6 grid grid-cols-1 gap-6">
        {articles.map((article) => (
          <BlogCard
            key={article.slug}
            article={article}
            readingMinutes={readingTimes[article.slug]}
          />
        ))}
      </div>
    </div>
  );
}
