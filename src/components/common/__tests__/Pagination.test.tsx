import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from '../Pagination';

describe('Pagination', () => {
  const defaultProps = {
    currentPage: 1,
    totalCount: 100,
    pageSize: 10,
    onPageChange: vi.fn(),
  };

  it('should render correct number of pages', () => {
    render(<Pagination {...defaultProps} />);
    // Initial pages (1, 2, 3, 4, 5) plus the '...' and last page if applicable
    // With 100 items and 10 per page, there are 10 pages.
    // The component shows max 5 pages.
    const pageButtons = screen.getAllByRole('button', { name: /[0-9]+/ });
    // Should show 1, 2, 3, 4, 5 and 10 (because 10 is last and > 5)
    expect(pageButtons.length).toBe(6);
  });

  it('should call onPageChange when a page number is clicked', () => {
    const onPageChange = vi.fn();
    render(<Pagination {...defaultProps} onPageChange={onPageChange} />);
    
    const page2Button = screen.getByRole('button', { name: '2' });
    fireEvent.click(page2Button);
    
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('should disable previous button on first page', () => {
    render(<Pagination {...defaultProps} currentPage={1} />);
    const prevButton = screen.getByLabelText('Previous page');
    expect(prevButton).toBeDisabled();
  });

  it('should disable next button on last page', () => {
    render(<Pagination {...defaultProps} currentPage={10} />);
    const nextButton = screen.getByLabelText('Next page');
    expect(nextButton).toBeDisabled();
  });

  it('should show correct "Showing X to Y of Z" text', () => {
    render(<Pagination {...defaultProps} currentPage={2} totalCount={100} pageSize={10} />);
    expect(screen.getByText('11')).toBeDefined(); // Start
    expect(screen.getByText('20')).toBeDefined(); // End
    expect(screen.getByText('100')).toBeDefined(); // Total
  });
});
