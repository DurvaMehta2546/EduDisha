// Translation utility for Google Translate API integration
// This is a mock implementation - replace with actual Google Translate API calls

export interface TranslationOptions {
  from: string;
  to: string;
  text: string;
}

export const translateText = async (options: TranslationOptions): Promise<string> => {
  // Mock translation responses
  const mockTranslations: {[key: string]: {[key: string]: string}} = {
    'en': {
      'hi': 'यह एक अनुवादित संदेश है',
      'gu': 'આ એક અનુવાદિત સંદેશ છે'
    },
    'hi': {
      'en': 'This is a translated message',
      'gu': 'આ એક અનુવાદિત સંદેશ છે'
    },
    'gu': {
      'en': 'This is a translated message',
      'hi': 'यह एक अनुवादित संदेश है'
    }
  };

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const translation = mockTranslations[options.from]?.[options.to];
  return translation || options.text + ` (translated to ${options.to.toUpperCase()})`;
};

export const detectLanguage = async (text: string): Promise<string> => {
  // Simple language detection based on characters
  if (/[\u0900-\u097F]/.test(text)) return 'hi'; // Hindi
  if (/[\u0A80-\u0AFF]/.test(text)) return 'gu'; // Gujarati
  return 'en'; // Default to English
};

export const supportedLanguages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' }
];

export const getLanguageName = (code: string): string => {
  const lang = supportedLanguages.find(l => l.code === code);
  return lang ? lang.nativeName : code;
};