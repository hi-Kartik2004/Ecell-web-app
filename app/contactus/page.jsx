'use client'
import Head from 'next/head';
import { useState } from 'react';
import FooterSection from '../(sections)/FooterSection';
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../lib/firebase/index';
import { Separator } from '@/components/ui/separator';

const page = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [isSubmit, setisSubmit] = useState("")

    const userCollection = collection(db, "contactData")

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addDoc(userCollection, formData)
        setisSubmit("We recieved your message and will get back to you soon!")
        setFormData({
            name: '',
            email: '',
            message: '',
        })
        // console.log('Form Data:', formData);
    };

    return (
        <main>
            <section className="text-gray-600 body-font relative min-h-screen">
                <div className="absolute inset-0 bg-gray-300">
                    <iframe
                        width="100%"
                        height="100%"
                        title="map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4389.3471894774875!2d77.58387051434795!3d12.975611486485349!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1672fcfc6af1%3A0x9c2dc517c9231979!2sUVCE!5e0!3m2!1sen!2sin!4v1702567242179"
                        style={{ filter: 'grayscale(0.1) contrast(1.2) opacity(0.8)' }}
                    ></iframe>
                </div>
                <div className="container px-5 py-24 mx-auto flex">
                    <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
                        <h2 className="text-2xl text-primary font-bold mb-4">Contact Us</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded shadow appearance-none text-white-700 leading-tight focus:outline-none focus:shadow-outline"
                                    autoComplete="off"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded shadow appearance-none text-white-700 leading-tight focus:outline-none focus:shadow-outline"
                                    autoComplete="off"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Message:</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full px-3 py-2 border rounded shadow appearance-none text-white-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                ></textarea>
                            </div>
                            <p className='text-primary'>{isSubmit}</p>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:shadow-outline"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                        <br />
                        <Separator />
                        <br />
                        <div className="flex items-center justify-evenly">
                            <h2><a href="mailto:someone@example.com">icon</a></h2>
                            <h2><a href="mailto:someone@example.com">icon</a></h2>
                            <h2><a href="mailto:someone@example.com">icon</a></h2>
                            <h2><a href="tel:+91 98862 25685">icon</a></h2>
                        </div>
                    </div>
                </div>
            </section>


            {/* <div className="flex items-center justify-center min-h-screen p-4">
                <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md z-100">
                    <h2 className="text-2xl text-primary font-bold mb-4">Contact Us</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded shadow appearance-none text-white-700 leading-tight focus:outline-none focus:shadow-outline"
                                autoComplete="off"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded shadow appearance-none text-white-700 leading-tight focus:outline-none focus:shadow-outline"
                                autoComplete="off"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Message:</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-3 py-2 border rounded shadow appearance-none text-white-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            ></textarea>
                        </div>
                        <p className='text-primary'>{isSubmit}</p>
                        <div>
                            <button
                                type="submit"
                                className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:shadow-outline"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div> */}
            <Separator />
            <FooterSection />
        </main>
    );
};

export default page;
