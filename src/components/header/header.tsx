'use client';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="w-full px-6 py-4 bg-white border-b flex justify-between items-center shadow-sm">
      <h1 className="text-xl font-semibold text-gray-800">Playground App</h1>

      {user && (
        <div className="flex items-center space-x-4">
          <span className="text-gray-700">👋 Hey, {user.username}</span>
          <button
            onClick={logout}
            className="cursor-pointer bg-red-500 text-white px-4 py-1.5 rounded hover:bg-red-600 transition"
          >
            Log Out
          </button>
        </div>
      )}
    </header>
  );
}
