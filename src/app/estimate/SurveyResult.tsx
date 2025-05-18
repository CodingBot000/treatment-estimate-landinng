interface SurveyResultProps {
    answers: Record<string, any>;
  }
  
  export default function SurveyResult({ answers }: SurveyResultProps) {
    return (
      <div className="max-w-md mx-auto p-4 space-y-4">
        <h2 className="text-xl font-bold">선택한 결과</h2>
        {Object.entries(answers).map(([key, value]) => (
          <div key={key} className="border p-3 rounded bg-white shadow-sm">
            <strong>{key}</strong>
            <div className="mt-1 text-sm text-gray-700 whitespace-pre-line">
              {typeof value === "object"
                ? JSON.stringify(value, null, 2)
                : String(value)}
            </div>
          </div>
        ))}
      </div>
    );
  }
  