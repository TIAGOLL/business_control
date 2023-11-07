import React from 'react';
import { render } from '@testing-library/react';
import Button from '../components/Button/index';

describe('Button', () => {
  test('Renderizou a className do botão', () => {
    const { getByTestId } = render(<Button>Clique</Button>)
    const classNameExists = getByTestId('button').className
    expect(classNameExists).toBeTruthy()
  })

  test('Renderizou o texto do botão', () => {
    const { getByText } = render(<Button>Clique</Button>);
    expect(getByText('Clique'))
  })

  test('Renderizou a prop onClick do botão', () => {
    const { getByTestId } = render(<Button>Clique</Button>)
    const onClickExists = getByTestId('button').onclick
    expect(onClickExists).toBeTruthy()
  })

});
