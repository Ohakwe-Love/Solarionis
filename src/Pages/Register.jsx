import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Check, Mail, User, Building, Users, PiggyBank, Shield } from 'lucide-react';

export default function Register() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Investment Type
    investmentType: '',

    // Step 2: Email Verification
    email: '',
    verificationCode: '',

    // Step 3: Personal Details
    firstName: '',
    lastName: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const investmentTypes = [
    {
      id: 'individual',
      title: 'Individual Investor',
      description: 'Start investing with as little as $100',
      icon: User,
      color: 'blue'
    },
    {
      id: 'business',
      title: 'Small Business',
      description: 'Diversify your business investments',
      icon: Building,
      color: 'green'
    },
    {
      id: 'non-accredited',
      title: 'Non-Accredited',
      description: 'Everyone can participate',
      icon: Users,
      color: 'purple'
    },
    {
      id: 'ira',
      title: 'IRA & 401(k)',
      description: 'Tax-advantaged retirement accounts',
      icon: PiggyBank,
      color: 'orange'
    },
    {
      id: 'wealth-manager',
      title: 'Wealth Manager',
      description: 'Access for your clients',
      icon: Shield,
      color: 'indigo'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleInvestmentTypeSelect = (type) => {
    setFormData(prev => ({ ...prev, investmentType: type }));
    setErrors(prev => ({ ...prev, investmentType: '' }));
  };

  // Step 1 Validation
  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.investmentType) {
      newErrors.investmentType = 'Please select an investment type';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Step 2 Validation
  const validateStep2 = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (emailSent && !formData.verificationCode) {
      newErrors.verificationCode = 'Verification code is required';
    } else if (emailSent && formData.verificationCode.length !== 6) {
      newErrors.verificationCode = 'Verification code must be 6 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Step 3 Validation
  const validateStep3 = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // API Call to send verification email
  const sendVerificationEmail = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('YOUR_API_URL/api/auth/send-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email
        })
      });

      const data = await response.json();

      if (response.ok) {
        setEmailSent(true);
        // Show success message
        alert('Verification code sent to your email!');
      } else {
        setErrors({ email: data.message || 'Failed to send verification email' });
      }
    } catch (error) {
      setErrors({ email: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  // API Call to verify code
  const verifyCode = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('YOUR_API_URL/api/auth/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          code: formData.verificationCode
        })
      });

      const data = await response.json();

      if (response.ok) {
        setCurrentStep(3);
      } else {
        setErrors({ verificationCode: data.message || 'Invalid verification code' });
      }
    } catch (error) {
      setErrors({ verificationCode: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  // API Call to complete registration
  const completeRegistration = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('YOUR_API_URL/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          investment_type: formData.investmentType,
          email: formData.email,
          verification_code: formData.verificationCode,
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
          date_of_birth: formData.dateOfBirth,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip_code: formData.zipCode,
          password: formData.password,
          password_confirmation: formData.confirmPassword
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Store token if using Sanctum
        if (data.token) {
          localStorage.setItem('auth_token', data.token);
        }
        // Redirect to dashboard or show success message
        alert('Registration successful!');
        window.location.href = '/dashboard';
      } else {
        setErrors(data.errors || { general: data.message });
      }
    } catch (error) {
      setErrors({ general: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      if (!emailSent) {
        sendVerificationEmail();
      } else {
        verifyCode();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep3()) {
      completeRegistration();
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-sm sm:text-base transition-all ${currentStep >= step
                        ? 'bg-(--solar-gold) text-black'
                        : 'bg-gray-300 text-gray-600'
                      }`}
                  >
                    {currentStep > step ? <Check className="w-5 h-5 sm:w-6 sm:h-6" /> : step}
                  </div>
                  <span className="text-xs sm:text-sm mt-2 text-gray-600 text-center">
                    {step === 1 ? 'Investment Type' : step === 2 ? 'Email Verify' : 'Details'}
                  </span>
                </div>
                {step < 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition-all ${currentStep > step ? 'bg-(--solar-gold)' : 'bg-gray-300'
                      }`}
                  ></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10">

          {/* Step 1: Investment Type */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Choose Your Investment Type
              </h2>
              <p className="text-gray-600 mb-8">
                Select the category that best describes you
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {investmentTypes.map((type) => {
                  const IconComponent = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => handleInvestmentTypeSelect(type.id)}
                      className={`p-6 rounded-2xl cursor-pointer border-2 transition-all text-left hover:shadow-lg ${formData.investmentType === type.id
                          ? 'border-(--solar-gold) bg-(--solar-gold)/10'
                          : 'border-gray-200 hover:border-(--solar-gold)/50'
                        }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-full bg-${type.color}-100 flex items-center justify-center flex-shrink-0`}>
                          <IconComponent className={`w-6 h-6 text-${type.color}-600`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 mb-1">{type.title}</h3>
                          <p className="text-sm text-gray-600">{type.description}</p>
                        </div>
                        {formData.investmentType === type.id && (
                          <Check className="w-6 h-6 text-(--solar-gold) flex-shrink-0" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {errors.investmentType && (
                <p className="text-red-500 text-sm mb-4">{errors.investmentType}</p>
              )}

              <button
                onClick={handleNext}
                className="w-full cursor-pointer bg-(--solar-gold) text-black font-bold py-4 rounded-full hover:opacity-90 transition-all flex items-center justify-center gap-2"
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Step 2: Email Verification */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Verify Your Email
              </h2>
              <p className="text-gray-600 mb-8">
                {!emailSent
                  ? 'Enter your email address to receive a verification code'
                  : 'Enter the 6-digit code sent to your email'}
              </p>

              <div className="space-y-6 mb-8">
                {!emailSent ? (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-(--solar-gold) focus:outline-none transition-all"
                        placeholder="you@example.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-2">{errors.email}</p>
                    )}
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Verification Code
                    </label>
                    <input
                      type="text"
                      name="verificationCode"
                      value={formData.verificationCode}
                      onChange={handleInputChange}
                      maxLength="6"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-(--solar-gold) focus:outline-none transition-all text-center text-2xl tracking-widest"
                      placeholder="000000"
                    />
                    {errors.verificationCode && (
                      <p className="text-red-500 text-sm mt-2">{errors.verificationCode}</p>
                    )}
                    <button
                      onClick={sendVerificationEmail}
                      disabled={isLoading}
                      className="text-(--solar-gold) cursor-pointer text-sm mt-2 hover:underline"
                    >
                      Resend Code
                    </button>
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleBack}
                  className="flex-1 cursor-pointer bg-gray-200 text-gray-700 font-bold py-4 rounded-full hover:bg-gray-300 transition-all flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={isLoading}
                  className="flex-1 cursor-pointer bg-(--solar-gold) text-black font-bold py-4 rounded-full hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? 'Processing...' : 'Continue'}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Personal Details */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Complete Your Profile
              </h2>
              <p className="text-gray-600 mb-8">
                Provide your personal information to finish registration
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-(--solar-gold) focus:outline-none transition-all"
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-(--solar-gold) focus:outline-none transition-all"
                      placeholder="Doe"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Contact Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-(--solar-gold) focus:outline-none transition-all"
                      placeholder="+1 (555) 000-0000"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-(--solar-gold) focus:outline-none transition-all"
                    />
                    {errors.dateOfBirth && (
                      <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>
                    )}
                  </div>
                </div>

                {/* Address Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-(--solar-gold) focus:outline-none transition-all"
                    placeholder="123 Main Street"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                  )}
                </div>

                {/* City, State, ZIP */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-(--solar-gold) focus:outline-none transition-all"
                      placeholder="New York"
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-(--solar-gold) focus:outline-none transition-all"
                      placeholder="NY"
                    />
                    {errors.state && (
                      <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-(--solar-gold) focus:outline-none transition-all"
                      placeholder="10001"
                    />
                    {errors.zipCode && (
                      <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
                    )}
                  </div>
                </div>

                {/* Password Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-(--solar-gold) focus:outline-none transition-all"
                      placeholder="••••••••"
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-(--solar-gold) focus:outline-none transition-all"
                      placeholder="••••••••"
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                    )}
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      className="w-5 h-5 mt-0.5 accent-(--solar-gold) cursor-pointer"
                    />
                    <span className="text-sm text-gray-700">
                      I agree to the{' '}
                      <a href="/terms" className="text-(--solar-gold) hover:underline">
                        Terms and Conditions
                      </a>{' '}
                      and{' '}
                      <a href="/privacy" className="text-(--solar-gold) hover:underline">
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                  {errors.agreeToTerms && (
                    <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms}</p>
                  )}
                </div>

                {errors.general && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <p className="text-red-600 text-sm">{errors.general}</p>
                  </div>
                )}

                {/* Submit Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 cursor-pointer bg-gray-200 text-gray-700 font-bold py-4 rounded-full hover:bg-gray-300 transition-all flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 cursor-pointer bg-(--solar-gold) text-black font-bold py-4 rounded-full hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Login Link */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-(--solar-gold) font-semibold hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}