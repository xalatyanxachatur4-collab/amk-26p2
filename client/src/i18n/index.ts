import { en } from './en.js';
import { hy } from './hy.js';
import { ru } from './ru.js';
import { SupportedLanguage } from '../types/i18n.js';

export const translations = {
  en,
  hy,
  ru,
};

export type TranslationKeys = typeof en;

export function getTranslations(lang: SupportedLanguage): TranslationKeys {
  return translations[lang] || translations.en;
}

export function getLocalizedText(
  obj: { en: string; hy: string; ru: string } | undefined,
  lang: SupportedLanguage
): string {
  if (!obj) return '';
  return obj[lang] || obj.en || '';
}
