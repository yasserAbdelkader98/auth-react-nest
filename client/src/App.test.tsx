import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';

vi.mock('./Network/appApis', () => ({
  getCurrentUser: vi.fn().mockRejectedValue(new Error('Not authenticated')),
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
