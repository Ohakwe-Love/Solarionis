import React, { useState } from 'react';
import { CreditCard, Truck, MapPin, User, Mail, Phone, Lock, CheckCircle, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Header from '../components/Layout/Header';

import Footer from '../components/Layout/Footer';
import { Link } from 'react-router-dom';

const CheckoutPage = () => {
    const { cart, getCartTotal, clearCart } = useCart();

    // Mock cart data for demonstration
    //   const cart = [
    //     { id: 1, name: 'Classic Chronograph', price: '3800.00', quantity: 1, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&h=150&fit=crop' }
    //   ];
    //   const getCartTotal = () => 3800;

    const [step, setStep] = useState(1); // 1: Info, 2: Payment, 3: Success
    const [paymentMethod, setPaymentMethod] = useState('stripe');
    const [isProcessing, setIsProcessing] = useState(false);

    const [formData, setFormData] = useState({
        // Billing Information
        firstName: '',
        lastName: '',
        email: '',
        phone: '',

        // Shipping Address
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States',

        // Payment
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleContinueToPayment = (e) => {
        e.preventDefault();
        // Validate form
        if (!formData.firstName || !formData.email || !formData.address) {
            alert('Please fill in all required fields');
            return;
        }
        setStep(2);
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate payment processing
        setTimeout(() => {
            if (paymentMethod === 'paystack') {
                handlePaystackPayment();
            } else if (paymentMethod === 'stripe') {
                handleStripePayment();
            } else if (paymentMethod === 'paypal') {
                handlePayPalPayment();
            }
        }, 2000);
    };

    // PAYSTACK INTEGRATION
    const handlePaystackPayment = () => {
        const handler = window.PaystackPop.setup({
            key: 'pk_test_xxxxxxxxxxxx', // Replace with your Paystack public key
            email: formData.email,
            amount: getCartTotal() * 1.1 * 100, // Amount in kobo (multiply by 100)
            currency: 'USD',
            ref: 'EMR_' + Math.floor(Math.random() * 1000000000 + 1),
            callback: function (response) {
                setIsProcessing(false);
                setStep(3);
                console.log('Paystack payment successful:', response);
            },
            onClose: function () {
                setIsProcessing(false);
                alert('Payment window closed');
            }
        });
        handler.openIframe();
    };

    // STRIPE INTEGRATION (requires Stripe.js to be loaded)
    const handleStripePayment = async () => {
        // In production, you would:
        // 1. Create payment intent on your backend
        // 2. Use Stripe Elements or Checkout
        // 3. Confirm payment with Stripe

        try {
            // Mock successful payment
            console.log('Processing Stripe payment...');
            setIsProcessing(false);
            setStep(3);

            // Real implementation would look like:
            /*
            const stripe = window.Stripe('pk_test_xxxxxxxxxxxx');
            const response = await fetch('/api/create-payment-intent', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ amount: getCartTotal() * 1.1 * 100 })
            });
            const { clientSecret } = await response.json();
            const result = await stripe.confirmCardPayment(clientSecret, {
              payment_method: {
                card: cardElement,
                billing_details: { name: formData.cardName }
              }
            });
            if (result.error) {
              alert(result.error.message);
            } else {
              setStep(3);
            }
            */
        } catch (error) {
            console.error('Stripe error:', error);
            setIsProcessing(false);
            alert('Payment failed. Please try again.');
        }
    };

    // PAYPAL INTEGRATION (requires PayPal SDK)
    const handlePayPalPayment = () => {
        // In production, you would use PayPal SDK
        // This is a mock implementation

        console.log('Processing PayPal payment...');
        setIsProcessing(false);
        setStep(3);

        // Real implementation would use PayPal Buttons:
        /*
        window.paypal.Buttons({
          createOrder: function(data, actions) {
            return actions.order.create({
              purchase_units: [{
                amount: { value: (getCartTotal() * 1.1).toFixed(2) }
              }]
            });
          },
          onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
              setStep(3);
            });
          }
        }).render('#paypal-button-container');
        */
    };

    const totalWithTax = (getCartTotal() * 1.1).toFixed(2);

    if (step === 3) {
        return (
            <div className="min-h-screen bg-[var(--deep-black)] py-20">
                <div className="max-w-2xl mx-auto px-4 text-center">
                    <div className="bg-slate-900 rounded-2xl p-12 border border-slate-800">
                        <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
                        <h1 className="text-4xl font-serif text-white mb-4">Payment Successful!</h1>
                        <p className="text-gray-400 mb-8">
                            Thank you for your purchase. Your order has been confirmed and will be shipped soon.
                        </p>
                        <div className="bg-slate-800 rounded-lg p-6 mb-8">
                            <p className="text-gray-400 text-sm mb-2">Order Number</p>
                            <p className="text-white text-2xl font-bold">#EMR{Math.floor(Math.random() * 1000000)}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/shop"
                                className="px-8 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition"
                            >
                                Continue Shopping
                            </a>
                            <a
                                href="/orders"
                                className="px-8 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--primary-color)]/90 transition"
                            >
                                View Order
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--deep-black)]">


            <Header />

            <section className="flex items-center page-hero shopPage-hero justify-center h-110 group overflow-hidden relative ">
                <div className="text-center">
                    <h1 className="text-5xl font-serif text-white mb-4">Checkout</h1>

                    <p className='text-2xl'>
                        <Link to='/shop' className='text-white hover:text-[var(--primary-color)] transition'>Shop</Link>
                        <ChevronRight className='inline mx-2 text-white' />
                        <span className='text-[var(--primary-color)]'>Checkout</span>
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                {/* Header */}
                <div className="mb-8 pt-20">
                    <div className="flex items-center gap-4 mt-4">
                        <div className={`flex items-center gap-2 ${step >= 1 ? 'text-[var(--primary-color)]' : 'text-gray-600'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-[var(--primary-color)] text-black bg-[var(--primary-color)]' : 'border-gray-600'}`}>
                                {step > 1 ? '✓' : '1'}
                            </div>
                            <span className="hidden sm:inline">Information</span>
                        </div>
                        <div className="flex-1 h-0.5 bg-gray-700"></div>
                        <div className={`flex items-center gap-2 ${step >= 2 ? 'text-[var(--primary-color)]' : 'text-gray-600'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-[var(--primary-color)] bg-[var(--primary-color)] text-black' : 'border-gray-600'}`}>
                                2
                            </div>
                            <span className="hidden sm:inline">Payment</span>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Form */}
                    <div className="lg:col-span-2">

                        {/* Step 1: Information */}
                        {step === 1 && (
                            <div className="space-y-6">

                                {/* Contact Information */}
                                <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
                                    <div className="flex items-center gap-2 mb-6">
                                        <User className="w-5 h-5 text-[var(--primary-color)]" />
                                        <h2 className="text-xl font-semibold text-white">Contact Information</h2>
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-gray-400 text-sm mb-2">First Name *</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                className="w-full bg-slate-800 text-white px-4 py-3 rounded-lg border border-slate-700 focus:border-[var(--primary-color)] focus:outline-none"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-400 text-sm mb-2">Last Name *</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                className="w-full bg-slate-800 text-white px-4 py-3 rounded-lg border border-slate-700 focus:border-[var(--primary-color)] focus:outline-none"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-400 text-sm mb-2">Email *</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full bg-slate-800 text-white px-4 py-3 rounded-lg border border-slate-700 focus:border-[var(--primary-color)] focus:outline-none"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-400 text-sm mb-2">Phone *</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full bg-slate-800 text-white px-4 py-3 rounded-lg border border-slate-700 focus:border-[var(--primary-color)] focus:outline-none"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Shipping Address */}
                                <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
                                    <div className="flex items-center gap-2 mb-6">
                                        <Truck className="w-5 h-5 text-[var(--primary-color)]" />
                                        <h2 className="text-xl font-semibold text-white">Shipping Address</h2>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-gray-400 text-sm mb-2">Street Address *</label>
                                            <input
                                                type="text"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                className="w-full bg-slate-800 text-white px-4 py-3 rounded-lg border border-slate-700 focus:border-[var(--primary-color)] focus:outline-none"
                                                required
                                            />
                                        </div>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-gray-400 text-sm mb-2">City *</label>
                                                <input
                                                    type="text"
                                                    name="city"
                                                    value={formData.city}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-slate-800 text-white px-4 py-3 rounded-lg border border-slate-700 focus:border-[var(--primary-color)] focus:outline-none"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-gray-400 text-sm mb-2">State *</label>
                                                <input
                                                    type="text"
                                                    name="state"
                                                    value={formData.state}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-slate-800 text-white px-4 py-3 rounded-lg border border-slate-700 focus:border-[var(--primary-color)] focus:outline-none"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-gray-400 text-sm mb-2">ZIP Code *</label>
                                                <input
                                                    type="text"
                                                    name="zipCode"
                                                    value={formData.zipCode}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-slate-800 text-white px-4 py-3 rounded-lg border border-slate-700 focus:border-[var(--primary-color)] focus:outline-none"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-gray-400 text-sm mb-2">Country *</label>
                                                <select
                                                    name="country"
                                                    value={formData.country}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-slate-800 text-white px-4 py-3 rounded-lg border border-slate-700 focus:border-[var(--primary-color)] focus:outline-none"
                                                >
                                                    <option>United States</option>
                                                    <option>Canada</option>
                                                    <option>United Kingdom</option>
                                                    <option>Australia</option>
                                                    <option>Nigeria</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleContinueToPayment}
                                    className="w-full bg-[var(--primary-color)] text-black py-4 rounded-lg font-medium hover:bg-[var(--primary-color)]/90 transition"
                                >
                                    Continue to Payment
                                </button>
                            </div>
                        )}

                        {/* Step 2: Payment */}
                        {step === 2 && (
                            <div className="space-y-6">

                                {/* Payment Method Selection */}
                                <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
                                    <h2 className="text-xl font-semibold text-white mb-6">Select Payment Method</h2>

                                    <div className="space-y-3">
                                        {/* Stripe */}
                                        <label className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition ${paymentMethod === 'stripe' ? 'border-[var(--primary-color)] bg-[var(--primary-color)]/10' : 'border-slate-700 hover:border-slate-600'
                                            }`}>
                                            <input
                                                type="radio" hidden
                                                name="paymentMethod"
                                                value="stripe"
                                                checked={paymentMethod === 'stripe'}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                                className="mr-3 accent-[var(--primary-color)]"
                                            />
                                            <CreditCard className="w-6 h-6 text-[var(--primary-color)] mr-3" />
                                            <div className="flex-1">
                                                <p className="text-white font-medium">Credit/Debit Card (Stripe)</p>
                                                <p className="text-gray-400 text-sm">Pay securely with Stripe</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-6" />
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                                            </div>
                                        </label>

                                        {/* Paystack */}
                                        <label className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition ${paymentMethod === 'paystack' ? 'border-[var(--primary-color)] bg-[var(--primary-color)]/10' : 'border-slate-700 hover:border-slate-600'
                                            }`}>
                                            <input
                                                type="radio" hidden
                                                name="paymentMethod"
                                                value="paystack"
                                                checked={paymentMethod === 'paystack'}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                                className="mr-3 accent-[var(--primary-color)]"
                                            />
                                            <CreditCard className="w-6 h-6 text-[var(--primary-color)] mr-3" />
                                            <div className="flex-1">
                                                <p className="text-white font-medium">Paystack</p>
                                                <p className="text-gray-400 text-sm">Fast and secure payment</p>
                                            </div>
                                            <div className="bg-[#00C3F7] text-white px-3 py-1 rounded text-sm font-bold">
                                                PAYSTACK
                                            </div>
                                        </label>

                                        {/* PayPal */}
                                        <label className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition ${paymentMethod === 'paypal' ? 'border-[var(--primary-color)] bg-[var(--primary-color)]/10' : 'border-slate-700 hover:border-slate-600'
                                            }`}>
                                            <input
                                                type="radio" hidden
                                                name="paymentMethod"
                                                value="paypal"
                                                checked={paymentMethod === 'paypal'}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                                className="mr-3 accent-[var(--primary-color)]"
                                            />
                                            <CreditCard className="w-6 h-6 text-[var(--primary-color)] mr-3" />
                                            <div className="flex-1">
                                                <p className="text-white font-medium">PayPal</p>
                                                <p className="text-gray-400 text-sm">Pay with your PayPal account</p>
                                            </div>
                                            <div className="bg-[#0070BA] text-white px-3 py-1 rounded text-sm font-bold">
                                                PayPal
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                {/* Card Details (only for Stripe) */}
                                {paymentMethod === 'stripe' && (
                                    <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
                                        <h3 className="text-lg font-semibold text-white mb-4">Card Details</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-gray-400 text-sm mb-2">Cardholder Name</label>
                                                <input
                                                    type="text"
                                                    name="cardName"
                                                    value={formData.cardName}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-slate-800 text-white px-4 py-3 rounded-lg border border-slate-700 focus:border-[var(--primary-color)] focus:outline-none"
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-gray-400 text-sm mb-2">Card Number</label>
                                                <input
                                                    type="text"
                                                    name="cardNumber"
                                                    value={formData.cardNumber}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-slate-800 text-white px-4 py-3 rounded-lg border border-slate-700 focus:border-[var(--primary-color)] focus:outline-none"
                                                    placeholder="1234 5678 9012 3456"
                                                    maxLength="19"
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-gray-400 text-sm mb-2">Expiry Date</label>
                                                    <input
                                                        type="text"
                                                        name="expiryDate"
                                                        value={formData.expiryDate}
                                                        onChange={handleInputChange}
                                                        className="w-full bg-slate-800 text-white px-4 py-3 rounded-lg border border-slate-700 focus:border-[var(--primary-color)] focus:outline-none"
                                                        placeholder="MM/YY"
                                                        maxLength="5"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-400 text-sm mb-2">CVV</label>
                                                    <input
                                                        type="text"
                                                        name="cvv"
                                                        value={formData.cvv}
                                                        onChange={handleInputChange}
                                                        className="w-full bg-slate-800 text-white px-4 py-3 rounded-lg border border-slate-700 focus:border-[var(--primary-color)] focus:outline-none"
                                                        placeholder="123"
                                                        maxLength="3"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setStep(1)}
                                        className="flex-1 bg-slate-800 text-white py-4 rounded-lg font-medium hover:bg-slate-700 transition"
                                    >
                                        Back
                                    </button>
                                    <button
                                        onClick={handlePayment}
                                        disabled={isProcessing}
                                        className="flex-1 bg-[var(--primary-color)] text-white py-4 rounded-lg font-medium hover:bg-[var(--primary-color)]/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isProcessing ? 'Processing...' : `Pay $${totalWithTax}`}
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-slate-900 rounded-lg p-6 border border-slate-800 sticky top-24">
                            <h3 className="text-xl font-semibold text-white mb-6">Order Summary</h3>

                            {/* Cart Items */}
                            <div className="space-y-4 mb-6">
                                {cart.map(item => (
                                    <div key={item.id} className="flex gap-4">
                                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                                        <div className="flex-1">
                                            <p className="text-white font-medium">{item.name}</p>
                                            <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                                            <p className="text-[var(--primary-color)] font-bold">${item.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Totals */}
                            <div className="space-y-3 pt-6 border-t border-slate-700">
                                <div className="flex justify-between text-gray-400">
                                    <span>Subtotal</span>
                                    <span>${getCartTotal().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Tax (10%)</span>
                                    <span>${(getCartTotal() * 0.1).toFixed(2)}</span>
                                </div>
                                <div className="border-t border-slate-700 pt-3">
                                    <div className="flex justify-between text-white text-xl font-bold">
                                        <span>Total</span>
                                        <span className="text-[var(--primary-color)]">${totalWithTax}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Security Badge */}
                            <div className="mt-6 pt-6 border-t border-slate-700">
                                <div className="flex items-center gap-2 text-gray-400 text-sm">
                                    <Lock className="w-4 h-4" />
                                    <span>Secure checkout powered by SSL encryption</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </div>
    );
};

export default CheckoutPage;