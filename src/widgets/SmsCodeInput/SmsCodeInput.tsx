import React, { useEffect, useRef } from 'react';
import './SmsCodeInput.scss';

interface SmsCodeInputProps {
  value: string;
  onChange: (value: string) => void;
  onBackspace: () => void;
  inputRef: (el: HTMLInputElement | null) => void;
}

const SmsCodeInput: React.FC<SmsCodeInputProps> = ({
  value,
  onChange,
  onBackspace,
  inputRef
}) => {
  const localRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef(localRef.current);
  }, [inputRef]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^[0-9]?$/.test(val)) {
      onChange(val);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !value) {
      onBackspace();
    }
  };

  return (
    <div className="sms-input-wrapper">
      <input
        ref={localRef}
        type="text"
        maxLength={1}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        inputMode="numeric"
        placeholder="_"
      />
    </div>
  );
};

export default SmsCodeInput;
