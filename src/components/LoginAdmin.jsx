import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase-config.js';

export default function LoginAdmin(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [feedback, setFeedback] = useState('');

    const handleAuth = async (event) => {
        event.preventDefault();
    
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setFeedback('Login successful!');
          }
         catch (error) {
          const errorMessage = error.message.replace('Firebase:', '');
          setFeedback(errorMessage);
        }
    
        setEmail('');
        setPassword('');
      };

  return (
    <div className="w-full max-w-xs bg-gradient-to-b from-gray-600 to-gray-700 p-8 rounded-lg shadow-2xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">Login as {props.type}</h2>
      <form className="space-y-4" onSubmit={handleAuth}>
        <div>
          <label className="block text-sm font-medium text-gray-300">Email</label>
          <input
            type="email"
            autoFocus={true} 
            value={email}   
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your Email'        
            className="mt-1 block w-full px-3 py-2 border bg-gray-200 border-gray-500 rounded-md shadow-xl placeholder-gray-400 focus:outline-none focus:ring-gray-400 focus:border-gray-400"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter your Password'
            className="mt-1 block w-full px-3 py-2 bg-gray-200 border border-gray-500 rounded-md shadow-xl placeholder-gray-400 focus:outline-none focus:ring-gray-400 focus:border-gray-400"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full shadow-xl bg-gray-500 text-white py-2 px-4 rounded-md hover:scale-105 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
        >
          Login
        </button>
        <h1>{ feedback }</h1>
      </form>
    </div>
  );
}
