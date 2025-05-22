import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate();

    const handleDemoLogin = () => {
        setemail("demoexample@gmail.com");
        setpassword("1234");
        setTimeout(() => {
            alert("Login as demo user");
            navigate("/home");
        }, 1000);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // form login logic if needed
    };

    return (
        <>
            <div className="min-h-screen bg-[#0A0F1D] flex items-center justify-center px-4">
                <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
                        Login to your account
                    </h2>
                    <form className="space-y-5 " onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none text-black  focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="ml-2 text-gray-600">Remember me</span>
                            </label>
                            <a href="#" className="text-blue-600 hover:underline">
                                Forgot password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                            onClick={handleDemoLogin}
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
