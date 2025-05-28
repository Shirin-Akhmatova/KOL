import React, { useState } from 'react';
import toggleIcon from '../../../assets/icons/toggle.svg';
import './toggle.scss';

function Toggle() {
  const [isChecked, setIsChecked] = useState(true);

  return (
    <div
      className={`custom-toggle ${isChecked ? 'checked' : ''}`}
      onClick={() => setIsChecked(!isChecked)}
    >
      <div className="thumb">
        {isChecked && <span className="checkmark"><img src={toggleIcon} alt="Toggle Icon" /></span>}
      </div>
    </div>
  );
}

export default Toggle;
