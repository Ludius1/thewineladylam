import React, { useState, useEffect } from 'react';

const AgeVerification = () => {
    const [isVerified, setIsVerified] = useState(true); // Default to true so it doesn't flicker

    useEffect(() => {
        const checkAge = localStorage.getItem('age-verified');
        if (!checkAge) {
            setIsVerified(false);
        }
    }, []);

    const handleVerify = () => {
        localStorage.setItem('age-verified', 'true');
        setIsVerified(true);
    };

    if (isVerified) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm p-4">
            <div className="bg-white p-8 rounded-lg shadow-2xl text-center max-w-md w-full border-t-4 border-red-800">
                <h2 className="text-3xl font-serif font-bold mb-4 text-gray-900">AGE VERIFICATION</h2>
                <p className="text-gray-600 mb-6 uppercase tracking-widest text-sm">
                    You must be 21 years or older to enter this site.
                </p>
                <div className="flex flex-col gap-3">
                    <button 
                        onClick={handleVerify}
                        className="bg-black text-white py-3 px-6 rounded hover:bg-red-900 transition-colors font-bold"
                    >
                        I AM 21 OR OLDER
                    </button>
                    <button 
                        onClick={() => window.location.href = "https://www.google.com"}
                        className="text-gray-400 hover:text-gray-900 text-sm underline mt-2"
                    >
                        I AM UNDER 21
                    </button>
                </div>
                <p className="text-[10px] text-gray-400 mt-6 italic">
                    By entering this site, you agree to our Terms of Service and Privacy Policy. Please drink responsibly.
                </p>
            </div>
        </div>
    );
};

export default AgeVerification;
