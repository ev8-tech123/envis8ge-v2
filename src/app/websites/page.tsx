import { Check } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";

import { FadeIn } from "@/components/motion/fade-in";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { Section } from "@/components/layout/section";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import { FaqDetails } from "./_components/faq-details";
import { RichText } from "./_components/rich-text";
import { TestimonialMarquee } from "./_components/testimonial-marquee";
import { WebsiteInquiryForm } from "./_components/website-inquiry-form";
import { websitesContent as c } from "./_data/content";

export const metadata: Metadata = {
  title: { absolute: c.meta.title },
  description: c.meta.description,
  alternates: { canonical: "/websites" },
  openGraph: {
    type: "website",
    title: c.meta.title,
    description: c.meta.description,
    url: `${siteConfig.url}/websites`,
    siteName: siteConfig.name,
    locale: "en_SG",
  },
  twitter: {
    card: "summary",
    title: c.meta.title,
    description: c.meta.description,
  },
};

const headingClass =
  "font-heading text-foreground tablet:text-4xl text-3xl font-bold";

/**
 * Website Development page. Content and section order follow
 * https://shawnyeodigital.com/websites/ word for word (see ./_data);
 * the visual design uses the existing Envis8ge components only.
 */
export default function WebsitesPage() {
  return (
    <>
      {/* Hero: same black band + skyline photo as the homepage hero */}
      <section className="tablet:py-28 desktop:py-32 relative overflow-hidden bg-black py-24">
        <ParallaxImage
          src="/images/backgrounds/hero-skyline.webp"
          alt=""
          priority
          className="object-cover opacity-50"
        />
        <div className="tablet:px-6 relative mx-auto w-full max-w-[1200px] px-4">
          <FadeIn className="text-center">
            <span className="text-primary text-sm font-semibold tracking-wide uppercase">
              {c.hero.eyebrow}
            </span>
            <h1 className="font-heading tablet:text-6xl desktop:text-7xl mx-auto mt-4 max-w-4xl text-4xl font-bold text-white">
              {c.hero.titleLine1}
              <br />
              <span className="text-primary">{c.hero.titleLine2}</span>
            </h1>
            <p className="tablet:text-lg mx-auto mt-6 max-w-3xl text-base text-white/90">
              {c.hero.lines[0]}
              <br />
              {c.hero.lines[1]}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {c.hero.ctas.map((cta, i) => (
                <a
                  key={cta.href}
                  href={cta.href}
                  {...(cta.newTab
                    ? { target: "_blank", rel: "noopener" }
                    : undefined)}
                  className={cn(
                    buttonVariants({
                      size: "lg",
                      variant: i === 0 ? "primary" : "outline",
                    }),
                    i > 0 && "text-white hover:bg-white/10"
                  )}
                >
                  {cta.label}
                </a>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Built by Envis8ge */}
      <Section background="muted" className="tablet:py-10 desktop:py-12 py-10">
        <div className="tablet:flex-row tablet:text-left flex flex-col items-center justify-center gap-6 text-center">
          <a href={c.builtBy.href} rel="noopener" className="shrink-0">
            <Image
              src="/images/logo/envis8ge-logo-new.png"
              alt={c.builtBy.logoAlt}
              width={180}
              height={48}
              className="h-10 w-auto"
            />
          </a>
          <p className="text-muted-foreground max-w-2xl">
            <RichText parts={c.builtBy.text} />
          </p>
        </div>
      </Section>

      {/* Why a website */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className={headingClass}>{c.why.heading}</h2>
          <p className="text-muted-foreground mt-3">{c.why.intro}</p>
        </div>
        <div className="tablet:grid-cols-2 desktop:grid-cols-3 mt-10 grid grid-cols-1 gap-6">
          {c.why.items.map((item) => (
            <Card
              key={item.title}
              className="border-primary/0 hover:border-primary h-full border transition-[box-shadow,border-color] duration-[220ms] hover:shadow-lg"
            >
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* What you get + price */}
      <Section background="tint">
        <div className="desktop:grid-cols-[1fr_380px] grid grid-cols-1 items-start gap-10">
          <div>
            <h2 className={headingClass}>{c.included.heading}</h2>
            <dl className="tablet:grid-cols-2 mt-8 grid grid-cols-1 gap-6">
              {c.included.items.map((item) => (
                <div key={item.title} className="flex gap-3">
                  <Check
                    aria-hidden
                    className="text-primary-text mt-0.5 size-5 shrink-0"
                  />
                  <div>
                    <dt className="font-heading text-foreground font-semibold">
                      {item.title}
                    </dt>
                    <dd className="text-muted-foreground mt-1 text-sm">
                      {item.description}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>

          <aside
            aria-label="Price"
            className="border-primary rounded-md border-2 bg-white p-8 shadow-lg"
          >
            <span className="text-muted-foreground text-sm font-medium">
              {c.included.price.label}
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <strong className="font-heading text-foreground text-5xl font-bold">
                {c.included.price.amount}
              </strong>
              <span className="text-muted-foreground">
                {c.included.price.unit}
              </span>
            </div>
            <ul className="mt-6 space-y-3">
              {c.included.price.points.map((point) => (
                <li key={point} className="flex gap-2 text-sm">
                  <Check
                    aria-hidden
                    className="text-primary-text mt-0.5 size-4 shrink-0"
                  />
                  {point}
                </li>
              ))}
            </ul>
            <a
              href={c.included.price.cta.href}
              className={cn(buttonVariants({ size: "lg" }), "mt-8 w-full")}
            >
              {c.included.price.cta.label}
            </a>
            <p className="text-muted-foreground mt-4 text-xs leading-relaxed">
              {c.included.price.note}
            </p>
          </aside>
        </div>
      </Section>

      {/* How it works */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className={headingClass}>{c.steps.heading}</h2>
          <p className="text-muted-foreground mt-3">{c.steps.intro}</p>
        </div>
        <ol className="tablet:grid-cols-2 desktop:grid-cols-4 mt-10 grid grid-cols-1 gap-6">
          {c.steps.items.map((step) => (
            <li key={step.number}>
              <Card className="h-full p-6">
                <span className="bg-primary text-primary-foreground font-heading flex size-10 items-center justify-center rounded-full font-bold">
                  {step.number}
                </span>
                <h3 className="font-heading text-foreground mt-4 text-lg font-semibold">
                  {step.title}
                </h3>
                <p className="text-muted-foreground mt-2 text-sm">
                  {step.description}
                </p>
              </Card>
            </li>
          ))}
        </ol>
      </Section>

      {/* Website samples */}
      <Section background="muted">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className={headingClass}>{c.samples.heading}</h2>
          <p className="text-muted-foreground mt-3">{c.samples.intro}</p>
        </div>
        <div className="tablet:grid-cols-2 desktop:grid-cols-3 mt-10 grid grid-cols-1 gap-6">
          {c.samples.items.map((sample) => (
            <a
              key={sample.href}
              href={sample.href}
              target="_blank"
              rel="noopener"
              className="group block h-full"
            >
              <Card className="border-primary/0 group-hover:border-primary h-full overflow-hidden border transition-[box-shadow,border-color] duration-[220ms] group-hover:shadow-lg">
                <div className="aspect-[16/10] overflow-hidden bg-neutral-200">
                  {/* eslint-disable-next-line @next/next/no-img-element -- remote sample thumbnail, same source as the reference page */}
                  <img
                    src={sample.image}
                    alt=""
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-foreground text-lg font-semibold">
                    {sample.title}
                  </h3>
                  <p className="text-muted-foreground mt-1 text-sm">
                    {sample.greatFor}
                  </p>
                  <span className="text-primary-text mt-4 inline-block text-sm font-semibold">
                    {sample.linkLabel}
                  </span>
                </div>
              </Card>
            </a>
          ))}
        </div>
        <p className="mt-10 text-center">
          <a
            href={c.samples.more.href}
            target="_blank"
            rel="noopener"
            className={buttonVariants({ variant: "outline" })}
          >
            {c.samples.more.label}
          </a>
        </p>
      </Section>

      {/* Testimonials */}
      <Section aria-label="Client testimonials" container={false}>
        <div className="tablet:px-6 mx-auto max-w-3xl px-4 text-center">
          <h2 className={headingClass}>{c.testimonials.heading}</h2>
          <p className="text-muted-foreground mt-3">{c.testimonials.intro}</p>
        </div>
        <div className="mt-10">
          <TestimonialMarquee items={c.testimonials.items} />
        </div>
      </Section>

      {/* FAQ */}
      <Section background="muted">
        <div className="mx-auto max-w-2xl">
          <h2 className={cn(headingClass, "text-center")}>{c.faq.heading}</h2>
          <div className="mt-8">
            <FaqDetails items={c.faq.items} />
          </div>
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" aria-label="Contact" className="scroll-mt-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className={headingClass}>{c.contact.heading}</h2>
          <p className="text-muted-foreground mt-3">{c.contact.intro}</p>
        </div>
        <div className="mx-auto mt-10 max-w-3xl">
          <WebsiteInquiryForm />
        </div>
      </Section>
    </>
  );
}
