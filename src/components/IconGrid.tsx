import Image from "next/image";

interface IconItem {
  id: string;
  icon: string;
  label: string;
}

interface IconGridProps {
  items: IconItem[];
  selectedItem?: string;
  onSelect: (id: string) => void;
}

export default function IconGrid({ items, selectedItem, onSelect }: IconGridProps) {
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-4 px-4 py-2">
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => onSelect(item.id)}
          className={`
            rounded-lg p-3 flex flex-col items-center justify-center cursor-pointer transition-all
            ${selectedItem === item.id
              ? 'bg-beauty-purple text-white'
              : 'bg-white hover:bg-gray-50'
            }
          `}
        >
          <div className="h-[72px] w-[72px] flex items-center justify-center mb-2">
            <Image
              src={item.icon}
              alt={`${item.label} icon`}
              width={72}
              height={72}
              className="w-full h-full object-contain"
            />
          </div>
          <div className={`text-sm text-center ${selectedItem === item.id ? 'text-white' : 'text-beauty-darkPurple'}`}>
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
