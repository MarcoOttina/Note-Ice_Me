import React from 'react';
import { render } from '@testing-library/react-native';

import { HomepageUI } from './homepage.ui';
import { useHomepageControllerMocked } from './homepage.controller';

it('Renders correctly', () => {
  const { queryByTestId } = render(<HomepageUI {...useHomepageControllerMocked()} />);

  expect(queryByTestId('image-profile')).not.toBeDefined();
});
