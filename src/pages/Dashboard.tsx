import { AudioUploader } from "@/components/AudioUploader";
import { useSession } from "@supabase/auth-helpers-react";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const session = useSession();

  if (!session) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen pt-20 px-4 bg-gradient-to-b from-primary/10 to-secondary/10">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-8">我的帳戶</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">上傳音頻</h2>
            <AudioUploader />
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">我的音頻</h2>
            {/* Add audio list component here later */}
            <p className="text-gray-600">您上傳的音頻將顯示在這裡</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;