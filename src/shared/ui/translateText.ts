import axios from "axios";

const translationCache = new Map<string, string>();

interface TranslationResponse {
  responseData: {
    translatedText: string;
  };
}

export const translateText = async (
  text: string,
  current: string,
  language: string
): Promise<string> => {
  if (!text.trim()) return "";

  const cacheKey = `${text}-${current}`;
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)!;
  }

  try {
    const response = await axios.get<TranslationResponse>(
      "https://api.mymemory.translated.net/get",
      {
        params: {
          q: text,
          langpair: `${current}|${language}`,
          mt: 1,
          de: "arsentoktosunov007@gmail.com",
        },
      }
    );

    const translatedText = response.data.responseData.translatedText;
    translationCache.set(cacheKey, translatedText);

    return translatedText;
  } catch (error) {
    console.error("Ошибка перевода MyMemory:", error);
    return text;
  }
};
