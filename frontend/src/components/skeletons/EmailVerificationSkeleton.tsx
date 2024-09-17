// components/ui/skeletons/EmailVerificationSkeleton.tsx

import React from 'react';
import Image from 'next/image';

export const EmailVerificationSkeleton = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-4 bg-white shadow-md rounded-lg border border-gray-200">
                <div className="animate-pulse">
                    <div className="w-[400px] h-[400px] bg-gray-200 rounded mb-4">
                    {/* <Image src='/icon.png' width={200} height={100} alt='Retruque' className='rounded-md'/> */}
                    
                    </div>
                </div>
            </div>
        </div>
    );
};
