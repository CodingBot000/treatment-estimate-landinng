interface SectionTitleProps {
  text: string;
  highlightedText?: string;
}

export default function SectionTitle({ text, highlightedText }: SectionTitleProps) {
  // If no highlightedText, just return the text
  if (!highlightedText) {
    return <h3 className="text-lg font-medium px-4 py-2">{text}</h3>;
  }

  // Split the text by the highlightedText to get parts before and after it
  const parts = text.split(highlightedText);

  return (
    <h3 className="text-lg font-medium px-4 py-2">
      {parts[0]}
      <span className="text-beauty-purple">{highlightedText}</span>
      {parts[1]}
    </h3>
  );
}
