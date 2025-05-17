import { useEffect, useState } from "react";

const sanitizePhone = (value: string) => value.replace(/\D/g, "");

const formatPhone = (phone: string) => {
  const digits = sanitizePhone(phone);

  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
  if (digits.length <= 8)
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;

  return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(
    6,
    8
  )} ${digits.slice(8, 10)}`;
};

export const usePhoneFormatter = (selectedCode: string, inputValue: string) => {
  const [formattedValue, setFormattedValue] = useState("");

  useEffect(() => {
    const sanitizedInput = sanitizePhone(inputValue);

    const countryCode = selectedCode.replace(/\D/g, "");
    const startsWithCode = sanitizedInput.startsWith(countryCode);
    const cleanInput = startsWithCode
      ? sanitizedInput.slice(countryCode.length)
      : sanitizedInput;

    const formatted = formatPhone(cleanInput);
    setFormattedValue(formatted);
  }, [inputValue, selectedCode]);

  return formattedValue;
};
