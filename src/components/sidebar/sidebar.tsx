import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4">
      <ul>
        <li className="py-2">
          <Link href="/">
            <span className="hover:bg-gray-700 p-2 rounded">Home</span>
          </Link>
        </li>
        <li className="py-2">
          <Link href="/form">
            <span className="hover:bg-gray-700 p-2 rounded">Form</span>
          </Link>
        </li>
        <li className="py-2">
          <Link href="/select">
            <span className="hover:bg-gray-700 p-2 rounded">Select</span>
          </Link>
        </li>
        <li className="py-2">
          <Link href="/search-user">
            <span className="hover:bg-gray-700 p-2 rounded">Searh User</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
