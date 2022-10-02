import { Dialog as MUIDialog, DialogProps, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef, ReactElement, Ref } from 'react';
import useCollapse from 'src/hooks/useCollapse';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IDialogProp {
  open: boolean;
  onClose: () => void;
  children: ReactElement;
  transition?: boolean;
}

type DialogType = IDialogProp & DialogProps;

export default function Dialog({ open, transition, children, onClose, ...other }: DialogType) {
  const { isCollapse } = useCollapse();
  return (
    <MUIDialog
      open={open}
      TransitionComponent={transition ? Transition : undefined}
      onClose={onClose}
      fullWidth
      PaperProps={{
        sx: {
          ml: isCollapse ? 16 : 40.5,
        },
      }}
      {...other}
    >
      {children}
    </MUIDialog>
  );
}
