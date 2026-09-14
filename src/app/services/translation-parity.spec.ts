import enTranslations from '../../assets/i18n/en.json';
import esTranslations from '../../assets/i18n/es.json';

function collectLeafKeys(value: unknown, prefix = ''): string[] {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    return [prefix];
  }

  return Object.entries(value).flatMap(([key, child]) =>
    collectLeafKeys(child, prefix ? `${prefix}.${key}` : key),
  );
}

describe('translation resources', () => {
  it('keeps English and Spanish leaf keys in parity', () => {
    const englishKeys = collectLeafKeys(enTranslations).sort();
    const spanishKeys = collectLeafKeys(esTranslations).sort();

    expect(spanishKeys).toEqual(englishKeys);
  });
});
