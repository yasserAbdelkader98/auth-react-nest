import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';

vi.mock('./Network/appApis', () => ({
  // Keep initialization pending so route rendering tests do not trigger
  // unrelated asynchronous authentication state updates.
  getCurrentUser: vi.fn().mockReturnValue(
    new Promise(() => {
      // Intentionally pending for route-only tests.
    })
  ),
  login: vi.fn(),
  logout: vi.fn(),
  register: vi.fn(),
  deleteAccount: vi.fn(),
}));

describe('App', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/');
  });

  it('renders the application home page', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { name: 'Welcome to the application' })
    ).toBeInTheDocument();
  });

  it('renders the not-found page for an unknown route', () => {
    window.history.pushState({}, '', '/this-route-does-not-exist');
    render(<App />);

    expect(
      screen.getByRole('heading', { name: 'Page Not Found' })
    ).toBeInTheDocument();
  });
});
