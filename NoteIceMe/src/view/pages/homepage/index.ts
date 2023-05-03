import { wrap } from '@atlasgroup/react-wrap';
import { useHomepageController } from './homepage.controller';
import { HomepageUI } from './homepage.ui';

export const Homepage = wrap(HomepageUI, useHomepageController);
