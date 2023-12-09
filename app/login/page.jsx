'use client'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../../lib/firebase/index';

const page = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log('Form Values:', { username, password });
        signInWithEmailAndPassword(auth,username,password).then((userCredential)=>{
            console.log(userCredential.user);
        }).catch((err)=>{
            console.log(err.code);
        })
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
                <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2 border rounded shadow appearance-none text-white-700 leading-tight focus:outline-none focus:shadow-outline"
                            autoComplete="off"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded shadow appearance-none text-white-700 leading-tight focus:outline-none focus:shadow-outline"
                            autoComplete="off"
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</button>
                </form>
            </div>
        </div>
    );
};

// Mark the component as a client component
page.clientProps = {
    // client props go here if needed
};

export default page;
