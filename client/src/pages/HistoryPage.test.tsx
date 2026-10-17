import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from '../context/LanguageContext.js';
import { ThemeProvider } from '../context/ThemeContext.js';
import { HistoryPage } from './HistoryPage.js';

describe('HistoryPage Component', () => {
  it('renders history page header and default timeline tab correctly', () => {
    render(
      <ThemeProvider>
        <LanguageProvider>
          <MemoryRouter initialEntries={['/history']}>
            <Routes>
              <Route path="/history" element={<HistoryPage />} />
            </Routes>
          </MemoryRouter>
        </LanguageProvider>
      </ThemeProvider>
    );

    // Verify presence of Benz Patent-Motorwagen and timeline markers
    expect(screen.getAllByText(/Benz/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/1886/i).length).toBeGreaterThanOrEqual(1);
  });

  it('switches between tabs: countries, eraz, and statistics', () => {
    render(
      <ThemeProvider>
        <LanguageProvider>
          <MemoryRouter initialEntries={['/history']}>
            <Routes>
              <Route path="/history" element={<HistoryPage />} />
            </Routes>
          </MemoryRouter>
        </LanguageProvider>
      </ThemeProvider>
    );

    // Switch to ErAZ Tab
    const erazTabButton = screen.getByRole('button', { name: /ErAZ & Armenian Heritage|ԵրԱԶ|ЕрАЗ и армянское наследие/i });
    fireEvent.click(erazTabButton);
    expect(screen.getAllByText(/ErAZ-762/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Yerevan/i).length).toBeGreaterThanOrEqual(1);

    // Switch to Countries Tab
    const countriesTabButton = screen.getByRole('button', { name: /Country Philosophies|Երկրների|Философия стран/i });
    fireEvent.click(countriesTabButton);
    expect(screen.getAllByText(/Germany|Գերմանիա|Германия/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Japan|Ճապոնիա|Япония/i).length).toBeGreaterThanOrEqual(1);

    // Switch to Statistics Tab
    const statsTabButton = screen.getByRole('button', { name: /Global Statistics|վիճակագրություն|Мировая статистика/i });
    fireEvent.click(statsTabButton);
    expect(screen.getAllByText(/Toyota/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/BYD/i).length).toBeGreaterThanOrEqual(1);
  });
});
