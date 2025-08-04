import React, { useState } from 'react';
import axios from '../api/axios';
import { Check } from 'lucide-react';

interface PricingTierProps {
  planId: string;
  pricingId: string;
  name: string;
  price: string;
  durationLabel?: string;
  footerText?: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  currency?: string;
}

const RAZORPAY_KEY = 'rzp_test_2oIQzZ7i0uQ6sn';

const PricingTier: React.FC<PricingTierProps> = ({
  planId,
  pricingId,
  name,
  price,
  durationLabel,
  footerText,
  description,
  features,
  isPopular = false,
  currency = 'USD',
}) => {
  const [loading, setLoading] = useState(false);

  const loadRazorpay = () =>
    new Promise<boolean>((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handleBuyNow = async () => {
    if (loading) return;
    setLoading(true);

    try {
      // 1. Fetch userId
      const userId = localStorage.getItem('userId');
      if (!userId) throw new Error('User not logged in');

      // 2. Create order on your backend
      const { data } = await axios.post('/payment/order', {
        userId,
        planId,
        pricingId,
        currency,
        price
      });
      const { order } = data;

      // 3. Load Razorpay SDK
      const sdkLoaded = await loadRazorpay();
      if (!sdkLoaded) throw new Error('Payment SDK failed to load');

      // 4. Open checkout
      new (window as any).Razorpay({
        key: RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        name,
        description,
        order_id: order.id,
        notes: {
          planId,
          pricingId,
          userId,
        },
        theme: { color: '#7C3AED' },
        handler: async (resp: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          try {
            // 5. Verify payment + metadata
            await axios.post('/payment/verify', {
              ...resp,
              planId,
              pricingId,
              userId,
            });
            alert('🎉 Payment successful!');
          } catch (verifyErr: any) {
            console.error('Verification error:', verifyErr);
            alert('⚠️ Payment verification failed');
          }
        },
      }).open();
    } catch (err: any) {
      console.error('Payment error:', err);
      alert(err.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`relative bg-white border ${
        isPopular ? 'border-blue-500 shadow-lg' : 'border-gray-200'
      } rounded-2xl overflow-hidden flex flex-col`}
    >
      {isPopular && (
        <div className="absolute inset-x-0 top-0 bg-blue-700 text-white text-center text-xs font-bold uppercase py-2 rounded-t-2xl">
          Most Popular
        </div>
      )}
      <div className="p-6 mt-4 flex-1 flex flex-col">
        <h3 className="text-xl font-semibold text-center mb-2">{name}</h3>
        <p className="text-center text-4xl font-extrabold text-gray-900">
          {price}
          <span className="text-lg font-medium text-gray-500">
            /{durationLabel || 'mo'}
          </span>
        </p>
        {durationLabel && (
          <p className="text-center text-sm font-medium text-blue-600 mt-1">
            {durationLabel}
          </p>
        )}
        <p className="text-gray-600 text-center mt-3">{description}</p>

        <button
          onClick={handleBuyNow}
          disabled={loading}
          className={`mt-6 w-full py-3 font-semibold rounded-lg transition ${
            isPopular
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white'
          }`}
        >
          {loading ? 'Processing…' : 'Choose plan'}
        </button>

        {footerText && (
          <p className="text-xs text-gray-500 mt-4 text-center">
            {footerText}
          </p>
        )}
      </div>

      <div className="border-t border-gray-200 px-6 py-4">
        <ul className="space-y-2">
          {features.map((feat, idx) => (
            <li key={idx} className="flex items-start">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
              <span className="ml-2 text-gray-700 text-sm">{feat}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PricingTier;
