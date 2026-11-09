import type { Metadata } from "next";

import { FadeIn } from "@/components/motion/fade-in";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { Section } from "@/components/layout/section";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import { samplesContent as c } from "./_data/samples";

// Reference title is "Sample Website Designs | Shawn Yeo"; the brand part
// is supplied by the site-wide "%s | Envis8ge" title template instead.
const title = c.meta.title.replace(/\s*\|\s*Shawn Yeo$/, "");

export const metadata: Metadata = {
  title,
  description: c.meta.description,
  alternates: { canonical: "/landingpagesamples" },
  openGraph: {
    type: "website",
    title,
    description: c.meta.description,
    url: `${siteConfig.url}/landingpagesamples`,
    siteName: siteConfig.name,
    locale: "en_SG",
  },
  twitter: { card: "summary", title, description: c.meta.description },
};

const cardClass =
  "border-primary/0 group-hover:border-primary h-full overflow-hidden border transition-[box-shadow,border-color] duration-[220ms] group-hover:shadow-lg";

/**
 * Website Samples gallery. Content and order follow
 * https://shawnyeodigital.com/landingpagesamples/ word for word (see
 * ./_data); the design uses the existing Envis8ge components. Only each
 * sample’s preview image is a link, to envis8ge.com/landingpagesamples/<theme>/.
 */
export default function LandingPageSamplesPage() {
  return (
    <>
      <section className="tablet:py-24 desktop:py-28 relative overflow-hidden bg-black py-20">
        <ParallaxImage
          src="/images/backgrounds/hero-skyline.webp"
          alt=""
          priority
          className="object-cover opacity-50"
        />
        <div className="tablet:px-6 relative mx-auto w-full max-w-[1200px] px-4">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <span className="text-primary text-sm font-semibold tracking-wide uppercase">
              {c.hero.eyebrow}
            </span>
            <h1 className="font-heading tablet:text-5xl desktop:text-6xl mt-4 text-4xl font-bold text-white">
              {c.hero.heading}
            </h1>
            <p className="tablet:text-lg mt-6 text-base text-white/90">
              {c.hero.intro}
            </p>
          </FadeIn>
        </div>
      </section>

      <Section background="muted">
        <div className="tablet:grid-cols-2 desktop:grid-cols-3 grid grid-cols-1 gap-6">
          {c.entries.map((entry) => {
            if (entry.kind === "callout") {
              return (
                <aside
                  key={entry.heading}
                  aria-label={entry.links[0].label}
                  className="bg-band col-span-full rounded-md p-8 text-center"
                >
                  <h2 className="font-heading text-foreground tablet:text-3xl text-2xl font-bold">
                    {entry.heading}
                  </h2>
                  <p className="text-muted-foreground mx-auto mt-3 max-w-2xl">
                    {entry.text}
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-4">
                    {entry.links.map((link, i) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className={buttonVariants({
                          variant: i === 0 ? "primary" : "outline",
                        })}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </aside>
              );
            }

            if (entry.kind === "custom") {
              return (
                <a
                  key={entry.href}
                  href={entry.href}
                  className="group block h-full"
                >
                  <Card
                    className={cn(
                      cardClass,
                      "flex flex-col items-start border-dashed border-neutral-300 p-6"
                    )}
                  >
                    <span
                      aria-hidden
                      className="bg-primary text-primary-foreground font-heading flex size-12 items-center justify-center rounded-full text-2xl font-bold"
                    >
                      {entry.badge}
                    </span>
                    <span className="text-primary-text mt-6 text-xs font-semibold tracking-wide uppercase">
                      {entry.label}
                    </span>
                    <h3 className="font-heading text-foreground mt-2 text-lg font-semibold">
                      {entry.title}
                    </h3>
                    <p className="text-muted-foreground mt-2 text-sm">
                      {entry.description}
                    </p>
                  </Card>
                </a>
              );
            }

            return (
              <Card key={entry.href} className="h-full overflow-hidden">
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-200">
                  {/* Only the preview image is a link (requested 2026-11-09) */}
                  <a
                    href={entry.href}
                    aria-label={`View sample: ${entry.title}`}
                    className="group focus-visible:ring-ring block size-full focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element -- remote sample thumbnail, same source as the reference page */}
                    <img
                      src={entry.image}
                      alt=""
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </a>
                  {/* Colour swatches, as on the reference: 22px circles,
                      6px apart, 2px white border, 12px from bottom-left.
                      Outside the link, so they are not clickable. */}
                  <span
                    aria-hidden
                    className="absolute bottom-3 left-3 flex gap-1.5"
                  >
                    {entry.swatches.map((color) => (
                      <span
                        key={color}
                        className="size-[22px] rounded-full border-2 border-white shadow-[0_1px_4px_rgba(0,0,0,0.25)]"
                        style={{ background: color }}
                      />
                    ))}
                  </span>
                </div>
                <div className="p-6">
                  <span className="text-primary-text text-xs font-semibold tracking-wide uppercase">
                    {entry.number}
                  </span>
                  <h3 className="font-heading text-foreground mt-1 text-lg font-semibold">
                    {entry.title}
                  </h3>
                  <p className="text-muted-foreground mt-2 text-sm">
                    {entry.description}
                  </p>
                  <p className="text-muted-foreground mt-3 text-sm">
                    <strong className="text-foreground font-semibold">
                      {entry.greatForLabel}
                    </strong>{" "}
                    {entry.greatFor}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </Section>
    </>
  );
}
