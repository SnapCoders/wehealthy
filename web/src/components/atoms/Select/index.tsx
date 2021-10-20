import React, {
  ChangeEvent,
  ComponentType,
  SelectHTMLAttributes,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiChevronUp, FiChevronDown, FiSearch, FiX } from 'react-icons/fi';

import { useClickAway } from '@hooks/useClickAway';
import { useUnform } from '@hooks/useUnform';

import {
  Container,
  LabelContainer,
  OptionsContainer,
  Option,
  IconContainer,
  SelectedOptions,
  MoreOfDisplay,
  MoreOfDisplayTooltip,
  MoreOfDisplaySelectedOptionsContainer,
  EmptyOptionsContainer,
} from './styles';

export type IOption = {
  label: string;
  value: string | number | Date;
  selected?: boolean;
};

interface ISelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  icon?: ComponentType<IconBaseProps>;
  label?: string;
  options: IOption[];
}

const Select: React.FC<ISelectProps> = ({
  name,
  label,
  icon: Icon,
  options: optionsPassed,
  ...rest
}) => {
  const unform = useUnform(name);

  const containerRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isFilled, setIsFilled] = useState<boolean>(
    optionsPassed.length > 0 || false,
  );
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [options, setOptions] = useState<IOption[]>(optionsPassed || []);

  const selectedOptions = useMemo(() => {
    return options.filter(option => option.selected);
  }, [options]);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(selectedOptions.length > 0);
  }, [selectedOptions]);

  const handleSelectOption = useCallback((option: IOption) => {
    setOptions(prevOptions => {
      const updatedOptions = [
        ...prevOptions.map(item => {
          if (item.value === option.value) return { ...item, selected: true };

          return item;
        }),
      ];

      setIsFocused(false);

      setIsFilled(updatedOptions.length > 0);

      return updatedOptions;
    });
  }, []);

  const handleDeselectOption = useCallback((option: IOption) => {
    setOptions(prevOptions => {
      const updatedOptions = [
        ...prevOptions.map(item => {
          if (item.value === option.value) return { ...item, selected: false };

          return item;
        }),
      ];

      const selected = updatedOptions.filter(item => item.selected);

      setIsFocused(false);

      setIsFilled(selected.length > 0);

      return updatedOptions;
    });
  }, []);

  const handleSearchOption = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      if (optionsPassed) {
        if (value.length >= 1) {
          setIsSearched(true);

          const foundedOptions = optionsPassed.filter(item =>
            item.label.toLocaleLowerCase().includes(value.toLocaleLowerCase()),
          );

          setOptions(foundedOptions);
        } else {
          setIsSearched(false);
          setOptions(optionsPassed);
        }
      }
    },
    [optionsPassed],
  );

  useClickAway(containerRef, handleInputBlur, { enabled: isFocused });

  useEffect(() => {
    if (unform) {
      unform.registerField({
        name: unform.fieldName,
        ref: selectRef.current,
        getValue: (ref: HTMLSelectElement) => {
          return ref.value;
        },
        setValue: (ref: HTMLSelectElement, value: string) => {
          ref.value = value;
        },
        clearValue: (ref: HTMLSelectElement) => {
          ref.value = '';
        },
      });
    }
  }, [unform]);

  return (
    <Container ref={containerRef} isFocused={isFocused} isFilled={isFilled}>
      {label && (
        <LabelContainer isFocused={isFocused} isFilled={isFilled}>
          {label}
        </LabelContainer>
      )}

      <select ref={selectRef}>
        {options.map(option => (
          <option
            key={String(option.value)}
            value={String(option.value)}
            selected={option.selected}
          >
            {option.label}
          </option>
        ))}
      </select>

      {isFocused ? (
        <input
          ref={searchInputRef}
          type="text"
          autoFocus
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChange={handleSearchOption}
        />
      ) : (
        <SelectedOptions onClick={handleInputFocus}>
          {selectedOptions.length > 1 ? (
            <MoreOfDisplay>
              <span>
                {selectedOptions[0].label}

                <button
                  type="button"
                  onClick={() => handleDeselectOption(selectedOptions[0])}
                >
                  <FiX size={16} />
                </button>
              </span>

              <MoreOfDisplayTooltip>
                . . .
                <MoreOfDisplaySelectedOptionsContainer>
                  {selectedOptions.map(selectedOption => {
                    return (
                      <span key={String(selectedOption.value)}>
                        {selectedOption.label}

                        <button
                          type="button"
                          onClick={() => handleDeselectOption(selectedOption)}
                        >
                          <FiX size={16} />
                        </button>
                      </span>
                    );
                  })}
                </MoreOfDisplaySelectedOptionsContainer>
              </MoreOfDisplayTooltip>
            </MoreOfDisplay>
          ) : (
            selectedOptions.map(selectedOption => {
              return (
                <span key={String(selectedOption.value)}>
                  {selectedOption.label}

                  <button
                    type="button"
                    onClick={() => handleDeselectOption(selectedOption)}
                  >
                    <FiX size={16} />
                  </button>
                </span>
              );
            })
          )}
        </SelectedOptions>
      )}

      {Icon ? (
        <IconContainer disabled={rest.disabled}>
          <Icon size={20} />
        </IconContainer>
      ) : !isFocused ? (
        <IconContainer disabled={rest.disabled}>
          <FiChevronDown size={20} />
        </IconContainer>
      ) : isSearched ? (
        <IconContainer disabled={rest.disabled}>
          <FiSearch size={20} />
        </IconContainer>
      ) : (
        <IconContainer disabled={rest.disabled}>
          <FiChevronUp size={20} />
        </IconContainer>
      )}

      <OptionsContainer isFocused={isFocused} isFilled={isFilled}>
        {options.length > 0 ? (
          options.map(option => (
            <Option
              key={String(option.value)}
              isFocused={isFocused}
              isFilled={isFilled}
              isSelected={option.selected}
              onClick={() =>
                option.selected
                  ? handleDeselectOption(option)
                  : handleSelectOption(option)
              }
            >
              {option.label}
            </Option>
          ))
        ) : (
          <EmptyOptionsContainer isFocused={isFocused} isFilled={isFilled}>
            <span>Nenhum resultado encontrado.</span>
          </EmptyOptionsContainer>
        )}
      </OptionsContainer>
    </Container>
  );
};

export { Select };
