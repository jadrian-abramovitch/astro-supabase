import { useState } from "react";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    try {
      await fetch('/api/auth/signin', {
        method: 'POST',
        body: formData
      });
      window.location.href = '/dashboard';
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Sign in</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input 
            id="email" 
            name="email" 
            type="email" 
            required 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input 
            id="password" 
            name="password" 
            type="password" 
            required 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>
        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Signing in...' : 'Login'}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-gray-600">
        New here?{" "}
        <a href="/register" className="font-medium text-primary hover:text-primary/80 transition-colors">
          Create an account
        </a>
      </p>
    </div>
  )
}
