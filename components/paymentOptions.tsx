// "use client"; // Ensure this is correctly cased

// import React, { useState } from 'react';
// import { Button } from './ui/button';

// interface PaymentOptionsProps {
//   onOnlinePaymentClick: () => void;
//   onPartialPaymentClick: () => void;
// }

// const PaymentOptions: React.FC<PaymentOptionsProps> = ({ onOnlinePaymentClick, onPartialPaymentClick }) => {
//   const [selectedOption, setSelectedOption] = useState('Credit Card');

//   return (
//     <div className="p-6 bg-gray-100 rounded-lg shadow-md">
//       <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Choose Payment Method</h2>
      
//       <div className="space-y-4">
//         <button 
//           onClick={onOnlinePaymentClick} 
//           className="w-full py-3 px-6 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-200 ease-in-out">
//           Online Payment
//         </button>
        
//         <button 
//           onClick={onPartialPaymentClick} 
//           className="w-full py-3 px-6 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-all duration-200 ease-in-out">
//           Partial Payment
//         </button>

//         <button 
//           className="w-full py-3 px-6 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all duration-200 ease-in-out">
//           Cash on Delivery
//         </button>
//       </div>
      
//       <div className="flex justify-center mt-6">
//         <Button className="w-full md:w-auto py-3 px-6 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-all duration-200 ease-in-out">
//           Proceed To Delivery
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default PaymentOptions;

"use client"; // Ensure this is correctly cased

import React, { useState } from 'react';
import { Button } from './ui/button';

interface PaymentOptionsProps {
  onOnlinePaymentClick: () => void;
  onPartialPaymentClick: () => void;
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({ onOnlinePaymentClick, onPartialPaymentClick }) => {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);

    // Open modal based on the selected payment option
    if (event.target.value === 'Online Payment') {
      onOnlinePaymentClick();
    } else if (event.target.value === 'Partial Payment') {
      onPartialPaymentClick();
    }
  };

  return (
    <div className="p-6 bg-white">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Select Payment Method</h2>
      
      <div className="space-y-6">
        <div className="flex items-center">
          <input 
            type="radio" 
            id="online-payment" 
            name="paymentOption" 
            value="Online Payment" 
            checked={selectedOption === 'Online Payment'} 
            onChange={handleOptionChange} 
            className="mr-4 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" 
          />
          <label htmlFor="online-payment" className="text-lg text-gray-700 cursor-pointer">Online Payment</label>
        </div>

        <div className="flex items-center">
          <input 
            type="radio" 
            id="partial-payment" 
            name="paymentOption" 
            value="Partial Payment" 
            checked={selectedOption === 'Partial Payment'} 
            onChange={handleOptionChange} 
            className="mr-4 h-5 w-5 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded" 
          />
          <label htmlFor="partial-payment" className="text-lg text-gray-700 cursor-pointer">Partial Payment</label>
        </div>

        <div className="flex items-center">
          <input 
            type="radio" 
            id="cash-on-delivery" 
            name="paymentOption" 
            value="Cash on Delivery" 
            checked={selectedOption === 'Cash on Delivery'} 
            onChange={handleOptionChange} 
            className="mr-4 h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded" 
          />
          <label htmlFor="cash-on-delivery" className="text-lg text-gray-700 cursor-pointer">Cash on Delivery</label>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <Button className="w-full md:w-auto py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition-transform transform hover:scale-105">
          Proceed To Delivery
        </Button>
      </div>
    </div>
  );
};

export default PaymentOptions;

