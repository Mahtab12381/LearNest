//@ts-nocheck
import { FaHandPointRight, FaLeanpub, FaLightbulb, FaQuoteLeft } from "react-icons/fa";
import ScrollTrigger from "react-scroll-trigger";
import CountUp from 'react-countup';
import { useEffect, useState } from "react";
// import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import AOS from 'aos'
import 'aos/dist/aos.css'

// import './styles.css';
import { Parallax, Pagination, Navigation } from 'swiper/modules';
import { Link } from "react-router-dom";
import { MdLibraryBooks } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import { FcPositiveDynamic, FcShipped, FcSmartphoneTablet, FcSms } from "react-icons/fc";


const Home = () => {

    const [counterOn, setCounterOn] = useState(false);

    useEffect(() => {
        AOS.init({ duration: 500 })
    }, [])

    return (
        <div className="md:mx-20">

            {/* Banner section */}

            <div className="md:flex bg-[#5F2DED] bg-gradient-to-r from-violet-800 via-violet-600 to-violet-400  text-white font-bold py-2 px-4 rounded-2xl">
                <div>
                    <h3 className="text-3xl text-pink-500 mt-5 ml-4">Education solution</h3>
                    <h1 className="text-6xl mt-4 font-bold ml-4">Cloud-based LMS <br /> Trusted by 1000+</h1>
                    <h3 className="text-3xl mt-4 font-semibold ml-4">Lorem Ipsum is simply dummy text of the printing typesetting <br />industry. Lorem Ipsum has been</h3>

                    {/* Buttons */}

                    <div className="mt-6 ml-4">
                        <button className="bg-pink-500 hover:bg-pink-700 text-white font-semibold py-3 px-6 rounded text-xl mr-8">Click me</button>
                        <button className="hover:text-pink-500 font-semibold text-xl">Find out more</button>
                    </div>
                </div>

                <div>
                    <img className="h-[500px] md:pl-24 pr-10" src="/people.svg" alt="" />
                </div>
            </div>

            {/* sponsor section */}

            <div className="grid grid-cols-2 gap-5 mx-3 md:grid-cols-4 mt-10">
                <img className="h-14" src="https://assets-global.website-files.com/636dd759d7128716627e62a9/636dd759d71287cd407e62bd_Group%2047.svg" alt="" />
                <img className="h-14" src="https://assets-global.website-files.com/636dd759d7128716627e62a9/636dd759d712874df97e6332_Vector-5.svg" alt="" />
                <img className="h-14 ml-10" src="https://assets-global.website-files.com/636dd759d7128716627e62a9/636dd759d7128746107e6310_Vector-3.svg" alt="" />
                <img className="h-14" src="https://assets-global.website-files.com/636dd759d7128716627e62a9/636dd759d71287f1797e6321_Vector-4.svg" alt="" />
            </div>


            {/* About section */}

            <div className="hero-content lg:flex mt-20">
                <div className='lg:w-1/2 relative' data-aos='fade-down-left'>
                    <img src="https://cdn.pixabay.com/photo/2020/10/06/14/09/graduate-5632326_640.jpg" className="w-3/4 rounded-lg shadow-2xl h-[500px]" />
                    <img src="https://cdn.pixabay.com/photo/2017/08/07/22/28/man-2608588_640.jpg" className="w-1/2 absolute right-4 top-[300px] rounded-lg shadow-2xl border-4 border-white" />
                    <h1 className="absolute top-[410px] py-4 px-3 shadow-2xl bg-white text-lg animate-bounce font-bold text-pink-500 border-l-2 border-[#5F2DED]">30+ YEARS EXPERIENCE <br /> JUST ACHIVED</h1>
                </div>
                <div className='lg:w-1/2 pl-4' data-aos='fade-down-right'>
                    <h3 className='text-3xl text-[#5F2DED] font-bold'>About us</h3>
                    <h1 className="text-5xl font-bold mt-7">We are qualified & of experience in this field</h1>
                    <p className="pl-2 mt-7 border-l-2 border-[#5F2DED] text-gray-500">25+Contrary to popular belief. We are serving from 2001 maintaining out glory.</p>
                    <p className="mt-8 flex"><FaHandPointRight className="mt-1" />  <span className="ml-8">Free Courses</span></p>

                    <p className="mt-8 flex"><FaHandPointRight className="mt-1" />  <span className="ml-8">Video and Documents</span></p>

                    <p className="mt-8 flex"><FaHandPointRight className="mt-1" />  <span className="ml-8">Assignment and quiz</span></p>

                </div>
            </div>

            {/* countup */}

            <ScrollTrigger onEnter={() => setCounterOn(true)} onExit={() => setCounterOn(false)}>
                <div className='py-14'>

                    <h1 className=" text-4xl font-bold text-center pt-5 mt-10 text-[#5F2DED]">
                        Learn something new & Build Your Career From Anywhere In The World
                    </h1>


                </div>
                <div className='grid grid-cols-2 md:grid-cols-4 justify-evenly gap-10 py-10'>
                    <div className="flex" data-aos="flip-up">
                        <FaLeanpub className="text-6xl mr-3 text-pink-600" />
                        <div className='' data-aos='flip-right'>
                            {counterOn && <CountUp className='text-3xl font-bold text-center' start={0} end={13} duration={2} delay={0}></CountUp>}  <span className='text-3xl font-bold'>K</span><br /><span>Total Acheivment</span>
                        </div>
                    </div>
                    <div className="flex" data-aos="flip-down">
                        <FaLightbulb className="text-6xl mr-3 text-pink-600" />
                        <div className='' data-aos='flip-right'>
                            {counterOn && <CountUp className='text-3xl font-bold text-center' start={0} end={74} duration={2} delay={0}></CountUp>}  <span className='text-3xl font-bold'>K</span><br /><span>TOTAL STUDENTS</span>
                        </div>
                    </div>
                    <div className="flex" data-aos="flip-up">
                        <MdLibraryBooks className="text-6xl mr-3 text-pink-600" />
                        <div className='' data-aos='flip-right'>
                            {counterOn && <CountUp className='text-3xl font-bold text-center' start={0} end={30} duration={2} delay={0}></CountUp>}  <span className='text-3xl font-bold'>K</span><br /><span>Total Acheivment</span>
                        </div>
                    </div>
                    <div className="flex" data-aos="flip-up">
                        <PiStudentFill className="text-6xl mr-3 text-pink-600" />
                        <div className='' data-aos='flip-right'>
                            {counterOn && <CountUp className='text-3xl font-bold text-center' start={0} end={1300} duration={2} delay={0}></CountUp>}  <span className='text-3xl font-bold'>K</span><br /><span>Total Acheivment</span>
                        </div>
                    </div>
                </div>
            </ScrollTrigger>


            {/* popular subject */}


            <div className="grid md:grid-cols-2">
                <div className="mt-20" data-aos="zoom-in">
                    <button className="text-[#5F2DED] font-semibold bg-gray-300 px-4 ml-10 py-1 rounded-xl">Popular subject</button>

                    <div className=' pl-4'>
                        <h1 className="text-5xl font-bold mt-7">Provide It & Technol
                            Subject For You</h1>
                        <p className="pl-2 mt-7 border-l-2 border-[#5F2DED] text-gray-500">25+Contrary to popular belief, Lorem Ipsum is not simply random text roots in a piece of classical Latin literature from 45 BC.</p>
                        <p className="pl-2 mt-7 border-l-2 border-[#5F2DED] text-gray-500">25+Contrary to popular belief, Lorem Ipsum is not simply random text roots in a piece of classical Latin literature from 45 BC. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas ipsam animi obcaecati quos officiis praesentium ratione doloribus cupiditate eius consectetur.</p>

                    </div>
                    <button className="bg-pink-500 hover:bg-pink-700 text-white font-semibold py-3 px-6 rounded text-xl mt-10 ml-5 mb-5">Click me</button>

                </div>

                <div className="grid md:grid-cols-2 ml-14">

                    <div className="">
                        <div className="w-[250px] h-[280px] bg-gray-300 p-5 rounded-xl hover:bg-[#5F2DED] hover:text-white" data-aos="zoom-in-left">
                            <FcSms className="text-5xl mr-3 text-pink-600 mt-3" />
                            <button className="text-2xl font-bold hover:text-pink-500 mt-3">Machine Learning</button>
                            <p className="mt-3">Construction is a general term the art and science to form</p>
                            <button className="font-bold hover:text-pink-500 mt-3">View More</button>
                        </div>
                        <div className="w-[250px] h-[280px] bg-gray-300 p-5 rounded-xl hover:bg-[#5F2DED] mt-5 hover:text-white" data-aos="zoom-in-right">
                            <FcSmartphoneTablet className="text-5xl mr-3 text-pink-600 mt-3" />
                            <button className="text-2xl font-bold hover:text-pink-500 mt-3">Machine Learning</button>
                            <p className="mt-3">Construction is a general term the art and science to form</p>
                            <button className="font-bold hover:text-pink-500 mt-3">View More</button>
                        </div>
                    </div>
                    <div className="mt-14">
                        <div className="w-[250px] h-[280px] bg-gray-300 p-5 hover:bg-[#5F2DED] hover:text-white rounded-xl" data-aos="zoom-in-left">
                            <FcShipped className="text-5xl mr-3 text-pink-600 mt-3" />
                            <button className="text-2xl font-bold hover:text-pink-500 mt-3">Machine Learning</button>
                            <p className="mt-3">Construction is a general term the art and science to form</p>
                            <button className="font-bold hover:text-pink-500 mt-3">View More</button>
                        </div>
                        <div className="w-[250px] h-[280px] bg-gray-300 p-5 rounded-xl hover:bg-[#5F2DED] mt-5 hover:text-white" data-aos="zoom-in-right">
                            <FcPositiveDynamic className="text-5xl mr-3 text-pink-600 mt-3"/>
                            <button className="text-2xl font-bold hover:text-pink-500 mt-3">Machine Learning</button>
                            <p className="mt-3">Construction is a general term the art and science to form</p>
                            <button className="font-bold hover:text-pink-500 mt-3">View More</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* career */}

            <div className="mt-20 flex">
                <div>
                    <button className="text-[#5F2DED] font-semibold bg-gray-300 px-4 ml-10 py-1 rounded-xl">Popular subject</button>
                    <h1 className="text-5xl font-bold mt-7">Perfect Online <br /> Course Your Carrer</h1>
                </div>

                <div className="mt-20 ml-7">
                    <button className="text-[#5F2DED] font-semibold bg-gray-300 px-4 ml-10 py-1 rounded-xl mt-2">See All</button>
                    <button className="text-[#5F2DED] font-semibold bg-gray-300 px-4 ml-10 py-1 rounded-xl mt-2">Data Science</button>
                    <button className="text-[#5F2DED] font-semibold bg-gray-300 px-4 ml-10 py-1 rounded-xl mt-2">Featured</button>
                    <button className="text-[#5F2DED] font-semibold bg-gray-300 px-4 ml-10 py-1 rounded-xl mt-2">Popular</button>
                    <button className="text-[#5F2DED] font-semibold bg-gray-300 px-4 ml-10 py-1 rounded-xl mt-2">Popular</button>
                </div>
            </div>

            {/* swiper */}

            <div className='w-2/3 mx-auto my-24' data-aos="zoom-out-down">
                <Swiper
                    style={{
                        '--swiper-navigation-color': '#5F2DED',
                        '--swiper-pagination-color': '#fff',
                    }}
                    speed={600}
                    parallax={true}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Parallax, Pagination, Navigation]}
                    className="mySwiper"
                >
                    <div
                        slot="container-start"
                        className="parallax-bg"
                        style={{
                            'background-image':
                                'url(https://swiperjs.com/demos/images/nature-1.jpg)',
                        }}
                        data-swiper-parallax="-23%"
                    ></div>
                    <SwiperSlide>

                        <div>
                            <div className="text flex px-10 gap-3" data-swiper-parallax="-100">
                                <FaQuoteLeft className='text-9xl pb-20'></FaQuoteLeft>
                                <p className=''>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                                    dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla
                                    laoreet justo vitae porttitor porttitor. Suspendisse in sem justo.
                                    Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod.
                                    Aliquam hendrerit lorem at elit facilisis rutrum. Ut at
                                    ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec,
                                    tincidunt ut libero. Aenean feugiat non eros quis feugiat.
                                </p>

                            </div>
                            <hr className='text-[#5F2DED] border-[#5F2DED] mt-5 w-3/4 mx-auto' />
                            <div className='flex gap-5 items-center w-2/3 mx-auto'>
                                <img className='h-28 w-28 rounded-full mt-5 border-4 border-[#5F2DED]' src="https://orga.wpengine.com/wp-content/uploads/2015/06/clients7.jpg" alt="" />
                                <p className='text-lg font-bold text-[#5F2DED] '>Garry holmes</p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>

                        <div>
                            <div className="text flex px-10 gap-3" data-swiper-parallax="-100">
                                <FaQuoteLeft className='text-9xl pb-20'></FaQuoteLeft>
                                <p className=''>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                                    dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla
                                    laoreet justo vitae porttitor porttitor. Suspendisse in sem justo.
                                    Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod.
                                    Aliquam hendrerit lorem at elit facilisis rutrum. Ut at
                                    ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec,
                                    tincidunt ut libero. Aenean feugiat non eros quis feugiat.
                                </p>

                            </div>
                            <hr className='text-[#5F2DED] border-[#5F2DED] mt-5 w-3/4 mx-auto' />
                            <div className='flex gap-5 items-center w-2/3 mx-auto'>
                                <img className='h-28 w-28 rounded-full mt-5 border-4 border-[#5F2DED]' src="https://orga.wpengine.com/wp-content/uploads/2015/06/clients7.jpg" alt="" />
                                <p className='text-lg font-bold text-[#5F2DED] '>Garry holmes</p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>

                        <div>
                            <div className="text flex px-10 gap-3" data-swiper-parallax="-100">
                                <FaQuoteLeft className='text-9xl pb-20'></FaQuoteLeft>
                                <p className=''>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                                    dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla
                                    laoreet justo vitae porttitor porttitor. Suspendisse in sem justo.
                                    Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod.
                                    Aliquam hendrerit lorem at elit facilisis rutrum. Ut at
                                    ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec,
                                    tincidunt ut libero. Aenean feugiat non eros quis feugiat.
                                </p>

                            </div>
                            <hr className='text-[#5F2DED] border-[#5F2DED] mt-5 w-3/4 mx-auto' />
                            <div className='flex gap-5 items-center w-2/3 mx-auto'>
                                <img className='h-28 w-28 rounded-full mt-5 border-4 border-[#5F2DED]' src="https://orga.wpengine.com/wp-content/uploads/2015/06/clients7.jpg" alt="" />
                                <p className='text-lg font-bold text-[#5F2DED] '>Garry holmes</p>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>

            <div>
                <li className="bg-blue-950 text-white text-center"><Link to='/about'>About</Link></li>
            </div>
        </div>
    );
};

export default Home;