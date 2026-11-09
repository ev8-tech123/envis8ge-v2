import { ChevronDown } from "lucide-react";

/**
 * FAQ list using native <details>/<summary>, as on the reference page,
 * so every answer is in the HTML (search engines, no-JS). Styled to
 * match the shared FaqAccordion (components/ui/faq-accordion.tsx);
 * the first item starts open, like that component.
 */
export function FaqDetails({
  items,
}: {
  items: ReadonlyArray<{ readonly question: string; readonly answer: string }>;
}) {
  return (
    <div className="divide-y divide-neutral-200 border-y border-neutral-200">
      {items.map((item, i) => (
        <details key={item.question} open={i === 0} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left [&::-webkit-details-marker]:hidden">
            <span className="font-heading text-foreground font-semibold">
              {item.question}
            </span>
            <ChevronDown
              aria-hidden
              className="text-muted-foreground size-5 shrink-0 transition-transform duration-[220ms] group-open:rotate-180"
            />
          </summary>
          <p className="text-muted-foreground pb-4 text-sm leading-relaxed">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
