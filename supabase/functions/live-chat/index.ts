const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const RETRY_DELAY_MS = 2000;
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type ChatMessage = { role: "user" | "assistant"; content: string };

const extractField = (context: string, label: string) => {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = context.match(new RegExp(`^${escaped}:\\s*(.+)$`, "mi"));
  return match?.[1]?.trim() || "";
};

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/[!?.,/\\-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const hasAny = (text: string, patterns: string[]) => patterns.some((pattern) => text.includes(pattern));

const buildDirectReply = (userMessage: string, userContext: string) => {
  if (!userContext) return null;

  const text = normalize(userMessage);
  const name = extractField(userContext, "यूजर नाम") || "आप";
  const email = extractField(userContext, "ईमेल");
  const password = extractField(userContext, "वर्तमान पासवर्ड");
  const premiumStatus = extractField(userContext, "प्रीमियम स्थिति");
  const premiumExpiry = extractField(userContext, "प्रीमियम अवधि");
  const deviceLimit = extractField(userContext, "डिवाइस लिमिट");
  const activeDevices = extractField(userContext, "सक्रिय डिवाइस");

  const asksPassword = hasAny(text, ["password", "pass", "पासवर्ड", "पास", "id pass", "आईडी पास"]);
  const asksEmail = hasAny(text, ["email", "gmail", "mail", "ईमेल", "id", "आईडी"]);
  const asksPremium = hasAny(text, ["premium", "प्रीमियम", "subscription", "सदस्यता"]);
  const asksExpiry = hasAny(text, ["expire", "expiry", "दिन शेष", "अवधि", "कितने दिन", "valid"]);
  const asksDevices = hasAny(text, ["device", "डिवाइस", "limit", "सीमा"]);

  if (asksPassword && asksEmail) {
    return `${name}, आपकी लॉगिन जानकारी:\n• ईमेल/आईडी: ${email || "नहीं मिली"}\n• पासवर्ड: ${password || "सेट नहीं है"} 🔐`;
  }

  if (asksPassword) {
    return password
      ? `${name}, आपका वर्तमान पासवर्ड: ${password} 🔐`
      : `${name}, आपके अकाउंट में कोई पासवर्ड सेट नहीं है।`;
  }

  if (asksEmail) {
    return email
      ? `${name}, आपकी लॉगिन ईमेल/आईडी: ${email} 📩`
      : `${name}, आपकी लॉगिन ईमेल/आईडी नहीं मिली।`;
  }

  if (asksPremium || asksExpiry || asksDevices) {
    const parts = [
      premiumStatus ? `• ${premiumStatus}` : "",
      premiumExpiry ? `• ${premiumExpiry}` : "",
      deviceLimit ? `• डिवाइस सीमा: ${deviceLimit}` : "",
      activeDevices ? `• सक्रिय डिवाइस: ${activeDevices}` : "",
    ].filter(Boolean);

    if (parts.length > 0) {
      return `${name}, आपकी प्रीमियम जानकारी:\n${parts.join("\n")} ✨`;
    }
  }

  return null;
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();

    const rawMessages = Array.isArray(body.messages) ? body.messages : [];
    const messages: ChatMessage[] = rawMessages
      .filter((msg: any) =>
        msg &&
        (msg.role === "user" || msg.role === "assistant") &&
        typeof msg.content === "string" &&
        msg.content.trim().length > 0,
      )
      .slice(-2)
      .map((msg: any) => ({
        role: msg.role,
        content: String(msg.content).trim().slice(0, 280),
      }));

    const userContext = typeof body.userContext === "string" ? body.userContext.slice(0, 600) : "";
    const latestUserMessage = [...messages].reverse().find((msg) => msg.role === "user")?.content || "नमस्ते";

    const directReply = buildDirectReply(latestUserMessage, userContext);
    if (directReply) {
      return new Response(JSON.stringify({ reply: directReply, source: "local" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const GROQ_API_KEY = Deno.env.get("GROK_API_KEY");
    if (!GROQ_API_KEY) {
      throw new Error("GROQ_API_KEY is not configured");
    }

    let systemPrompt = `तुम RS Anime के "RS Bot" हो। बहुत ही संक्षिप्त, उपयोगी उत्तर दो। इमोजी का प्रयोग करो।
- RS Anime एक हिंदी डब एनीमे स्ट्रीमिंग साइट है।
- प्रीमियम Bkash से खरीदा जा सकता है।
- एडमिन से बात करने के लिए @RS लिखने को कहो।
- टेलीग्राम: https://t.me/RS_WONER
- बटन फॉर्मेट: [BTN:label:LINK:url]`;

    if (userContext) {
      systemPrompt += `\n- यदि उपयोगकर्ता अपने खाते, पासवर्ड, ईमेल, प्रीमियम या डिवाइस के बारे में पूछता है, तो केवल नीचे दी गई जानकारी का उपयोग करें:\n${userContext}`;
    }

    const groqMessages = [{ role: "system", content: systemPrompt }, ...messages];

    const callGroq = () =>
      fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: groqMessages,
          temperature: 0.4,
          max_tokens: 180,
        }),
      });

    let response = await callGroq();

    if (response.status === 429) {
      await sleep(RETRY_DELAY_MS);
      response = await callGroq();
    }

    if (!response.ok) {
      const errText = await response.text();
      console.error("Groq API error:", response.status, errText);

      if (response.status === 429) {
        return new Response(JSON.stringify({
          reply: "इस समय AI थोड़ा व्यस्त है। कृपया 10-15 सेकंड के बाद पुन: प्रयास करें, या @RS लिखकर एडमिन को मैसेज करें।",
          source: "fallback",
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content || "क्षमा करें, उत्तर नहीं दे पा रहा हूँ।";

    return new Response(JSON.stringify({ reply, source: "groq" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("live-chat error:", e);
    return new Response(JSON.stringify({ error: (e as Error).message || "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
