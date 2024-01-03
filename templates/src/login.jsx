import axios from 'axios';
import { useState } from 'react';

export default function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleInput = (event) => {
    const user = event.target.value;
    setEmail(user);
  };

  const handlePass = (event) => {
    const pass = event.target.value;
    setPassword(pass);
  };


  const handleLogin = async () => {
    const response = await axios.post(`http://localhost:5000/user/login`, {
      email,
      password,
    });
    const token = response.data.token;
    localStorage.setItem('token', token)
    window.location.assign('/create');
  };

  const handleLogout = () => {
    window.location.assign('/auth/login');
  };

  return (
    <section className="w-full bg-custom-primary">
      <div className="flex items-center min-h-screen bg-custom-secondary">
        <div className="container max-w-md mx-auto transition duration-300 shadow-md hover:shadow-lg">
          <div className="p-10 py-12 bg-custom-primary">
            <div className="mb-6">
              <h2 className="text-2xl font-bold tracking-tighter text-center lg:text-4xl lg:mb-5 text-custom-tertiary">
                USER
              </h2>
              <label
                className="inline-block mb-2 mr-4 font-bold text-custom-tertiary"
                htmlFor="name"
              >
                Email
              </label>
              <input
                type="text"
                placeholder="email"
                className="w-full max-w-xs input input-bordered input-accent text-custom-tertiary "
                onChange={handleInput}
              />
            </div>
            <div className="mb-6">
              <label
                className="inline-block mb-2 mr-4 font-bold text-custom-tertiary"
                htmlFor="name"
              >
                Password
              </label>
              <input
                type="password"
                placeholder="Type here"
                className="w-full max-w-xs input input-bordered input-accent text-custom-tertiary"
                onChange={handlePass}
              />
            </div>
            <div className="flex justify-center">
              <button
                className="w-full mb-5 rounded-full lg:w-1/4 btn btn-accent btn-outline lg:px-20 text-custom-primary"
                onClick={handleLogin}
              >
                <span className="text-base">Login</span>
              </button>
            </div>
            <button className="text-blue-600" onClick={() => { window.location.assign("/register") }}>create account</button>
          </div>
        </div>
      </div>

    </section>
  );
}

