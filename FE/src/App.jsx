import { ConfigProvider } from "antd";
import { ToastContainer } from "react-toastify";
import AllRoute from "~/components/AllRoute/AllRoute";

function App() {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#EB5757",
            fontSize: 16,
          },

          components: {
            Typography: {},
          },
        }}
      >
        <AllRoute />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          closeOnClick={true}
          pauseOnFocusLoss
        />
      </ConfigProvider>
    </>
  );
}

export default App;
