import React from 'react';
import { useHistory } from 'react-router-dom';
import { register } from '../services/auth.service';

export default function Register() {
  const { push } = useHistory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('new-password') as string;
    const confirm = formData.get('confirm-password') as string;
    if (password !== confirm) {
      return;
    }
    const user = await register(email, password);
    if (user) {
      push('/admin');
    }
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
            <input className="bg-gray-200" type="password" id="new-password" name="new-password" />
          </div>
          <div className="flex flex-col p-1">
            <label>Confirm Password</label>
            <input
              className="bg-gray-200"
              type="password"
              id="confirm-password"
              name="confirm-password"
            />
          </div>
          <div className="flex justify-center p-1">
            <button className="bg-blue-500 text-white py-1 px-2 m-1">Register</button>
            <button
              className="bg-gray-500 text-white py-1 px-2 m-1"
              onClick={() => push('/session/login')}
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
