import type { ReactNode } from "react";

export function highlightTextPhrase(
  text: string,
  phrase: string | RegExp,
  className = "text-zen-crimson",
): ReactNode {
  if (typeof phrase === "string") {
    const index = text.toLowerCase().indexOf(phrase.toLowerCase());
    if (index === -1) return text;
    return (
      <>
        {text.slice(0, index)}
        <span className={className}>{text.slice(index, index + phrase.length)}</span>
        {text.slice(index + phrase.length)}
      </>
    );
  }

  const match = phrase.exec(text);
  if (!match || match.index === undefined) return text;

  const start = match.index;
  const matched = match[0];
  return (
    <>
      {text.slice(0, start)}
      <span className={className}>{matched}</span>
      {text.slice(start + matched.length)}
    </>
  );
}
