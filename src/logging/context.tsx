import { useEffect } from "react";
import type { FC, PropsWithChildren } from "react";
import { logger } from "./client";

export const AppErrorCapture: FC<PropsWithChildren<{}>> = ({ children }) => {
  useEffect(() => {
    const errorListener: OnErrorEventHandler = (event) => {
      if (event instanceof Event) {
        const { error, lineno, colno } = event as ErrorEvent;
        logger.error({
          lineno,
          colno,
          message: error.message,
          stack: error.stack,
        });
      }
    };

    window.addEventListener("error", errorListener);

    return () => {
      window.removeEventListener("error", errorListener);
    };
  });
  return <>{children}</>;
};
