import enLang from './entries/en-us';
import vnLang from './entries/vi-vn';

export const AppLanguages = [
  {
    languageId: 'vietnamese',
    locale: 'vi',
    name: 'Vietnamese',
    icon: 'vn',
  },
  {
    languageId: 'english',
    locale: 'en',
    name: 'English',
    icon: 'us',
  },

];

const AppLocale = {
  en: enLang,
  vi: vnLang,
};

export default AppLocale;
