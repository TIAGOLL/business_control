import React from 'react';
import { render } from '@testing-library/react';
import Button from './index';

describe('Button', () => {
  it('renders a Button', () => {
    const { getByTestId } = render(<Button>Clique</Button>);
    const buttonElement = getByTestId('Button');
    expect(buttonElement).getByText('Clique');
  });

});
