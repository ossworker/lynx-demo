import i18next from 'i18next';
import type { i18n } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';

const localesContext = import.meta.webpackContext('./locales', {
  recursive: false,
  regExp: /\.json$/,
});

const localI18nInstance: i18n = i18next.createInstance();

// We can only loading resources on a background thread
if (__BACKGROUND__) {
  localI18nInstance.use(
    // See: https://www.i18next.com/how-to/add-or-load-translations#lazy-load-in-memory-translations
    resourcesToBackend(
      (language: string) =>
        // Dynamic-imported locales can be used with `i18n.loadLanguages`
        import(`./locales/${language}.json`),
    ),
  );
}

localI18nInstance.init({
  lng: 'en',
  // The default JSON format needs Intl.PluralRules API, which is currently unavailable in Lynx.
  compatibilityJSON: 'v3',
  // Add all statically imported localizations to i18next resources.
  resources: Object.fromEntries(
    localesContext.keys().map((key) => [
      key.match(/\/([^/]+)\.json$/)?.[1] || key,
      {
        translation: localesContext(key) as Record<string, string>,
      },
    ]),
  ),
  partialBundledLanguages: true,
});

export { localI18nInstance as i18n };
