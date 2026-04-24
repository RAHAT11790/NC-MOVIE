import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

interface PrivacyPolicyPageProps {
  onBack: () => void;
  siteName: string;
}

const PrivacyPolicyPage = ({ onBack, siteName }: PrivacyPolicyPageProps) => {
  const [lang, setLang] = useState<"bn" | "en">("bn");

  const content = {
    bn: {
      title: "गोपनीयता नीति",
      sections: [
        {
          heading: "डेटा संग्रह",
          text: `${siteName} आपके ब्राउज़िंग अनुभव को बेहतर बनाने के लिए कुछ जानकारी एकत्र करता है। इसमें शामिल हैं:\n• डिवाइस जानकारी (ब्राउज़र प्रकार, ऑपरेटिंग सिस्टम)\n• उपयोग के आंकड़े (देखे गए वीडियो, अवधि)\n• खाता जानकारी (ईमेल, प्रदर्शित नाम)\n• प्रोफ़ाइल चित्र (आपके डिवाइस पर संग्रहीत)`,
        },
        {
          heading: "डेटा उपयोग",
          text: `हम आपकी जानकारी का उपयोग निम्नलिखित उद्देश्यों के लिए करते हैं:\n• आपके खाते का प्रबंधन\n• व्यक्तिगत सामग्री की सिफारिश\n• पुश नोटिफिकेशन भेजना\n• सेवा की गुणवत्ता में सुधार\n• प्रीमियम सदस्यता प्रबंधन`,
        },
        {
          heading: "डेटा सुरक्षा",
          text: `आपकी जानकारी की सुरक्षा हमारे लिए महत्वपूर्ण है। हम Firebase और एन्क्रिप्शन तकनीक का उपयोग करके आपकी जानकारी को सुरक्षित रखते हैं। हम कभी भी आपकी व्यक्तिगत जानकारी तीसरे पक्ष को नहीं बेचते हैं।`,
        },
        {
          heading: "कुकी और स्थानीय स्टोरेज",
          text: `हम आपकी पसंद (थीम, भाषा, वीडियो गुणवत्ता) और सत्र जानकारी को सहेजने के लिए स्थानीय स्टोरेज का उपयोग करते हैं। यह जानकारी केवल आपके डिवाइस पर रहती है।`,
        },
        {
          heading: "संपर्क करें",
          text: `गोपनीयता नीति के बारे में किसी भी प्रश्न के लिए, कृपया हमारे टेलीग्राम चैनल से संपर्क करें।`,
        },
      ],
    },
    en: {
      title: "Privacy Policy",
      sections: [
        {
          heading: "Information Collection",
          text: `${siteName} collects certain information to improve your browsing experience, including:\n• Device information (browser type, operating system)\n• Usage statistics (videos watched, duration)\n• Account information (email, display name)\n• Profile photo (stored on your device)`,
        },
        {
          heading: "Use of Information",
          text: `We use your information for the following purposes:\n• Managing your account\n• Personalized content recommendations\n• Sending push notifications\n• Improving service quality\n• Premium subscription management`,
        },
        {
          heading: "Data Security",
          text: `Your data security is important to us. We use Firebase and encryption technologies to keep your information secure. We never sell your personal information to third parties.`,
        },
        {
          heading: "Cookies & Local Storage",
          text: `We use local storage to save your preferences (theme, language, video quality) and session data. This information only exists on your device.`,
        },
        {
          heading: "Contact",
          text: `If you have any questions about the privacy policy, please contact us through our Telegram channel.`,
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
            onClick={() => setLang("bn")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${lang === "bn" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
          >
            बांग्ला
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
        <div className="text-center py-3">
          <p className="text-[10px] text-muted-foreground">Last updated: March 2026</p>
        </div>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicyPage;
