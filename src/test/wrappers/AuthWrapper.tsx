import { AuthProvider } from '@/contexts/AuthContext';
import { render, RenderResult } from '@testing-library/react';
import { ReactElement } from 'react';

const renderWithProvider = (ui: ReactElement): RenderResult => {
  return render(<AuthProvider>{ui}</AuthProvider>);
};

export default renderWithProvider;
