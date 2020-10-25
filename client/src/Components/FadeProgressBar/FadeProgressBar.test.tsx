import React from 'react';
import { render } from '@testing-library/react';

import FadeProgressBar, { Props } from './FadeProgressBar';

function renderFadeProgressBar(props: Partial<Props> = {}) {
  const defaultProps: Props = {
    active: false,
  };
  return render(<FadeProgressBar {...defaultProps} {...props} />);
}

describe('<FadeProgressBar />', () => {
  test('progress bar - render hidden', async () => {
    const { findByTestId } = renderFadeProgressBar();
    const fadeProgressBar = await findByTestId('progress-container');
    expect(fadeProgressBar).toMatchSnapshot('inactive-progress-bar');
  });

  test('progress bar - render active', async () => {
    const { findByTestId } = renderFadeProgressBar({ active: true });
    const fadeProgressBar = await findByTestId('progress-container');
    expect(fadeProgressBar).toMatchSnapshot('active-progress-bar');
  });
});
