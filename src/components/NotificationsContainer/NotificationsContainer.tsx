import { ToastContainer } from 'react-toastify';

function NotificationsContainer() {
  return <ToastContainer
        position="top-right"
        autoClose={1500}
        limit={5}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
};

export default NotificationsContainer;