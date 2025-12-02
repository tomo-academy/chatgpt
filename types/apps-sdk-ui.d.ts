import Link from "next/link";

declare global {
  interface AppsSDKUIConfig {
    LinkComponent: typeof Link;
  }
}

export {};