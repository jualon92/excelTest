import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close'; 
import { IEnqueueOptions } from "../utils/interfaces";

const useNotification = () => {
  const [conf, setConf] = useState<IEnqueueOptions>({
    variant: 'info',
    msg: '',
  });
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    const action = (key: any) => {
      return (
        <>
          <IconButton
            onClick={() => {
              closeSnackbar(key);
            }}
          >
            <CloseIcon />
          </IconButton>
        </>
      );
    };

    if (conf?.msg) {
      enqueueSnackbar(conf.msg, {
        variant: conf.variant ? conf.variant : 'info',
        autoHideDuration: 1400, //4500
        action,
      });
    }
  }, [conf, enqueueSnackbar, closeSnackbar]);

  return [conf, setConf] as const;
};

export default useNotification;
