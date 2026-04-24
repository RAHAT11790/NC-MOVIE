import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

interface AboutPageProps {
  onBack: () => void;
  siteName: string;
}

const AboutPage = ({ onBack, siteName }: AboutPageProps) => {
  const [lang, setLang] = useState<"hi" | "en">("hi"); // Changed from "bn" to "hi"

  const content = {
    hi: {
      title: `NEXTGEN CINEMA के बारे में`, // Updated name
      sections: [
        {
          heading: "हमारे बारे में",
          text: `NEXTGEN CINEMA एक प्रीमियम एनीमे स्ट्रीमिंग प्लेटफॉर्म है जहाँ आप हिंदी डब और उपशीर्षक के साथ विभिन्न एनीमे सीरीज और मूवीज का आनंद ले सकते हैं। हमारा लक्ष्य भारतीय एनीमे प्रेमियों के लिए सर्वोत्तम गुणवत्ता वाली सामग्री प्रदान करना है।`,
        },
        {
          heading: "विशेषताएँ",
          text: `• HD और 4K गुणवत्ता में वीडियो स्ट्रीमिंग\n• हिंदी डब और उपशीर्षक\n• ऑफलाइन देखने के लिए डाउनलोड\n• प्रीमियम सदस्यता\n• पुश नोटिफिकेशन\n• डार्क/लाइट थीम\n• श्रेणी के अनुसार ब्राउज़िंग\n• कंटीन्यू वॉचिंग सुविधा`,
        },
        {
          heading: "संपर्क करें",
          text: `यदि आपको कोई समस्या या सुझाव है, तो कृपया हमारे टेलीग्राम चैनल के माध्यम से हमसे संपर्क करें। हम आपके फीडबैक का हमेशा स्वागत करते हैं और अपनी सेवाओं को बेहतर बनाने का प्रयास करते हैं।`,
        },
      ],
    },
    en: {
      title: `About NEXTGEN CINEMA`, // Updated name
      sections: [
        {
          heading: "About Us",
          text: `NEXTGEN CINEMA is a premium anime streaming platform where you can enjoy various anime series and movies with Hindi dubbing and subtitles. Our goal is to provide the best quality content for Indian anime lovers.`, // Changed Bengali to Hindi/Indian context
        },
        {
          heading: "Features",
          text: `• HD & 4K quality video streaming\n• Hindi dub & subtitles\n• Download for offline viewing\n• Premium subscription\n• Push notifications\n• Dark/Light theme\n• Category-based browsing\n• Continue Watching feature`,
        },
        {
          heading: "Contact",
          text: `If you have any issues or suggestions, please contact us through our Telegram channel. We always welcome your feedback and strive to improve our services.`,
        },
      ],
    },
  };

  const c = content[lang];

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-background overflow-y-auto pt-[70px] px-4 pb-24"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "tween", duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-5">
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-secondary-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">{c.title}</span>
        </button>
        <div className="flex gap-1 bg-secondary rounded-lg p-0.5">
          <button
            onClick={() => setLang("hi")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${lang === "hi" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
          >
            हिंदी
          </button>
          <button
            onClick={() => setLang("en")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${lang === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
          >
            English
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {c.sections.map((section, i) => (
          <div key={i} className="glass-card p-4 rounded-xl">
            <h3 className="text-sm font-bold text-foreground mb-2">{section.heading}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">{section.text}</p>
          </div>
        ))}
        <div className="glass-card p-4 rounded-xl text-center">
          <p className="text-xs text-muted-foreground">Version 2.0</p>
          <p className="text-[10px] text-muted-foreground mt-1">© 2026 NEXTGEN CINEMA. All rights reserved.</p>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutPage;