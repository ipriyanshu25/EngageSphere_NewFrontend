
// import React, { useState } from 'react';
// import { Check } from 'lucide-react';
// import GlassContainer from './GlassContainer';
// import PaymentModal from './PaymentModal';
// import Receipt from './Receipt';

// interface PricingTierProps {
//   name: string;
//   price: string;
//   description: string;
//   features: string[];
//   isPopular?: boolean;
//   platform?: string;
// }

// const PricingTier: React.FC<PricingTierProps> = ({
//   name,
//   price,
//   description,
//   features,
//   isPopular = false,
//   platform = 'Social Media'
// }) => {
//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [showReceipt, setShowReceipt] = useState(false);
//   const [paymentDetails, setPaymentDetails] = useState<any>(null);

//   const handleOrderNow = () => {
//     setShowPaymentModal(true);
//   };

//   const handlePaymentSuccess = (details: any) => {
//     setPaymentDetails(details);
//     setShowPaymentModal(false);
//     setShowReceipt(true);
//   };

//   const handleCloseReceipt = () => {
//     setShowReceipt(false);
//     setPaymentDetails(null);
//   };

//   return (
//     <>
//       <GlassContainer
//         className={`
//           h-full transition-transform duration-300 hover:-translate-y-1
//           bg-gradient-to-br from-[#1a2a6c] to-[#4b6cb7] backdrop-blur-sm bg-opacity-60
//           text-white rounded-2xl shadow-lg border border-blue-300 relative
//         `}
//       >
//         {isPopular && (
//           <div className="bg-yellow-400 text-gray-900 text-sm font-semibold px-3 py-1 rounded-full absolute -top-3 left-1/2 transform -translate-x-1/2 shadow-md">
//             Most Popular
//           </div>
//         )}

//         <div className="p-6 md:p-8">
//           <div className="text-center mb-6">
//             <h3 className="text-2xl font-extrabold mb-2 tracking-wide">{name}</h3>
//             <div className="text-4xl font-bold mb-2 text-yellow-300">{price}</div>
//             <p className="text-slate-200">{description}</p>
//           </div>

//           <ul className="space-y-3 mb-6">
//             {features.map((feature, index) => (
//               <li key={index} className="flex items-start">
//                 <Check className="h-5 w-5 text-yellow-300 mr-2 flex-shrink-0 mt-0.5" />
//                 <span className="text-slate-100">{feature}</span>
//               </li>
//             ))}
//           </ul>

//           <button
//             onClick={handleOrderNow}
//             className={`
//               w-full py-3 rounded-lg font-semibold transition-all
//               bg-yellow-400 text-gray-900 hover:bg-yellow-500 shadow-md hover:shadow-lg
//             `}
//           >
//             Order Now
//           </button>
//         </div>
//       </GlassContainer>

//       <PaymentModal
//         isOpen={showPaymentModal}
//         onClose={() => setShowPaymentModal(false)}
//         packageData={{
//           name,
//           price,
//           features,
//           platform
//         }}
//         onPaymentSuccess={handlePaymentSuccess}
//       />

//       {showReceipt && paymentDetails && (
//         <Receipt
//           paymentDetails={paymentDetails}
//           onClose={handleCloseReceipt}
//         />
//       )}
//     </>
//   );
// };

// export default PricingTier;









// // src/components/PricingTier.tsx
// import React, { useState } from 'react';
// import { Check } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import GlassContainer from './GlassContainer';
// import PaymentModal from './PaymentModal';
// import Receipt from './Receipt';

// interface PricingTierProps {
//   name: string;
//   price: string;
//   description: string;
//   features: string[];
//   isPopular?: boolean;
//   platform?: string;
//   isBusiness?: boolean;
// }

// const PricingTier: React.FC<PricingTierProps> = ({
//   name,
//   price,
//   description,
//   features,
//   isPopular = false,
//   platform = 'Social Media',
//   isBusiness = false
// }) => {
//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [showReceipt, setShowReceipt] = useState(false);
//   const [paymentDetails, setPaymentDetails] = useState<any>(null);

//   const handleOrderNow = () => {
//     setShowPaymentModal(true);
//   };

//   const handlePaymentSuccess = (details: any) => {
//     setPaymentDetails(details);
//     setShowPaymentModal(false);
//     setShowReceipt(true);
//   };

//   const handleCloseReceipt = () => {
//     setShowReceipt(false);
//     setPaymentDetails(null);
//   };

//   return (
//     <>
//       <GlassContainer
//         className={`
//           h-full transition-transform duration-300 hover:-translate-y-1
//           bg-gradient-to-br from-[#1a2a6c] to-[#4b6cb7] backdrop-blur-sm bg-opacity-60
//           text-white rounded-2xl shadow-lg border border-blue-300 relative
//         `}
//       >
//         {isPopular && (
//           <div className="bg-yellow-400 text-gray-900 text-sm font-semibold px-3 py-1 rounded-full absolute -top-3 left-1/2 transform -translate-x-1/2 shadow-md">
//             Most Popular
//           </div>
//         )}

//         <div className="p-6 md:p-8">
//           <div className="text-center mb-6">
//             <h3 className="text-2xl font-extrabold mb-2 tracking-wide">{name}</h3>
//             <div className="text-4xl font-bold mb-2 text-yellow-300">{price}</div>
//             <p className="text-slate-200">{description}</p>
//           </div>

//           <ul className="space-y-3 mb-6">
//             {features.map((feature, index) => (
//               <li key={index} className="flex items-start">
//                 <Check className="h-5 w-5 text-yellow-300 mr-2 flex-shrink-0 mt-0.5" />
//                 <span className="text-slate-100">{feature}</span>
//               </li>
//             ))}
//           </ul>

//           {isBusiness ? (
//             <Link
//               to="/contact"
//               className="w-full block text-center py-3 rounded-lg font-semibold transition-all bg-yellow-500 text-gray-900 hover:bg-yellow-600 shadow-md hover:shadow-lg"
//             >
//               Contact Us
//             </Link>
//           ) : (
//             <button
//               onClick={handleOrderNow}
//               className="w-full py-3 rounded-lg font-semibold transition-all bg-yellow-400 text-gray-900 hover:bg-yellow-500 shadow-md hover:shadow-lg"
//             >
//               Order Now
//             </button>
//           )}
//         </div>
//       </GlassContainer>

//       {!isBusiness && (
//         <>
//           <PaymentModal
//             isOpen={showPaymentModal}
//             onClose={() => setShowPaymentModal(false)}
//             packageData={{ name, price, features, platform }}
//             onPaymentSuccess={handlePaymentSuccess}
//           />

//           {showReceipt && paymentDetails && (
//             <Receipt paymentDetails={paymentDetails} onClose={handleCloseReceipt} />
//           )}
//         </>
//       )}
//     </>
//   );
// };

// export default PricingTier;





import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlassContainer from './GlassContainer';
import PaymentModal from './PaymentModal';
import Receipt from './Receipt';

interface PricingTierProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  platform?: string;
  isBusiness?: boolean;
}

const PricingTier: React.FC<PricingTierProps> = ({
  name,
  price,
  description,
  features,
  isPopular = false,
  platform = 'Social Media',
  isBusiness = false,
}) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<any>(null);

  const handleOrderNow = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = (details: any) => {
    setPaymentDetails(details);
    setShowPaymentModal(false);
    setShowReceipt(true);
  };

  const handleCloseReceipt = () => {
    setShowReceipt(false);
    setPaymentDetails(null);
  };

  return (
    <>
      <GlassContainer
        className={`
          h-full transition-transform duration-300 hover:-translate-y-1
          bg-gradient-to-br from-[#1a2a6c] to-[#4b6cb7] backdrop-blur-sm bg-opacity-60
          text-white rounded-2xl shadow-lg border border-blue-300 relative
        `}
      >
        {isPopular && (
          <div className="bg-yellow-400 text-gray-900 text-sm font-semibold px-3 py-1 rounded-full absolute -top-3 left-1/2 transform -translate-x-1/2 shadow-md">
            Most Popular
          </div>
        )}

        <div className="p-6 md:p-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-extrabold mb-2 tracking-wide">{name}</h3>
            <div className="text-4xl font-bold mb-2 text-yellow-300">{price}</div>
            <p className="text-slate-200">{description}</p>
          </div>

          <ul className="space-y-3 mb-6">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check className="h-5 w-5 text-yellow-300 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-slate-100">{feature}</span>
              </li>
            ))}
          </ul>

          {isBusiness ? (
            <Link
              to="/contact"
              className="w-full block text-center py-3 rounded-lg font-semibold transition-all bg-yellow-500 text-gray-900 hover:bg-yellow-600 shadow-md hover:shadow-lg"
            >
              Contact Us
            </Link>
          ) : (
            <button
              onClick={handleOrderNow}
              className="w-full py-3 rounded-lg font-semibold transition-all bg-yellow-400 text-gray-900 hover:bg-yellow-500 shadow-md hover:shadow-lg"
            >
              Order Now
            </button>
          )}
        </div>
      </GlassContainer>

      {/* Modal + Receipt */}
      {!isBusiness && (
        <>
          <PaymentModal
            isOpen={showPaymentModal}
            onClose={() => setShowPaymentModal(false)}
            packageData={{ name, price, features, platform }}
            onPaymentSuccess={handlePaymentSuccess}
          />

          {showReceipt && paymentDetails && (
            <Receipt
              paymentDetails={paymentDetails}
              onClose={handleCloseReceipt}
            />
          )}
        </>
      )}
    </>
  );
};

export default PricingTier;
