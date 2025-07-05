import { Crown, List, Store } from "lucide-react";

const plans = [
    {
      id: 'basic',
      name: 'Basic Listing',
      price: 0,
      period: 'Forever',
      icon: List,
      color: 'gray',
      popular: false,
      features: [
        'Shop listing on GoLine marketplace',
        'Basic shop profile',
        'Order notifications via WhatsApp',
        'Customer reviews & ratings',
        'Mobile-friendly design',
        'Basic analytics'
      ],
      limitations: [
        'No custom domain',
        'GoLine branding',
        'Limited customization'
      ]
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 299,
      period: 'month',
      icon: Store,
      color: 'purple',
      popular: true,
      features: [
        'Everything in Basic',
        'Custom subdomain (shop.goline.com)',
        'Advanced shop customization',
        'Inventory management',
        'Order management dashboard',
        'Payment gateway integration',
        'SEO optimization',
        'Priority support'
      ],
      limitations: []
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 999,
      period: 'month',
      icon: Crown,
      color: 'gold',
      popular: false,
      features: [
        'Everything in Professional',
        'Custom domain (www.yourshop.com)',
        'White-label solution',
        'Advanced analytics & reports',
        'Multi-location support',
        'API access',
        'Dedicated account manager',
        '24/7 priority support'
      ],
      limitations: []
    }
  ];
  
export default plans;