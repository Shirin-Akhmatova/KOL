import React, { useEffect, useRef, useState } from 'react';
import './SmsModal.scss';
import SmsCodeInput from '../SmsCodeInput/SmsCodeInput';
import { useAppDispatch, useAppSelector } from '../../app/services/redux/hooks';
import { verifyCode, resetVerifyState } from '../../app/services/redux/OTP/verifySlice';
import { useNavigate } from 'react-router-dom';

interface SmsModalProps {
  onClose: () => void;
  phoneNumber: string;
}

const SmsModal: React.FC<SmsModalProps> = ({ onClose, phoneNumber }) => {
  const [values, setValues] = useState(Array(4).fill(''));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useAppSelector((state) => state.verify);

  useEffect(() => {
    if (!phoneNumber) return;
    dispatch(resetVerifyState());
    setValues(Array(4).fill(''));
  }, [phoneNumber, dispatch]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        onClose();
        navigate('/create-service');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [success, onClose, navigate]);

  const handleChange = (index: number, val: string) => {
    if (!/^\d?$/.test(val)) return;

    const newValues = [...values];
    newValues[index] = val;
    setValues(newValues);

    if (val && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }

    if (newValues.every((digit) => digit.length === 1)) {
      const fullCode = newValues.join('');
      dispatch(verifyCode({ phone_number: phoneNumber, code: fullCode }));
    }
  };

  const handleBackspace = (index: number) => {
    if (values[index] === '') {
      if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    } else {
      const newValues = [...values];
      newValues[index] = '';
      setValues(newValues);
    }
  };

  return (
    <div className="sms-modal-overlay" onClick={onClose}>
      <div className="sms-modal" onClick={(e) => e.stopPropagation()}>
        <button className="back-button" onClick={onClose} disabled={loading}>&larr;</button>
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
              disabled={loading}
            />
          ))}
        </div>

        {loading && <p className="info-text">Проверка кода...</p>}
        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">Код подтверждён!</p>}

        <button
          className="continue-btn"
          disabled={loading || values.some((v) => v.length !== 1)}
          onClick={() => {
            const fullCode = values.join('');
            dispatch(verifyCode({ phone_number: phoneNumber, code: fullCode }));
          }}
        >
          Continue
        </button>

        <p className="more-options">More options</p>
      </div>
    </div>
  );
};

export default SmsModal;