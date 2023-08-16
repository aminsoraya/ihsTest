declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_PROD_API_URL: string;
      NEXT_PUBLIC_DEV_API_URL: string;
      NEXT_PUBLIC_DEV_ADMIN_URL: string;
      NEXT_PUBLIC_DEV_USER_URL: string;
      NEXT_PUBLIC_PROD_ADMIN_URL: string;
      NEXT_PUBLIC_PROD_USER_URL: string;
    }
  }
}
export {};
