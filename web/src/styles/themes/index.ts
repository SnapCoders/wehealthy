import { borders } from '@components/bosons/borders';
import { colors } from '@components/bosons/colors';
import { typography } from '@components/bosons/typography';

import { dark } from './dark';
import { light } from './light';

export const theme = {
  borders,
  colors,
  typography,
};

export const themes = {
  dark: { ...theme, ...dark },
  light: { ...theme, ...light },
};
