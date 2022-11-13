export {};

declare global {
  interface Navigator {
    readonly deviceMemory?: number;
  }
}
