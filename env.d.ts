/// <reference types="vite/client" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
      PORT?: string,
      REACT_APP_PARTITION_SIZE: 50
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export { ProcessEnv }
