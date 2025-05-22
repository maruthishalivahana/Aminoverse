import React from 'react';
import { SignUp } from '@clerk/clerk-react';

const SignUpPage = () => {
    return (
        <div className="min-h-screen bg-[#0A0F1D] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
                    Create your AminoVerse account
                </h2>
                <SignUp
                    routing="path"
                    path="/sign-up"
                    signInUrl="/login"
                    redirectUrl="/home"
                    afterSignUpUrl="/home"
                />
            </div>
        </div>
    );
};

export default SignUpPage; 