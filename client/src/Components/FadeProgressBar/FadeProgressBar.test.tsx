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
  test('should not display progress bar', async () => {
    const { findByTestId, container } = renderFadeProgressBar();
    const fadeProgressBar = await findByTestId('progress-container');
    expect(container).toMatchSnapshot();
  });
});
