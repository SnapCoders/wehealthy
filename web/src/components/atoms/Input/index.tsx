import React, {
  ComponentType,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiEye, FiEyeOff } from 'react-icons/fi';

import { colors } from '@components/bosons/colors';
import { useUnform } from '@hooks/useUnform';

import {
  Container,
  ErrorMessage,
  IconContainer,
  LabelContainer,
} from './styles';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: ComponentType<IconBaseProps>;
  label?: string;
  defaultValue?: any;
  errorMessage?: string;
}

const Input: React.FC<IInputProps> = ({ icon: Icon, ...rest }) => {
  const unform = useUnform(rest.name);

  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isFilled, setIsFilled] = useState<boolean>(!!rest.value || false);
  const [passwordIsShow, setPasswordIsShow] = useState<boolean>(true);
  const [inputType, setInputType] = useState<HTMLInputTypeAttribute>(
    rest.type || 'text',
  );

  const PasswordIcon = passwordIsShow ? FiEye : FiEyeOff;

  const iconColor = useMemo(() => {
    if (isFocused && !isFilled) return colors.blue[500];
    if (isFilled) return colors.primary[500];
    if (rest.errorMessage && !isFilled) return colors.red[500];
    if (rest.disabled && !rest.errorMessage) return colors.gray[500];

    return colors.gray[500];
  }, [isFocused, isFilled, rest]);

  const handleInputFocus = useCallback(() => {
    if (rest.disabled) return;

    setIsFocused(true);
  }, [rest]);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  const handleShowPassword = () => {
    setPasswordIsShow(!passwordIsShow);

    setInputType(passwordIsShow ? 'text' : 'password');
  };

  useEffect(() => {
    if (unform) {
      unform.registerField({
        name: unform.fieldName,
        ref: inputRef.current,
        path: 'value',
        clearValue: ref => {
          setIsFilled(false);
          ref.value = '';
        },
      });
    }
  }, [unform]);

  return (
    <Container
      isFocused={isFocused}
      isFilled={isFilled}
      isErrored={(!!rest.errorMessage || !!unform?.error) && !isFilled}
      disabled={rest.disabled}
    >
      {rest.label && (
        <LabelContainer
          isFocused={isFocused}
          isFilled={isFilled || rest.defaultValue}
          disabled={rest.disabled}
        >
          {rest.label}
        </LabelContainer>
      )}

      <input
        {...rest}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={rest.defaultValue}
        ref={inputRef}
        placeholder={isFocused ? '' : rest.placeholder}
        disabled={rest.disabled}
        type={inputType}
      />

      {Icon && (
        <IconContainer disabled={rest.disabled}>
          <Icon size={20} color={iconColor} />
        </IconContainer>
      )}

      {rest.type === 'password' && (
        <IconContainer disabled={rest.disabled}>
          <PasswordIcon
            size={20}
            color={iconColor}
            onClick={handleShowPassword}
          />
        </IconContainer>
      )}

      {(rest.errorMessage || unform?.error) && !isFilled && (
        <ErrorMessage>{rest.errorMessage || unform?.error}</ErrorMessage>
      )}
    </Container>
  );
};

export { Input };
