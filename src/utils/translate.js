import axios from 'axios';

const API_KEY = 'AIzaSyBo2xoHEuC1jbQgIwHaMBacGzYDsCTIbH0';  // Replace with your actual API key

export const translateText = async (text, targetLanguage) => {
  const url = `https://translation.googleapis.com/language/translate/v2`;

  try {
    const response = await axios.post(url, {}, {
      params: {
        q: text,
        target: targetLanguage,
        key: API_KEY
      }
    });

    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error('Error translating text:', error);
    return null;
  }
};
