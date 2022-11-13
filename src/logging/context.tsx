import { useEffect } from "react";
import type { FC, PropsWithChildren } from "react";
import { logger } from "./client";

export const AppErrorCapture: FC<PropsWithChildren<{}>> = ({ children }) => {
  useEffect(() => {
    const errorListener: OnErrorEventHandler = (event) => {
      if (event instanceof Event) {
        const { error, lineno, colno } = event as ErrorEvent;
        if (!error.hasBeenLogged) {
          logger.error({
            lineno,
            colno,
            message: error.message,
            stack: error.stack,
          });
          error.hasBeenLogged = true;
        }
      }
    };
    const promiseRejectionListener = (event: PromiseRejectionEvent) => {
      logger.error({
        message: event.reason.message,
        stack: event.reason.stack,
      });
    };

    window.addEventListener("error", errorListener);
    window.addEventListener("unhandledrejection", promiseRejectionListener);

    return () => {
      window.removeEventListener("error", errorListener);
      window.removeEventListener("unhandledrejection", promiseRejectionListener);
    };
  });
  return <>{children}</>;
};
