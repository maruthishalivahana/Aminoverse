import React from 'react';
import { SignIn } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#0A0F1D] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
                    Login to AminoVerse
                </h2>
                <SignIn
                    routing="path"
                    path="/login"
                    signUpUrl="/sign-up"
                    redirectUrl="/home"
                    afterSignInUrl="/home"
                    appearance={{
                        elements: {
                            formButtonPrimary:
                                'bg-blue-600 hover:bg-blue-700 text-sm normal-case',
                            card: 'bg-white shadow-none',
                            headerTitle: 'text-2xl font-bold text-gray-800',
                            headerSubtitle: 'text-gray-600',
                            socialButtonsBlockButton:
                                'border border-gray-300 hover:bg-gray-50',
                            formFieldInput:
                                'border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                            footerActionLink:
                                'text-blue-600 hover:text-blue-700',
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default Login; 