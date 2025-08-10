import { Navigate } from "react-router-dom";
import { useAuth } from "../../store/AuthContext";
import { Skeleton } from "@mui/material";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="text-center p-10"><div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Skeleton */}
      <div className="w-72 bg-white p-6 flex flex-col items-center gap-6 rounded-tr-3xl rounded-br-3xl shadow-lg">
        {/* Profile pic */}
        <Skeleton
          variant="circular"
          width={80}
          height={80}
          className="mb-3"
        />
        <Skeleton variant="text" width={120} height={28} />
        <Skeleton variant="text" width={140} height={18} />
        {/* Sidebar menu */}
        <div className="mt-4 w-full flex flex-col gap-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              width="90%"
              height={32}
              sx={{ borderRadius: "8px", marginBottom: 1 }}
            />
          ))}
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-1 px-8 py-12">
        {/* Header */}
        <Skeleton variant="text" width={260} height={40} sx={{ mb: 1 }} />
        <Skeleton variant="text" width={180} height={24} sx={{ mb: 4 }} />

        {/* Content cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
          {[...Array(4)].map((_, idx) => (
            <div key={idx} className="rounded-xl shadow bg-white p-6">
              <Skeleton
                variant="rectangular"
                width={56}
                height={56}
                sx={{ borderRadius: "14px", mb: 2 }}
              />
              <Skeleton variant="text" width="70%" height={32} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="90%" height={18} />
              <Skeleton variant="text" width="60%" height={12} />
            </div>
          ))}
        </div>
      </div>
    </div></div>;
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (user.isAdmin) {
    // prevent admin from accessing user routes
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

export default PrivateRoute;
