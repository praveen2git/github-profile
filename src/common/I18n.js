export class I18n {
  constructor({ locale, translations }) {
    this.locale = locale || "en";
    this.translations = translations;
  }

  t(key) {
    return this.translations[key]?.[this.locale] || this.translations[key]?.["en"] || key;
  }
}
