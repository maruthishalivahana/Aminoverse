import React from 'react'
import { useUser } from "@clerk/clerk-react";
import {
    SignedIn,
    SignedOut,
    UserButton,
    SignInButton,
    SignUpButton
} from '@clerk/clerk-react';



const AccountName = () => {
    const { isSignedIn, user } = useUser();

    if (!isSignedIn) return null;

    return (
        <div className="text-white font-medium">
            Hello, {user.fullName || user.emailAddresses[0].emailAddress}!
        </div>
    );
};



function Navbar() {
    return (
        <>
            <div className="navbar flex sticky top-0 items-center  mt-2 justify-between   bg-[#061025] sm:pt-3 sm:pb-3 pl-4 pr-4  sm:w-full mt-20 sm:mt-0">
                <div className="logo mr-4 text-left flex justify-start sm:text-xl" >AminoVerse.</div>
                <div className="navlinks">
                    <div className='flex items-center gap-2'>
                        <SignedIn mode="modal">

                            <UserButton
                                afterSignOutUrl="/" className='w-60 h-60' />
                            <AccountName />

                        </SignedIn>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Navbar
