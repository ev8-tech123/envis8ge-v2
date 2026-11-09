/** Renders copied text that contains bold runs, written as { b: "..." }. */
export function RichText({
  parts,
}: {
  parts: ReadonlyArray<string | { readonly b: string }>;
}) {
  return (
    <>
      {parts.map((part, i) =>
        typeof part === "string" ? (
          part
        ) : (
          <strong key={i} className="text-foreground font-semibold">
            {part.b}
          </strong>
        )
      )}
    </>
  );
}
