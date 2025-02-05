import { toast, Bounce } from "react-toastify";

const toastConfiguration = {
   position: "bottom-center",
   autoClose: 2500,
   hideProgressBar: true,
   closeOnClick: true,
   pauseOnHover: true,
   draggable: true,
   progress: undefined,
   theme: "colored",
   transition: Bounce,
};

export function showSuccessNotification(message) {
   toast.success(message, toastConfiguration);
}

export function showInfoNotification(message) {
   toast.info(message, toastConfiguration);
}

export function showErrorNotification(message) {
   toast.error(message, toastConfiguration);
}
