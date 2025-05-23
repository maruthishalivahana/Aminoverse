import React from 'react'
import Fotter from './Fotter'
import NavLanding from './NavLanding'

function Landingpage() {
    return (
        <>
            <div>
                <NavLanding />
                <div className=" " >
                    <div className='p-4 mt-10'>
                        <h1 className=" fade-in  text-4xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-400 animate-fade-in-up">
                            Explore Proteins Like Never Before
                        </h1>
                        <div className="absolute top-30 sm:top-80 left-0 sm:left-20 right-[53px] w-[200px] h-[200px] bg-pink-400 opacity-30 rounded-full blur-2xl animate-pulse"></div>
                    </div>

                    <div className='rounded m-5 flex items-center justify-center'>
                        <img src="/gene-hero.avif" alt="Hero" className='rounded fade-in sm:w-[600px] sm:h-auto object-cover' />
                    </div>
                </div>
                <p className='mt-10 ml-auto mr-auto text-gray-400  text-center sm:w-3xl align-middle '>Aminoverse is your intelligent bioscience companion. Just type the name of a human gene or protein and get back powerful, visual, and interactive insights — all in a ChatGPT-like experience.</p>
                {/* <div class="absolute top-50 left-50 w-40 h-40 bg-blue-400 opacity-30 rounded-full blur-2xl animate-pulse"></div> */}
                <div className="sm:absolute sm:top-[120px] sm:left-[300px] sm:right-[53px] sm:w-[200px] sm:h-[200px] sm:bg-blue-400 sm:opacity-30 sm:rounded-full sm:blur-2xl sm:animate-pulse"></div>

                <div className="sm:absolute sm:top-[120px] sm:right-[200px] sm:w-[200px] sm:h-[200px] sm:bg-yellow-400 sm:opacity-30 sm:rounded-full sm:blur-2xl sm:animate-pulse"></div>

                <div className="sm:absolute sm:top-[360px] sm:right-[100px] sm:w-[200px] sm:h-[200px] sm:bg-neutral-100 sm:opacity-30 sm:rounded-full sm:blur-2xl sm:animate-pulse"></div>

                <h1 className='text-center align-middle text-3xl text-[#00bef7] mt-10 '>Futures</h1>
                <div className='sm:flex sm:ml-15 sm:mr-15  2xl:text-[16px] block ml-auto mr-auto'>
                    <div className="futures-card block sm:justify-center sm:gap-10   sm:mt-10 shadow-lg  mt-10 ml-5  border-2  border-gray-700 rounded mr-5 p-2 fade-in min-w-[150px]  h-auto" >
                        <h1 className='text-xl text-center text-[#0091ff] mb-4'>Conversational Interface</h1>
                        <p className='text-center '>"Engage with the system just like ChatGPT — follow-up queries, context retention, personalized output, intelligent prompts, and seamless interaction.".</p>

                    </div>
                    <div className="futures-card block sm:justify-center sm:gap-10 sm:mt-10 shadow-lg  mt-10 ml-5  border-2  border-gray-700 rounded mr-5 p-2 fade-in min-w-[150px]  h-auto" >
                        <h1 className='text-xl text-center text-[#0091ff] mb-4' >Biological Functions</h1>
                        <p className='text-center '>Gain a high-level overview of what your selected protein or gene does inside the human body, powered by trusted sources like UniProt..</p>

                    </div>
                    <div className="futures-card block sm:justify-center sm:gap-10 sm:mt-10 shadow-lg  mt-10 ml-5  border-2  border-gray-700 rounded mr-5 p-2 fade-in min-w-[150px]  h-auto" >
                        <h1 className='text-xl text-center text-[#0091ff] mb-4'>Drug Associations</h1>
                        <p className='text-center '>Identify known therapeutic compounds that target your protein, including their mechanisms of action, clinical trial status, and approval stage.</p>

                    </div>
                    <div className="futures-card block sm:justify-center sm:gap-10 sm:mt-10 shadow-lg  mt-10 ml-5  border-2  border-gray-700 rounded mr-5 p-2 fade-in min-w-[150px]  h-auto" >
                        <h1 className='text-xl text-center text-[#0091ff] mb-4'>Variant Insights</h1>
                        <p className='text-center '>Delve into known gene or protein variants and their clinical significance, leveraging genomic datasets such as ClinVar and Ensembl..</p>

                    </div>
                </div>
                <h1 className='text-center align-middle text-3xl text-[#00bef7] mt-10 '>ContactUs</h1>
                <div className='contactus mt-10 flex flex-col  items-center justify-center gap-4 mb-10'>
                    <input type="text" className='p-2  rounded  sm:w-[380px]  w-[280px] mr-10 ml-10 border border-blue-600 in-focus:border-blue-600 ' placeholder='enter your name :' />
                    <input type="mail" placeholder='enter your email :' className='p-2  sm:w-[380px] rounded   w-[280px] mr-10 ml-10 border border-blue-600 in-focus:border-blue-600 ' />
                    <input type="textarea" placeholder='massage' className='p-2  sm:w-[380px] rounded h-[200px]   w-[280px] mr-10 ml-10 border border-blue-600 in-focus:border-blue-600 ' />
                    <button className='bg-blue-400 p-2 rounded w-[150px] ml-10 mr-10 cursor-pointer'>Submit</button>
                </div>
                <div className='text-center m-10 '>
                    <Fotter />
                </div>
            </div>
        </>
    )
}

export default Landingpage
