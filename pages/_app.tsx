import "../styles/globals.css";
import type { AppType, AppContext } from "next/app";
import NextApp from "next/app";
import { logger } from "../src/logging/server";
import { AppErrorCapture } from "../src/logging/context";

const App: AppType = ({ Component, pageProps }) => {
  return (
    <AppErrorCapture>
      <Component {...pageProps} />
    </AppErrorCapture>
  );
};

App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  const { req, res } = appContext.ctx;

  if (req && res) {
    logger?.(req, res);
  }

  return appProps;
};

export default App;
