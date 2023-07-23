import { toast } from 'react-toastify';
import { Theme } from "../enums/Theme";

export function createToast(message: string, theme: string) {  
  toast.info(message, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: theme === Theme.DARK ? "light" : "dark",
  });
}