import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import MultiSelect from './multiselect';

describe('MultiSelect', () => {
  const options = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Orange', value: 'orange' },
  ];

  it('renders toggle button', () => {
    render(<MultiSelect options={options} onChange={jest.fn()} />);
    expect(screen.getByText('Select Options')).toBeInTheDocument();
  });

  it('opens and closes dropdown when clicked', () => {
    render(<MultiSelect options={options} onChange={jest.fn()} />);
    const button = screen.getByText('Select Options');

    fireEvent.click(button);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.queryByPlaceholderText('Search...')).not.toBeInTheDocument();
  });

  it('filters options based on search input', () => {
    render(<MultiSelect options={options} onChange={jest.fn()} />);
    fireEvent.click(screen.getByText('Select Options'));

    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'Ban' } });

    expect(screen.getByText('Banana')).toBeInTheDocument();
    expect(screen.queryByText('Apple')).not.toBeInTheDocument();
    expect(screen.queryByText('Orange')).not.toBeInTheDocument();
  });

  it('calls onChange with selected value', () => {
    const onChangeMock = jest.fn();
    render(<MultiSelect options={options} onChange={onChangeMock} />);

    fireEvent.click(screen.getByText('Select Options'));
    const checkbox = screen.getByLabelText('Apple');

    fireEvent.click(checkbox);
    expect(onChangeMock).toHaveBeenCalledWith(['apple']);
  });

  it('allows toggling selected value (deselect)', () => {
    const onChangeMock = jest.fn();
    render(<MultiSelect options={options} onChange={onChangeMock} />);

    fireEvent.click(screen.getByText('Select Options'));

    const checkbox = screen.getByLabelText('Banana');

    fireEvent.click(checkbox); // select
    expect(onChangeMock).toHaveBeenCalledWith(['banana']);

    fireEvent.click(checkbox); // deselect
    expect(onChangeMock).toHaveBeenCalledWith([]);
  });

  it('shows "No results found" when search yields no matches', () => {
    render(<MultiSelect options={options} onChange={jest.fn()} />);
    fireEvent.click(screen.getByText('Select Options'));

    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'zzz' } });

    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });

  it('closes dropdown when clicking outside', () => {
    render(
      <div>
        <button data-testid="outside">Outside</button>
        <MultiSelect options={options} onChange={jest.fn()} />
      </div>
    );

    fireEvent.click(screen.getByText('Select Options'));
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByTestId('outside'));
    expect(screen.queryByPlaceholderText('Search...')).not.toBeInTheDocument();
  });
});
