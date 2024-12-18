import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Award, Check, Trophy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const DailyProgress = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [completions, setCompletions] = useState<number>(0);
  const [todayCompleted, setTodayCompleted] = useState(false);
  const goalCount = 7; // Weekly goal

  useEffect(() => {
    fetchCompletions();
  }, []);

  const fetchCompletions = async () => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;

      // Get completions for the current week
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

      // Check if completed today
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
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) {
        toast({
          title: language === 'zh' ? "請先登入" : "Please sign in first",
          description: language === 'zh' 
            ? "需要登入才能記錄進度" 
            : "You need to be signed in to track progress",
        });
        return;
      }

      if (todayCompleted) {
        toast({
          title: language === 'zh' ? "今天已完成" : "Already completed today",
          description: language === 'zh' 
            ? "明天繼續保持！" 
            : "Keep it up tomorrow!",
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

      // Show completion message
      toast({
        title: language === 'zh' ? "太棒了！" : "Well done!",
        description: language === 'zh' 
          ? `本週已完成 ${completions + 1} 次呼吸練習` 
          : `You've completed ${completions + 1} breathing exercises this week`,
      });

      // Show special message if goal is reached
      if (completions + 1 >= goalCount) {
        toast({
          title: language === 'zh' ? "週目標達成！" : "Weekly Goal Achieved!",
          description: language === 'zh' 
            ? "恭喜你完成本週目標！" 
            : "Congratulations on reaching your weekly goal!",
        });
      }
    } catch (error) {
      console.error('Error recording completion:', error);
      toast({
        title: language === 'zh' ? "記錄失敗" : "Error recording completion",
        description: language === 'zh' 
          ? "請稍後再試" 
          : "Please try again later",
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-sm border-none text-white">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">
          {language === 'zh' ? '每週進度' : 'Weekly Progress'}
        </CardTitle>
        <CardDescription className="text-gray-300">
          {language === 'zh' 
            ? `目標: 每週完成 ${goalCount} 次呼吸練習` 
            : `Goal: Complete ${goalCount} breathing exercises per week`}
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
              <span>
                {language === 'zh' 
                  ? `本週完成: ${completions}/${goalCount}` 
                  : `Completed this week: ${completions}/${goalCount}`}
              </span>
            </div>
          </div>

          <button
            onClick={recordCompletion}
            disabled={todayCompleted}
            className={`w-full py-2 px-4 rounded-lg transition-all duration-300 ${
              todayCompleted
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'
            }`}
          >
            {todayCompleted
              ? (language === 'zh' ? '今天已完成' : 'Completed Today')
              : (language === 'zh' ? '記錄完成' : 'Mark Complete')}
          </button>
        </div>
      </CardContent>
    </Card>
  );
};