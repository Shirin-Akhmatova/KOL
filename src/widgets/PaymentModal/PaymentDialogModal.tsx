import { useRef } from 'react';

import './PaymentDialogModal.scss';
import visa from '../../assets/icons/payment/VISA.svg';
import masterCard from '../../assets/icons/payment/MasterCard.svg';
import mbank from '../../assets/icons/payment/MBANK.svg';
import close from '../../assets/icons/exitIcon.svg';
import arrow from '../../assets/icons/payment/arrow_down.svg'


function PaymentDialogModal() {

  const dialogRef = useRef<HTMLDialogElement>(null);

  const openModal = () => {
    dialogRef.current?.showModal();
  };

  const closeModal = () => {
    dialogRef.current?.close();
  };

  // const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
  //   if (e.target === dialogRef.current) {
  //     closeModal();
  //   }
  // };
  
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog) return;
  
    const rect = dialog.getBoundingClientRect();
    const clickX = e.clientX;
    const clickY = e.clientY;
  
    const insideX = clickX >= rect.left && clickX <= rect.right;
    const insideY = clickY >= rect.top && clickY <= rect.bottom;
  
    if (!insideX || !insideY) {
      closeModal();
    }
  };

  return (
    <>
      <button type="button" className="btn-openPM"onClick={openModal}>Open DM</button>

      <dialog ref={dialogRef} className="payment-modal" id="payment-modal" onClick={handleBackdropClick}>
        <div className="payment-header">
          <span className='payment-title'>Add card details</span>
          <button className='payment-close' onClick={closeModal}>
            <img src={close} className='payment-close-icon' alt="close" />
          </button>
        </div>

        <div className="payment-divider"></div>

        <form className="payment-form">
          <label className='payment-banks'>
            <img src={visa} alt='VISA' />
            <img src={masterCard} alt='MasterCard' />
            <img src={mbank} alt='MBANK' />
          </label>
          <input required type='number' placeholder='Card number' />
          <input required type='number' placeholder='Expiration' />
          <input required type='number' placeholder='CVV' />

          <label className='payment-subtitle'>Billing address</label>
          <input required type='text' placeholder='Street address' />
          <input required type='number' placeholder='Apartment number' />
          <input required type='text' placeholder='City' />
          <input required type='text' placeholder='State' />
          <input required type='number' placeholder='ZIP code' />

          <div className='payment-select'>
            <select required defaultValue="Kyrgyzstan">
              <option value='Afghanistan'>Afghanistan</option>
              <option value='Brazil'>Brazil</option>
              <option value='Canada'>Canada</option>
              <option value='France'>France</option>
              <option value='Germany'>Germany</option>
              <option value='India'>India</option>
              <option value='Japan'>Japan</option>
              <option value='Kyrgyzstan'>Kyrgyzstan</option>
              <option value='Russia'>Russia</option>
              <option value='United States'>United States</option>
            </select>
            <label className='select-label'>Country/region</label>
            <img src={arrow} className="select-arrow" id="select-arrow"/>
          </div>
        </form>

        <div className="payment-divider"></div>

        <div className="payment-btns">
          <button className='payment-cancel' onClick={closeModal}>Cancel</button>
          <button className='payment-done'>Done</button>
        </div>
      </dialog>
    </>
  );
}

export default PaymentDialogModal;
