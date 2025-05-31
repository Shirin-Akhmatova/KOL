import React, { useRef, useState } from 'react';
import './SmsModal.scss';
import SmsCodeInput from '../SmsCodeInput/SmsCodeInput';

interface SmsModalProps {
  onClose: () => void;
  phoneNumber: string;
}

const SmsModal: React.FC<SmsModalProps> = ({ onClose, phoneNumber }) => {
  const [values, setValues] = useState(Array(6).fill(''));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (index: number, val: string) => {
    const newValues = [...values];
    newValues[index] = val;
    setValues(newValues);

    if (val && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index: number) => {
    if (index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="sms-modal-overlay">
      <div className="sms-modal">
        <button className="back-button" onClick={onClose}>&larr;</button>
        <h2 className="modal-title">Confirm your number</h2>
        <p className="modal-subtitle">
          Enter the code we sent over SMS to <strong>{phoneNumber}</strong>
        </p>
<div className="code-inputs">
  {values.map((value, i) => (
    <SmsCodeInput
      key={i}
      value={value}
      onChange={(val) => handleChange(i, val)}
      onBackspace={() => handleBackspace(i)}
      inputRef={(el) => (inputsRef.current[i] = el)}
    />
  ))}
</div>

        <button className="continue-btn">Continue</button>
        <p className="more-options">More options</p>
      </div>
    </div>
  );
};

export default SmsModal;
