import { Box, Popover } from '@mui/material';
import { useState } from 'react';

type PopoverWrapperProps = {
  triggerComponent: React.ReactNode;
  children: React.ReactNode;
  onClose?: () => void;
};

export default function PopoverWrapper({
  triggerComponent,
  children,
  onClose,
}: PopoverWrapperProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    onClose?.();
  };

  return (
    <>
      <div onClick={handleClick}>{triggerComponent}</div>

      <Popover
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
      >
        <Box sx={{ py: 1, px: 0.5 }}>{children}</Box>
      </Popover>
    </>
  );
}
