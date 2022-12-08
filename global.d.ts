declare namespace NodeJS {
    interface ProcessEnv {
      readonly DB_URL: string
      readonly PORT: string
    }
  }