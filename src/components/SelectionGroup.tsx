interface SelectionOption {
  id: string;
  label: string;
}

interface SelectionGroupProps {
  options: SelectionOption[];
  selectedOption?: string;         // 단일 선택용
  selectedOptions?: string[];
  multiple?: boolean,
  onSelect: (id: string) => void;
}

export default function SelectionGroup({ options, selectedOption, selectedOptions, multiple = false, onSelect }: SelectionGroupProps) {
  const isSelected = (id: string) => {
    if (multiple) {
        return selectedOptions?.includes(id);
    } else {
      return selectedOption === id;
    }
  }
  return (
    <div className="flex flex-wrap gap-2 px-4 py-2">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => {
              console.log(`Clicked: ${selectedOptions}, ${option.id}`);
              onSelect(option.id)
            }
          }
          className={`
            rounded-full px-5 py-3 font-medium text-sm transition-all
            ${isSelected(option.id)
              ? 'bg-beauty-purple text-white'
              : 'bg-white border border-gray-200 text-beauty-darkPurple'
            }
          `}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
