import { screen, fireEvent, waitFor, render } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import LoginPage from './page';
import userEvent from '@testing-library/user-event';
import { loginService } from '@/services/user/login-service';
import { useAuth } from '@/contexts/AuthContext';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('src/contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('src/services/user/login-service', () => ({
  loginService: {
    login: jest.fn(),
  },
}));

describe('LoginPage', () => {
  const mockPush = jest.fn();
  const mockAuthUser = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      authUser: mockAuthUser,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('render login form fields', () => {
    render(<LoginPage />);
    expect(screen.getByPlaceholderText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  });

  it('calls login service on valid form submission', async () => {
    (loginService.login as jest.Mock).mockResolvedValueOnce({
      data: {
        email: 'test@example.com',
        username: 'testuser',
      },
    });

    render(<LoginPage />);

    await userEvent.type(
      screen.getByPlaceholderText(/e-mail/i),
      'test@example.com'
    );
    await userEvent.type(
      screen.getByPlaceholderText(/password/i),
      'password123'
    );

    const button = screen.getByRole('button', { name: /log in/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(loginService.login).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
      expect(mockAuthUser).toHaveBeenCalledWith({
        email: 'test@example.com',
        username: 'testuser',
      });
    });
  });

  it('shows login error if login fails', async () => {
    (loginService.login as jest.Mock).mockRejectedValueOnce(
      new Error('Login failed')
    );

    render(<LoginPage />);
    await userEvent.type(
      screen.getByPlaceholderText(/e-mail/i),
      'wrong@example.com'
    );
    await userEvent.type(screen.getByPlaceholderText(/password/i), 'wrongpass');

    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/email and\/or password doesn't match/i)
      ).toBeInTheDocument();
    });
  });

  it('redirects to "/" if user is already logged in', () => {
    (useAuth as jest.Mock).mockReturnValueOnce({
      user: { email: 'user@x.com' },
      authUser: jest.fn(),
    });
    render(<LoginPage />);
    expect(mockPush).toHaveBeenCalledWith('/');
  });
});
