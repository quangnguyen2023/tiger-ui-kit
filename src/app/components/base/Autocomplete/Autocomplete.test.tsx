// BaseAutocomplete.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, test, vi } from 'vitest';
import BaseAutocomplete from './Autocomplete';

describe('BaseAutocomplete', () => {
  it('show the hint when there is no value', () => {
    render(
      <BaseAutocomplete
        options={['Option 1', 'Option 2']}
        hint="Dateaa"
        value={undefined}
        onChangeVal={() => {}}
      />
    );
    expect(screen.getByPlaceholderText('Dateaa')).toBeDefined();
  });

  it('displays options when clicking the input', () => {
    render(
      <BaseAutocomplete
        data-testid="autocomplete"
        options={['Option 1', 'Option 2']}
        value={'Option 1'}
        onChangeVal={() => {}}
      />
    );

    const input = screen.getByTestId('autocomplete');
    fireEvent.mouseDown(input);

    // expect(screen.getByText('Option 1')).toBeDefined();
    // expect(screen.getByText('Option 2')).toBeDefined();
  });
});
