import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from '../context/LanguageContext.js';
import { ThemeProvider } from '../context/ThemeContext.js';
import { SystemDetailPage } from './SystemDetailPage.js';
import { systemsData } from '../data/systemsData.js';

describe('SystemDetailPage Rendering', () => {
  it('renders the engine system detail page without throwing errors', () => {
    const { container } = render(
      <ThemeProvider>
        <LanguageProvider>
          <MemoryRouter initialEntries={['/systems/engine']}>
            <Routes>
              <Route path="/systems/:systemId" element={<SystemDetailPage />} />
            </Routes>
          </MemoryRouter>
        </LanguageProvider>
      </ThemeProvider>
    );

    expect(screen.getAllByText(/Engine and Powertrain/i).length).toBeGreaterThanOrEqual(1);
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('renders all 7 system pages correctly', () => {
    const systemIds = Object.keys(systemsData);
    expect(systemIds.length).toBeGreaterThanOrEqual(7);

    for (const sysId of systemIds) {
      const { unmount } = render(
        <ThemeProvider>
          <LanguageProvider>
            <MemoryRouter initialEntries={[`/systems/${sysId}`]}>
              <Routes>
                <Route path="/systems/:systemId" element={<SystemDetailPage />} />
              </Routes>
            </MemoryRouter>
          </LanguageProvider>
        </ThemeProvider>
      );
      unmount();
    }
  });
});
