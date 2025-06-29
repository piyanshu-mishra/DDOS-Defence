// services/llmService.js
import axios from "axios";

// Replace this with your actual secret API key
const API_KEY = "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";

const API_URL = "https://api.openai.com/v1/chat/completions";

export async function analyzeDdosAttack(ip, trafficVolume, anomalies, setLoading) {
  const prompt = `You are a cybersecurity analyst. Analyze the following network data and classify the DDoS attack severity as Low, Medium, or High. Also provide 3 actionable mitigation recommendations.

Data:
- IP Address: ${ip}
- Traffic Volume: ${trafficVolume}
- Anomaly Score: ${anomalies}`;

  try {
    setLoading(true);

    const res = await axios.post(
      API_URL,
      {
        model: "gpt-3.5-turbo", // or "gpt-4" if available
        messages: [
          {
            role: "system",
            content: "You are a cybersecurity analyst.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 300,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const message = res.data.choices?.[0]?.message?.content || "No response generated.";
    return message.trim();

  } catch (err) {
    console.error("OpenAI API Error:", err.response?.data || err.message);
    return "Could not connect to OpenAI API.";
  } finally {
    setLoading(false);
  }
}