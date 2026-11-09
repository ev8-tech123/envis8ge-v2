import { Star } from "lucide-react";

import { Card } from "@/components/ui/card";

import { RichText } from "./rich-text";
import styles from "./testimonial-marquee.module.css";

interface Testimonial {
  readonly rating: string;
  readonly quote: ReadonlyArray<string | { readonly b: string }>;
  readonly initial: string;
  readonly name: string;
  readonly role: string;
}

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <figure className="w-[320px] shrink-0">
      <Card className="flex h-full flex-col gap-4 p-6">
        <div role="img" aria-label={item.rating} className="flex gap-0.5">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              aria-hidden
              className="fill-primary text-primary size-4"
            />
          ))}
        </div>
        <blockquote className="text-muted-foreground flex-1 text-sm leading-relaxed">
          <RichText parts={item.quote} />
        </blockquote>
        <figcaption className="flex items-center gap-3">
          <span
            aria-hidden
            className="bg-primary-tint text-foreground font-heading flex size-10 shrink-0 items-center justify-center rounded-full font-bold"
          >
            {item.initial}
          </span>
          <span className="flex flex-col">
            <span className="font-heading text-foreground text-sm font-semibold">
              {item.name}
            </span>
            <span className="text-muted-foreground text-xs">{item.role}</span>
          </span>
        </figcaption>
      </Card>
    </figure>
  );
}

/**
 * Continuously scrolling testimonial strip, as on the reference page.
 * The list is rendered twice so the loop is seamless; the copy is hidden
 * from assistive technology. Pauses on hover/focus, and becomes a plain
 * horizontally scrollable row when reduced motion is requested.
 */
export function TestimonialMarquee({
  items,
}: {
  items: ReadonlyArray<Testimonial>;
}) {
  return (
    <div className={styles.viewport}>
      <div className={styles.track}>
        <div className={styles.group}>
          {items.map((item) => (
            <TestimonialCard key={item.name + item.role} item={item} />
          ))}
        </div>
        <div className={styles.group} aria-hidden="true">
          {items.map((item) => (
            <TestimonialCard key={item.name + item.role} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
