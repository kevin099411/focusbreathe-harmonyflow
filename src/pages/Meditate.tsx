import { MeditationCategories } from "@/components/MeditationCategories";
import { TimeSelection } from "@/components/TimeSelection";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { BreathingExercise } from "@/components/BreathingExercise";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Meditate = () => {
  const [activeSection, setActiveSection] = useState<"meditation" | "breathing">("meditation");

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 to-orange-600 text-white pt-16">
      <div className="container mx-auto px-4 py-6 md:py-12">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-4xl font-bold text-white">冥想練習</h1>
          <LanguageSwitcher />
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <Button
            variant={activeSection === "meditation" ? "default" : "outline"}
            onClick={() => setActiveSection("meditation")}
            className={activeSection === "meditation" 
              ? "bg-white text-orange-500 hover:bg-white/90"
              : "text-white border-white hover:bg-white/20"
            }
          >
            冥想
          </Button>
          <Button
            variant={activeSection === "breathing" ? "default" : "outline"}
            onClick={() => setActiveSection("breathing")}
            className={activeSection === "breathing"
              ? "bg-white text-orange-500 hover:bg-white/90"
              : "text-white border-white hover:bg-white/20"
            }
          >
            呼吸練習
          </Button>
        </div>

        <div className="space-y-12">
          {activeSection === "breathing" ? (
            <BreathingExercise />
          ) : (
            <>
              <MeditationCategories />
              <div className="border-t border-white/20 pt-12">
                <TimeSelection />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Meditate;