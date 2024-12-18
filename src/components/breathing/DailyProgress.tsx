import { useState, useEffect } from "react";
import { Award, Check, Trophy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const DailyProgress = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [completions, setCompletions] = useState<number>(0);
  const [todayCompleted, setTodayCompleted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const goalCount = 7;

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    console.log('Auth check:', user ? 'User is authenticated' : 'User is not authenticated');
    setIsAuthenticated(!!user);
    if (user) {
      fetchCompletions();
    }
  };

  const fetchCompletions = async () => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;

      const startOfWeek = new Date();
      startOfWeek.setHours(0, 0, 0, 0);
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

      const { data, error } = await supabase
        .from('breathing_completions')
        .select('*')
        .gte('completed_at', startOfWeek.toISOString())
        .eq('user_id', user.user.id);

      if (error) throw error;

      setCompletions(data.length);

      const today = new Date().toISOString().split('T')[0];
      const completedToday = data.some(
        completion => completion.completed_at.split('T')[0] === today
      );
      setTodayCompleted(completedToday);
    } catch (error) {
      console.error('Error fetching completions:', error);
    }
  };

  const recordCompletion = async () => {
    if (!isAuthenticated) {
      toast({
        title: "請先登入",
        description: "需要登入才能記錄進度",
      });
      navigate('/login');
      return;
    }

    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) {
        navigate('/login');
        return;
      }

      if (todayCompleted) {
        toast({
          title: "今天已完成",
          description: "明天繼續保持！",
        });
        return;
      }

      const { error } = await supabase
        .from('breathing_completions')
        .insert([
          { 
            user_id: user.user.id,
            exercise_type: 'daily'
          }
        ]);

      if (error) throw error;

      setCompletions(prev => prev + 1);
      setTodayCompleted(true);

      toast({
        title: "太棒了！",
        description: `本週已完成 ${completions + 1} 次呼吸練習`,
      });

      if (completions + 1 >= goalCount) {
        toast({
          title: "週目標達成！",
          description: "恭喜你完成本週目標！",
        });
      }
    } catch (error) {
      console.error('Error recording completion:', error);
      toast({
        title: "記錄失敗",
        description: "請稍後再試",
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <Card className="bg-gradient-to-br from-pink-50/80 to-blue-50/80 backdrop-blur-sm border-pink-100 shadow-lg w-full max-w-sm mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl text-pink-500">每週進度追蹤</CardTitle>
          <CardDescription className="text-gray-600">
            登入以追蹤您的呼吸練習進度
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={() => navigate('/login')}
            className="w-full bg-gradient-to-r from-pink-400 to-blue-400 hover:from-pink-500 hover:to-blue-500 text-white"
          >
            立即登入
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-pink-50/80 to-blue-50/80 backdrop-blur-sm border-pink-100 shadow-lg w-full max-w-sm mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl text-pink-500">每週進度</CardTitle>
        <CardDescription className="text-gray-600">
          目標: 每週完成 {goalCount} 次呼吸練習
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              {completions >= goalCount ? (
                <Trophy className="w-6 h-6 text-yellow-400" />
              ) : todayCompleted ? (
                <Check className="w-6 h-6 text-green-400" />
              ) : (
                <Award className="w-6 h-6 text-blue-400" />
              )}
              <span className="text-gray-700">
                本週完成: {completions}/{goalCount}
              </span>
            </div>
          </div>

          <button
            onClick={recordCompletion}
            disabled={todayCompleted}
            className={`w-full py-3 px-4 rounded-full transition-all duration-300 ${
              todayCompleted
                ? 'bg-gray-200 cursor-not-allowed'
                : 'bg-gradient-to-r from-pink-400 to-blue-400 hover:from-pink-500 hover:to-blue-500 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
            }`}
          >
            {todayCompleted ? '今天已完成' : '記錄完成'}
          </button>
        </div>
      </CardContent>
    </Card>
  );
};