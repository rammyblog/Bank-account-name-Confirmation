declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      PORT: string;
      PAYSTACK_SECRET_KEY: string;
    }
  }
}

export {}
