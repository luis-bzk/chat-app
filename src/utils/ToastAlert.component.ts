import { ToastOptions, toast } from 'react-toastify';

const ToastAlertProperties: ToastOptions = {
  position: 'top-center',
  autoClose: 8000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
};

export const ToastAlertError = (message: string) => {
  return toast.error(message, ToastAlertProperties);
};

export const ToastAlertSuccess = (message: string) => {
  return toast.success(message, ToastAlertProperties);
};

export const ToastAlertWarning = (message: string) => {
  return toast.warn(message, ToastAlertProperties);
};
