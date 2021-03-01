import React from "react";

export default function Login() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    console.log("formData", formData.get("email"), formData.get("password"));
  };
  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-200">
      <div className="bg-white p-4">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col p-1">
            <label>Email</label>
            <input type="email" id="email" name="email" />
          </div>
          <div className="flex flex-col p-1">
            <label>Password</label>
            <input type="password" id="password" name="password" />
          </div>

          <div className="flex justify-center p-1">
            <button className="bg-blue-500 text-white py-1 px-2">Log in</button>
          </div>
        </form>
      </div>
    </div>
  );
}
