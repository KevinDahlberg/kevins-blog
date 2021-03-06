import React from 'react';
import { useHistory } from 'react-router-dom';
import { login } from '../services/auth.service';

export default function Login() {
  const { push } = useHistory();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const user = await login(email, password);
    if (user) {
      push('/admin');
    }
    console.log('formData', formData.get('email'), formData.get('password'));
  };
  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-200">
      <div className="bg-white p-4">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col p-1">
            <label>Email</label>
            <input className="bg-gray-200" type="email" id="email" name="email" />
          </div>
          <div className="flex flex-col p-1">
            <label>Password</label>
            <input className="bg-gray-200" type="password" id="password" name="password" />
          </div>

          <div className="flex justify-center p-1">
            <button className="bg-blue-500 text-white py-1 px-2 m-1">Log in</button>
            <button
              className="bg-gray-500 text-white py-1 px-2 m-1"
              onClick={() => push('/session/register')}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
