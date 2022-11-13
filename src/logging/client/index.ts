import pino from "pino";

export const logger = pino({
  browser: {
    asObject: true,
    transmit: {
      level: "info",
      send: (level, logEvent) => {
        const body = logEvent.messages[0];

        const headers = {
          type: "application/json",
        };
        const { userAgent, deviceMemory, connection } = window.navigator;
        const { href } = window.location;
        navigator.sendBeacon(
          "/api/log",
          new Blob(
            [
              JSON.stringify({
                body,
                href,
                userAgent,
                deviceMemory,
                connection: {
                  type: connection?.type,
                  effectiveType: connection?.effectiveType,
                  downlink: connection?.downlink,
                },
                level,
              }),
            ],
            headers
          )
        );
      },
    },
  },
});
