import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../../Redux/slices/themeSlice';
import ThemeToggleButton from './ThemeToggleButton';

const renderComponent = () =>
  render(
    <Provider store={createStore(reducer, { useDark: true })}>
      <ThemeToggleButton />
    </Provider>,
  );

test('should render something', () => {
  const { getByTestId } = renderComponent();
  expect(getByTestId('theme-toggle-button')).toBeInTheDocument();
});
