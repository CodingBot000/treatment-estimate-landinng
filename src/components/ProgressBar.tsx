import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  percentage: number;
  message: string;
  highlightedText?: string;
}

export default function ProgressBar({ percentage, message, highlightedText }: ProgressBarProps) {
  // Split the message if highlightedText is provided
  const parts = highlightedText
    ? message.split(highlightedText)
    : [message];

  return (
    <div className="w-full py-5 px-4">
      <div className="mb-2 text-base">
        {parts.length > 1 ? (
          <>
            {parts[0]}
            <span className="text-beauty-purple font-medium">{highlightedText}</span>
            {parts[1]}
          </>
        ) : (
          message
        )}
      </div>
      <div className="w-full">
        <Progress value={percentage} className="h-2" />
        <div className="text-right mt-1">
          <span className="text-beauty-purple font-medium">{percentage}%</span>
        </div>
      </div>
    </div>
  );
}
