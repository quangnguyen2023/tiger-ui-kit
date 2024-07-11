import { Box, Popover } from '@mui/material';
import { createContext, useEffect, useState } from 'react';

type PopoverWrapperProps = {
  triggerComponent: React.ReactNode;
  children: React.ReactNode;
  onClose?: () => void;
  anchorHorizontal?: 'left' | 'right';
  transformHorizontal?: 'left' | 'right';
};

export const PopoverWrapperContext = createContext({
  onClosePopover: () => {},
});

export default function PopoverWrapper({
  triggerComponent,
  children,
  onClose,
  anchorHorizontal = 'right',
  transformHorizontal = 'right',
}: PopoverWrapperProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setTimeout(() => onClose?.(), 100);
  };

  return (
    <>
      <div className='w-fit' onClick={handleClick}>{triggerComponent}</div>

      <PopoverWrapperContext.Provider value={{ onClosePopover: handleClose }}>
        <Popover
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: anchorHorizontal }}
          transformOrigin={{ vertical: 'top', horizontal: transformHorizontal }}
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
          <div className="dark:bg-[#404040] dark:text-white">{children}</div>
        </Popover>
      </PopoverWrapperContext.Provider>
    </>
  );
}
