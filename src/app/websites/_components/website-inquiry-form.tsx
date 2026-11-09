"use client";

import { CheckCircle2, Loader2, Send, XCircle } from "lucide-react";
import { useState } from "react";

import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { websitesContent } from "../_data/content";

const form = websitesContent.contact;

type Field = "name" | "email" | "phone" | "company" | "goal" | "message";
type Values = Record<Field, string>;
type Status = "idle" | "loading" | "success" | "error";

const initialValues: Values = {
  name: "",
  email: "",
  phone: "",
  company: "",
  goal: form.goalDefault,
  message: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Same field styling as the Contact Us form (contact-us/_components).
const inputClass =
  "mt-1.5 w-full rounded-sm border border-neutral-300 bg-white px-4 py-3 text-base text-foreground placeholder:text-neutral-400 focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60";
const labelClass = "text-foreground text-sm font-medium";
const errorClass = "text-error mt-1 text-xs";

/**
 * Inquiry form for the Website Development page. Posts to
 * /api/website-inquiry, which only emails the submission to the team;
 * no contact is saved and no automation or newsletter is triggered.
 */
export function WebsiteInquiryForm() {
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function update(key: Field, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): boolean {
    const next: Partial<Record<Field, string>> = {};
    for (const key of Object.keys(values) as Field[]) {
      if (!values[key].trim()) next[key] = `${form.labels[key]} is required.`;
    }
    if (values.email.trim() && !EMAIL_PATTERN.test(values.email.trim())) {
      next.email = "Enter a valid email address.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading" || !validate()) return;

    setStatus("loading");
    setErrorMessage("");
    try {
      const response = await fetch("/api/website-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(
          data?.error ?? "Something went wrong. Please try again."
        );
      }
      setStatus("success");
      setValues(initialValues);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong sending your message. Please try again."
      );
    }
  }

  if (status === "success") {
    return (
      <FadeIn className="flex flex-col items-center gap-3 rounded-md border border-neutral-200 bg-white p-10 text-center">
        <CheckCircle2 aria-hidden className="text-success size-10" />
        <h3 className="font-heading text-foreground text-xl font-semibold">
          Message sent
        </h3>
        <p className="text-muted-foreground max-w-sm text-sm">
          Thanks for reaching out — we&apos;ve received your details and will
          get back to you soon.
        </p>
        <Button
          type="button"
          variant="outline"
          onClick={() => setStatus("idle")}
        >
          Send another message
        </Button>
      </FadeIn>
    );
  }

  const disabled = status === "loading";
  const fieldProps = (key: Field) => ({
    id: key,
    name: key,
    required: true,
    disabled,
    value: values[key],
    "aria-invalid": !!errors[key],
    "aria-describedby": errors[key] ? `${key}-error` : undefined,
  });
  const fieldError = (key: Field) =>
    errors[key] ? (
      <p id={`${key}-error`} className={errorClass}>
        {errors[key]}
      </p>
    ) : null;

  return (
    <FadeIn>
      <form
        onSubmit={handleSubmit}
        noValidate
        aria-busy={disabled}
        className="flex flex-col gap-5 rounded-md border border-neutral-200 bg-white p-8"
      >
        <div className="tablet:grid-cols-2 grid gap-5">
          <div>
            <label htmlFor="name" className={labelClass}>
              {form.labels.name}
            </label>
            <input
              {...fieldProps("name")}
              type="text"
              autoComplete="name"
              onChange={(e) => update("name", e.target.value)}
              className={inputClass}
            />
            {fieldError("name")}
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>
              {form.labels.email}
            </label>
            <input
              {...fieldProps("email")}
              type="email"
              autoComplete="email"
              onChange={(e) => update("email", e.target.value)}
              className={inputClass}
            />
            {fieldError("email")}
          </div>
          <div>
            <label htmlFor="phone" className={labelClass}>
              {form.labels.phone}
            </label>
            <input
              {...fieldProps("phone")}
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              placeholder={form.phonePlaceholder}
              onChange={(e) => update("phone", e.target.value)}
              className={inputClass}
            />
            {fieldError("phone")}
          </div>
          <div>
            <label htmlFor="company" className={labelClass}>
              {form.labels.company}
            </label>
            <input
              {...fieldProps("company")}
              type="text"
              autoComplete="organization"
              onChange={(e) => update("company", e.target.value)}
              className={inputClass}
            />
            {fieldError("company")}
          </div>
        </div>

        <div>
          <label htmlFor="goal" className={labelClass}>
            {form.labels.goal}
          </label>
          <select
            {...fieldProps("goal")}
            onChange={(e) => update("goal", e.target.value)}
            className={inputClass}
          >
            <option value="" disabled>
              {form.goalPlaceholder}
            </option>
            {form.goalOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {fieldError("goal")}
        </div>

        <div>
          <label htmlFor="message" className={labelClass}>
            {form.labels.message}
          </label>
          <textarea
            {...fieldProps("message")}
            rows={4}
            onChange={(e) => update("message", e.target.value)}
            className={cn(inputClass, "resize-y")}
          />
          {fieldError("message")}
        </div>

        {status === "error" && (
          <div
            role="alert"
            className="bg-error/10 text-error flex items-center gap-2 rounded-sm p-3 text-sm"
          >
            <XCircle aria-hidden className="size-4 shrink-0" />
            {errorMessage}
          </div>
        )}

        <Button type="submit" size="lg" disabled={disabled} className="w-full">
          {disabled ? (
            <Loader2 aria-hidden className="size-4 animate-spin" />
          ) : (
            <Send aria-hidden className="size-4" />
          )}
          {form.submitLabel}
        </Button>

        <p className="text-muted-foreground text-xs leading-relaxed">
          {form.notice}
        </p>
      </form>
    </FadeIn>
  );
}
