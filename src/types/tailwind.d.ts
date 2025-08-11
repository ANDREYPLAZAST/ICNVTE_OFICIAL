declare module 'tailwindcss' {
  export interface Config {
    darkMode?: string | string[];
    content?: string[];
    theme?: any;
    plugins?: any[];
  }
}

declare module 'tailwindcss-animate' {
  const plugin: any;
  export = plugin;
}
