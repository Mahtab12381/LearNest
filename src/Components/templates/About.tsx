//@ts-nocheck
import { FaHandPointRight } from "react-icons/fa";
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from "react";

const About = () => {
    useEffect(() => {
        AOS.init({ duration: 500 })
        window.scroll(0,0)
    }, [])
    return (
        <div className="mx-20">
            <div className="md:flex">
                <div className='lg:w-1/2 pl-4'>
                    <h3 className='text-4xl text-[#5F2DED] font-bold text-center'>About us</h3>
                    <h1 className="text-5xl font-bold mt-7">We are qualified & of experience in this field</h1>
                    <p className="pl-2 mt-7 border-l-2 border-[#5F2DED] text-gray-500">25+Contrary to popular belief, Lorem Ipsum is not simply random text roots in a piece of classical Latin literature from 45 BC.</p>
                    <p className="mt-8 flex"><FaHandPointRight className="mt-1" />  <span className="ml-8">Lorem Ipsum is simply dummy</span></p>

                    <p className="mt-8 flex"><FaHandPointRight className="mt-1" />  <span className="ml-8">Lorem Ipsum is simply dummy</span></p>

                    <p className="mt-8 flex"><FaHandPointRight className="mt-1" />  <span className="ml-8">Lorem Ipsum is simply dummy</span></p>

                </div>

                <div>
                    <img className="h-[600px] rounded-full" src="/nerd.svg" alt="" />
                </div>
            </div>

            <div className="md:flex gap-20">
                <div data-aos="fade-right">
                    <img className="h-[500px] rounded-full" src="/story.svg" alt="" />
                </div>
                <div className='lg:w-1/2 pl-4' data-aos="fade-left">
                    <h3 className='text-4xl text-[#e319c8] font-bold text-center'>Our Story</h3>
                    <h1 className="text-5xl font-bold mt-7 w-full"></h1>
                    <p className="pl-2 mt-7 border-l-2 border-[#e319c8] text-gray-500">25+Contrary to popular belief, Lorem Ipsum is not simply random text roots in a piece of classical Latin literature from 45 BC. Wow your audience by using these free Education illustrations to communicate conceptual images such as giving a lesson, teaching, taking an exam, or even learning languages. Discover plenty of options and animate these customizable illustrations from the Storyset collection to make your ideas come true! Find on Storyset awesome free customizable illustrations for your next project. Customize, animate and download them to make incredible webs, apps, social…</p>
                    <button className="bg-pink-500 hover:bg-pink-700 text-white font-semibold py-3 px-6 rounded text-xl mt-8 ml-4">Read more</button>

                    
                </div>

                
            </div>

            <div className="mt-10 mb-20">
                <h1 className="text-5xl font-bold text-center mt-5 mb-4"><span className="text-[#5F2DED]">Our</span> Blog</h1>
                <p className="text-center text-gray-500 my-7">Donec nec justo eget felis facilisis
                    ferme ntum. Aliquam porttitor</p>
                <div className="grid md:grid-cols-3 gap-5">
                    <div className="max-w-md overflow-hidden shadow-md transform transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-200 relative" data-aos="zoom-out">
                        <img className="w-full" src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2dyYW1pbmd8ZW58MHx8MHx8fDA%3D" alt="Card Image" />
                        <div className="border-4 border-transparent absolute inset-0 transition duration-300 ease-in-out hover:border-pink-500"></div>
                        <div className="px-6 py-4 relative">
                            <p className="text-xs text-gray-500">Posted on June 18, 2015 /  2 /  ram</p>
                            <h2 className="text-xl font-semibold mb-2 mt-2">Card Title</h2>
                            <p className="text-gray-500 text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            <div className="absolute inset-0 bg-blue-500 opacity-0 hover:opacity-25 transition duration-300 ease-in-out"></div>
                            <button className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-violet-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl mt-7">
                                <span className="absolute inset-0 bg-white opacity-20 transform rotate-45 translate-x-3 -translate-y-2"></span>
                                Read More
                            </button>
                        </div>
                    </div>
                    <div className="max-w-md overflow-hidden shadow-md transform transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-200 relative" data-aos="zoom-in">
                        <img className="w-full" src="https://plus.unsplash.com/premium_photo-1682130147350-c1f80c968967?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZ3JhbWluZ3xlbnwwfHwwfHx8MA%3D%3D" alt="Card Image" />
                        <div className="border-4 border-transparent absolute inset-0 transition duration-300 ease-in-out hover:border-pink-500"></div>
                        <div className="px-6 py-4 relative">
                            <p className="text-xs text-gray-500">Posted on June 18, 2015 /  2 /  ram</p>
                            <h2 className="text-xl font-semibold mb-2 mt-2">Card Title</h2>
                            <p className="text-gray-500 text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            <div className="absolute inset-0 bg-blue-500 opacity-0 hover:opacity-25 transition duration-300 ease-in-out"></div>
                            <button className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-violet-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl mt-7">
                                <span className="absolute inset-0 bg-white opacity-20 transform rotate-45 translate-x-3 -translate-y-2"></span>
                                Read More
                            </button>
                        </div>
                    </div>
                    <div className="max-w-md overflow-hidden shadow-md transform transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-200 relative" data-aos="zoom-out">
                        <img className="w-full h-[256px]" src="https://plus.unsplash.com/premium_photo-1676422355165-d809008b8342?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Ym9va3N8ZW58MHx8MHx8fDA%3D" alt="Card Image" />
                        <div className="border-4 border-transparent absolute inset-0 transition duration-300 ease-in-out hover:border-pink-500"></div>
                        <div className="px-6 py-4 relative">
                            <p className="text-xs text-gray-500">Posted on June 18, 2015 /  2 /  ram</p>
                            <h2 className="text-xl font-semibold mb-2 mt-2">Card Title</h2>
                            <p className="text-gray-500 text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            <div className="absolute inset-0 bg-blue-500 opacity-0 hover:opacity-25 transition duration-300 ease-in-out"></div>
                            <button className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-violet-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl mt-7">
                                <span className="absolute inset-0 bg-white opacity-20 transform rotate-45 translate-x-3 -translate-y-2"></span>
                                Read More
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default About;