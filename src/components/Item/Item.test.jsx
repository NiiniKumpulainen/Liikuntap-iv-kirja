import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Item from './Item';

describe('Item component', () => {
  const mockData = {
    id: '123',
    type: 'Juoksu',
    amount: 60,
    date: '2024-01-25T12:00:00.000Z',
    length: '5 km',
  };

  it('renders item data correctly', () => {
    render(
      <MemoryRouter>
        <Item data={mockData} />
      </MemoryRouter>
    );

    expect(screen.getByText('Juoksu')).toBeInTheDocument();
    expect(screen.getByText('60 min, liikuntaa suoritettu!')).toBeInTheDocument();
    expect(screen.getByText('25.1.2024')).toBeInTheDocument();
    expect(screen.getByText('5 km')).toBeInTheDocument();
  });

  it('renders link to edit page', () => {
    render(
      <MemoryRouter>
        <Item data={mockData} />
      </MemoryRouter>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/edit/123');
  });

  it('renders "liikunta suoritettu!" when amount is not provided', () => {
    const dataWithoutAmount = { ...mockData, amount: null };

    render(
      <MemoryRouter>
        <Item data={dataWithoutAmount} />
      </MemoryRouter>
    );

    expect(screen.getByText('liikunta suoritettu!')).toBeInTheDocument();
  });
});