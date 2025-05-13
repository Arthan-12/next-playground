'use client';
import ProtectedRoute from '@/guard/ProtectedRoute';
import { userService } from '@/services/user/user-services';
import { useState } from 'react';

export default function SearchUser() {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    userService.searchUsers(query.trim()).then((res) => {
      console.log(res);
    });
  };
  return (
    <ProtectedRoute>
      <div className="flex flex-col text-left w-64 p-4">
        <div className="inline-flex w-full rounded-md border border-gray-300 shadow-sm bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500">
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm"
          />
        </div>
        <button
          onClick={handleSearch}
          className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-md shadow-sm transition"
        >
          Search
        </button>
      </div>
    </ProtectedRoute>
  );
}
