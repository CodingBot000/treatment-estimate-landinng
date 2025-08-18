import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type ChoiceMode = 'single' | 'multi';

interface ChoiceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  selected: boolean;
  mode: ChoiceMode;          // 'single' | 'multi'
  onSelect?: () => void;
  disabled?: boolean;
  // 멀티는 좌측 동그라미 항상 보이도록, 싱글은 기본 false (디자인 가이드에 따라 조절)
  showIndicator?: boolean;   
}

const SelectionDot: React.FC<{ checked: boolean; disabled?: boolean }> = ({ checked, disabled }) => {
  return (
    <span
      aria-hidden
      className={cn(
        'relative flex h-5 w-5 items-center justify-center rounded-full border',
        checked ? 'border-gray-900' : 'border-gray-300',
        disabled && 'opacity-50'
      )}
    >
      <span
        className={cn(
          'h-2.5 w-2.5 rounded-full',
          checked ? 'bg-gray-900' : 'bg-transparent'
        )}
      />
    </span>
  );
};

export const ChoiceCard = React.forwardRef<HTMLDivElement, ChoiceCardProps>(
  ({ title, subtitle, selected, mode, onSelect, disabled, showIndicator, className, children, ...props }, ref) => {
    const role = mode === 'multi' ? 'checkbox' : 'radio';
    const indicatorVisible = showIndicator ?? (mode === 'multi'); // 멀티 기본 표시

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSelect?.();
      }
    };

    return (
      <Card
        ref={ref}
        role={role}
        aria-checked={selected}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : 0}
        onClick={() => !disabled && onSelect?.()}
        onKeyDown={handleKeyDown}
        data-selected={selected ? '' : undefined}
        className={cn(
          // 기존 CardBasic 스타일을 최대한 유지
          'w-82 min-h-16 h-16 py-5 px-4 rounded-lg border cursor-pointer transition-all duration-200',
          'border-gray-300 hover:shadow-md',
          selected && 'ring-2 ring-gray-900/10',
          disabled && 'opacity-60 cursor-not-allowed',
          className
        )}
        style={{ boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderColor: '#E5E7EB' }}
        {...props}
      >
        <div className="flex items-center gap-3">
          {indicatorVisible && <SelectionDot checked={selected} disabled={disabled} />}

          <div className="flex flex-col gap-1">
            <h3
              className="font-medium"
              style={{
                fontFamily: 'Pretendard Variable',
                fontWeight: 500,
                fontSize: '16px',
                lineHeight: '100%',
                color: '#1C1C1C'
              }}
            >
              {title}
            </h3>
            {subtitle && (
              <p
                style={{
                  fontFamily: 'Pretendard Variable',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '120%',
                  color: '#4B5563'
                }}
              >
                {subtitle}
              </p>
            )}
          </div>

          {children}
        </div>
      </Card>
    );
  }
);
ChoiceCard.displayName = 'ChoiceCard';
