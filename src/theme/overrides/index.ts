import { Theme } from '@mui/material';
import Typography from './Typography';
import Badge from './Badge';
import Button from './Button';
import CssBaseline from './CssBaseline';
import Tooltip from './Tooltip';

export default function overridesComponents(theme: Theme) {
  return Object.assign(Button(theme), Badge(theme), Typography(), CssBaseline(), Tooltip());
}
