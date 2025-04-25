import React from 'react';

const SubscriptionCards = () => {
    const subscriptionPackages = [
        {
          id: 0,
          name: 'Free Trial',
          price: '30-Day Trial',
          features: [
            'Up to 20 file uploads',
            'Basic log analysis',
            'Community support',
            '7-day data retention',
            'Upgrade anytime'
          ],
          color: 'gray'
        },
        { 
          id: 1, 
          name: 'Basic', 
          price: '$9.99/month', 
          features: [
            'Up to 50 file uploads',
            'Basic log analysis',
            'Email support',
            '7-day data retention'
          ],
          color: 'blue'
        },
        { 
          id: 2, 
          name: 'Standard', 
          price: '$19.99/month', 
          features: [
            'Up to 200 file uploads',
            'Advanced log analysis',
            'Priority email support',
            '30-day data retention',
            'Custom dashboards'
          ],
          color: 'green'
        },
        { 
          id: 3, 
          name: 'Premium', 
          price: '$39.99/month', 
          features: [
            'Unlimited file uploads',
            'Enterprise log analysis',
            '24/7 priority support',
            '90-day data retention',
            'Custom dashboards',
            'API access',
            'Team collaboration'
          ],
          color: 'purple'
        }
      ];
      

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 p-6">
      {subscriptionPackages.map((pkg) => (
        <div
          key={pkg.id}
          className="bg-gray-100 rounded-2xl shadow-md p-6 flex flex-col justify-between h-[500px]"
        >
          <div>
            <h2 className="text-2xl font-bold text-blue-500 mb-2">{pkg.name}</h2>
            <p className="text-xl font-semibold mb-4 text-gray-700">{pkg.price}</p>
            <ul className="mb-4 space-y-2 text-sm text-gray-600">
              {pkg.features.map((feature, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="mr-2 text-blue-500">✔</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Choose {pkg.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default SubscriptionCards;
