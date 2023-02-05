import createCache from "@emotion/cache";

export const createEmotionCache = () =>
  createCache({ key: "css", prepend: true });

export default createEmotionCache;
