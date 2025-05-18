interface SurveySummaryProps {
    answers: Record<string, any>;
  }
  
  export default function SurveySummary({ answers }: SurveySummaryProps) {
    return (
      <div className="text-sm text-gray-700 space-y-2 bg-white p-3 rounded shadow-sm border">
        <h3 className="text-base font-semibold">Your Status</h3>
        {Object.entries(answers).map(([questionId, value]) => (
          <div key={questionId}>
            <strong className="text-gray-800">{questionId}:</strong>{" "}
            {/* <span className="whitespace-pre-line"> */}
              {Array.isArray(value)
                ? value
                    .map((v) =>
                      typeof v === "object"
                        ? `${v.label}${v.sub ? ` → ${v.sub.join(", ")}` : ""}`
                        : v
                    )
                    .join(", ")
                : typeof value === "object" && value.name
                ? value.name
                : String(value)}
            {/* </span> */}
          </div>
        ))}
      </div>
    );
  }
  