import ProtectedRoute from '@/guard/ProtectedRoute';

export default function Home() {
  return (
    <ProtectedRoute>
      <div className="flex">
        <div className="w-full"></div>
      </div>
    </ProtectedRoute>
  );
}
