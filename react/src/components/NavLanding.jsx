import React from 'react'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import menu from '/menu.svg'
import { Link } from 'react-router-dom';
import {
    SignedIn,
    SignedOut,
    UserButton,
    SignInButton,
    SignUpButton
} from '@clerk/clerk-react';



function NavLanding() {
    // If you want to use a popup, uncomment the next line:
    // const [showPopup, setShowPopup] = React.useState(false);

    // const handleDemoClick = () => {
    //     setShowPopup(true);
    // };

    return (
        <div className='bg-[#061025] p-4 w-full'>
            <div className='container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4'>
                <div className='text-center sm:text-left'>
                    <p className='text-xl font-semibold'>AminoVerse.</p>
                </div>

                <div className='flex items-center justify-center'>
                    <ul className='flex flex-wrap gap-8 text-[12px] sm:text-[16px] xl:text-[18px] justify-center sm:justify-end'>
                        <li className='capitalize hover:text-blue-200 transition-colors'>home</li>
                        <li className='capitalize hover:text-blue-200 transition-colors'>Features</li>
                        <li className='capitalize hover:text-blue-200 transition-colors'>ContactUs</li>
                        <SignedOut>
                            <li>
                                <SignInButton mode="modal" redirectUrl="/home">
                                    <button className='hover:text-blue-200 transition-colors'>Sign in</button>
                                </SignInButton>
                            </li>
                            <li>
                                <SignUpButton modele="modal" redirectUrl="/home">
                                    <button className='hover:text-blue-200 transition-colors'>Sign up</button>
                                </SignUpButton>
                            </li>
                        </SignedOut>


                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NavLanding
