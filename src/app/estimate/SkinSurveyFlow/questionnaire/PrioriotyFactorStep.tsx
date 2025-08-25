import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { questions } from '../../../data/form-definition';

interface PrioriotyFactorStepProps {
  data: any;
  onDataChange: (data: any) => void;
}

interface PrioritySelection {
  [itemId: string]: number;
}

const PrioriotyFactorStep: React.FC<PrioriotyFactorStepProps> = ({ data, onDataChange }) => {
  const priorityItems = questions.priorities;
  const [selections, setSelections] = useState<PrioritySelection>({});

  const numbers = [1, 2, 3, 4, 5, 6];

  useEffect(() => {
    if (data.priorityOrder?.prioritySelections) {
      setSelections(data.priorityOrder.prioritySelections);
    }
  }, [data.priorityOrder]);

  const handleCircleClick = (itemId: string, score: number) => {
    let newSelections = { ...selections };

    if (newSelections[itemId] === score) {
      delete newSelections[itemId];
    } else {
      newSelections[itemId] = score;
    }

    setSelections(newSelections);

    const allItemsSelected = priorityItems.every(item => newSelections[item.id] !== undefined);
    
    const priorityOrder = allItemsSelected 
      ? [...priorityItems]
          .map(item => ({ id: item.id, score: newSelections[item.id] }))
          .sort((a, b) => b.score - a.score)
          .map(item => item.id)
      : [];

    onDataChange({
      ...data,
      priorityOrder: {
        isPriorityConfirmed: allItemsSelected,
        priorityOrder: priorityOrder,
        prioritySelections: newSelections
      }
    });
  };

  const isNumberUsed = (number: number) => {
    return Object.values(selections).includes(number);
  };

  const isCircleDisabled = (itemId: string, score: number) => {
    const currentSelection = selections[itemId];
    return currentSelection !== score && isNumberUsed(score);
  };

  const isCircleSelected = (itemId: string, score: number) => {
    return selections[itemId] === score;
  };

  const getSortedSelections = () => {
    if (Object.keys(selections).length === 0) return [];
    
    return [...priorityItems]
      .filter(item => selections[item.id] !== undefined)
      .map(item => ({ ...item, score: selections[item.id] }))
      .sort((a, b) => b.score - a.score);
  };

  const sortedSelections = getSortedSelections();

  return (
    <div className="space-y-6">
      {sortedSelections.length > 0 && (
        <div className="sticky top-16 z-10 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 font-medium">Most Prioritized Items</span>
            <span className="text-gray-600 font-medium">Least Prioritized Items</span>
          </div>
          <div className="flex items-center gap-2 mt-2 overflow-x-auto">
            {sortedSelections.map((item, index) => (
              <div key={item.id} className="flex items-center gap-2 whitespace-nowrap">
                <div className="flex items-center gap-1 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                  <span className="text-xs font-medium text-rose-600">{item.score}</span>
                  <span className="text-sm text-gray-700">{item.label}</span>
                </div>
                {index < sortedSelections.length - 1 && (
                  <div className="text-gray-300">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        {priorityItems.map((item) => (
          <Card key={item.id} className="p-4 bg-white border border-gray-200">
            <div className="flex gap-4">
              <div className="flex-[3] min-w-0 break-words">
                <h3 className="font-medium text-gray-900 mb-1">{item.label}</h3>
                <p className="text-sm text-gray-600 break-words">{item.description}</p>
              </div>
              
              <div className="flex-[2] flex items-center justify-center flex-shrink-0">
                <div className="flex gap-2">
                  {numbers.map((score) => (
                    <div key={score} className="flex flex-col items-center gap-1">
                      <span className="text-xs text-gray-500 font-medium">{score}</span>
                      <button
                        onClick={() => handleCircleClick(item.id, score)}
                        disabled={isCircleDisabled(item.id, score)}
                        className={`
                          w-8 h-8 rounded-full border-2 transition-all duration-200
                          ${isCircleSelected(item.id, score)
                            ? 'bg-rose-500 border-rose-500 text-white'
                            : isCircleDisabled(item.id, score)
                            ? 'border-gray-200 bg-gray-100 cursor-not-allowed opacity-50'
                            : 'border-gray-300 bg-white hover:border-rose-400 hover:bg-rose-50 cursor-pointer'
                          }
                        `}
                      >
                        {isCircleSelected(item.id, score) && (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                          </div>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PrioriotyFactorStep;
