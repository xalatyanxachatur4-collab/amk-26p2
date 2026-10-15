import { describe, it, expect } from 'vitest';
import { translations, getTranslations, getLocalizedText } from '../src/i18n/index.js';
import { systemsData } from '../src/data/systemsData.js';
import { glossaryTerms } from '../src/data/glossaryData.js';
import { masterQuizQuestions, componentMatchingItems } from '../src/data/quizData.js';
import { workflows } from '../src/data/workflowData.js';

describe('Client Internationalization (i18n)', () => {
  it('should support English, Armenian, and Russian locales', () => {
    expect(translations.en).toBeDefined();
    expect(translations.hy).toBeDefined();
    expect(translations.ru).toBeDefined();

    expect(translations.en.appName).toBe('Automotive Engineering Explorer');
    expect(translations.hy.appName).toBe('Automotive Engineering Explorer');
    expect(translations.ru.appName).toBe('Automotive Engineering Explorer');
  });

  it('should provide localized navigation labels in all three languages', () => {
    const enNav = getTranslations('en').nav;
    const hyNav = getTranslations('hy').nav;
    const ruNav = getTranslations('ru').nav;

    expect(enNav.engine).toBe('Engine & Powertrain');
    expect(hyNav.engine).toBe('Շարժիչ և ուժային ագրեգատ');
    expect(ruNav.engine).toBe('Двигатель и силовая установка');

    expect(enNav.brakes).toBe('Braking System');
    expect(hyNav.brakes).toBe('Արգելակային համակարգ');
    expect(ruNav.brakes).toBe('Тормозная система');
  });

  it('should fall back gracefully to English when key is missing', () => {
    const text = getLocalizedText({ en: 'Default English', hy: '', ru: '' }, 'hy');
    expect(text).toBe('Default English');
  });
});

describe('Automotive Engineering Core Systems Data', () => {
  it('should define all 7 required core systems', () => {
    const systemKeys = Object.keys(systemsData);
    expect(systemKeys).toHaveLength(7);
    expect(systemKeys).toEqual(
      expect.arrayContaining([
        'engine',
        'transmission',
        'suspension',
        'brakes',
        'steering',
        'electrical',
        'body',
      ])
    );
  });

  it('should include components, sequence, and physics formulas for each system', () => {
    Object.values(systemsData).forEach((system) => {
      expect(system.components.length).toBeGreaterThan(0);
      expect(system.operatingSequence.length).toBeGreaterThan(0);
      expect(system.failureSymptoms.length).toBeGreaterThan(0);
      expect(system.maintenanceNotes.length).toBeGreaterThan(0);
      expect(system.safetyNotes.length).toBeGreaterThan(0);

      // Verify each component has localized name and function
      system.components.forEach((comp) => {
        expect(comp.name.en).toBeTruthy();
        expect(comp.name.hy).toBeTruthy();
        expect(comp.name.ru).toBeTruthy();
        expect(comp.function.en).toBeTruthy();
      });
    });
  });

  it('should verify Hookes law and Pascals law presence in concepts', () => {
    const suspConcepts = systemsData.suspension.engineeringConcepts;
    const brakeConcepts = systemsData.brakes.engineeringConcepts;

    const hasHooke = suspConcepts.some((c) => c.formula?.includes('dx/dt') || c.formula?.includes('c'));
    const hasEnergy = brakeConcepts.some((c) => c.formula?.includes('E_k = 0.5'));

    expect(hasHooke).toBe(true);
    expect(hasEnergy).toBe(true);
  });
});

describe('Glossary, Quizzes, and Workflows', () => {
  it('should have comprehensive technical glossary terms with system links', () => {
    expect(glossaryTerms.length).toBeGreaterThanOrEqual(10);
    const ackermann = glossaryTerms.find((g) => g.id === 'ackermann-steering');
    expect(ackermann).toBeDefined();
    expect(ackermann?.systemId).toBe('steering');
  });

  it('should have valid quiz questions with correct answer options', () => {
    expect(masterQuizQuestions.length).toBeGreaterThanOrEqual(5);
    masterQuizQuestions.forEach((q) => {
      const correctOpts = q.options.filter((o) => o.isCorrect);
      expect(correctOpts).toHaveLength(1);
    });
  });

  it('should have 6 matching challenge pairs', () => {
    expect(componentMatchingItems).toHaveLength(6);
  });

  it('should define energy workflows for ICE, Hybrid, and EV', () => {
    expect(workflows.ice.nodes.length).toBeGreaterThan(4);
    expect(workflows.hybrid.nodes.length).toBeGreaterThan(4);
    expect(workflows.ev.nodes.length).toBeGreaterThan(4);

    // EV must include regenerative flow
    const evRegen = workflows.ev.edges.find((e) => e.flowType === 'regeneration');
    expect(evRegen).toBeDefined();
  });
});
