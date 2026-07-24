'use client';

import * as Select from '@radix-ui/react-select';
import css from './CustomSelect.module.css';

interface CustomSelectProps<T extends string | number> {
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  options: T[];
  formatLabel?: (option: T) => string;
}

export default function CustomSelect<T extends string | number>({
  value,
  onValueChange,
  placeholder,
  options,
  formatLabel,
}: CustomSelectProps<T>) {
  return (
    <Select.Root value={value} onValueChange={onValueChange}>
      <Select.Trigger className={css.trigger} aria-label={placeholder}>
        <Select.Value placeholder={placeholder} />
        <Select.Icon className={css.icon}>
          <svg width="16" height="16">
            <use href="/sprite.svg#icon-down" />
          </svg>
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className={css.content}
          position="popper"
          sideOffset={4}
        >
          <Select.Viewport className={css.viewport}>
            {options.map(option => (
              <Select.Item
                key={option}
                value={String(option)}
                className={css.item}
              >
                <Select.ItemText>
                  {formatLabel ? formatLabel(option) : option}
                </Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
