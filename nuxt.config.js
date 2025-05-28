export default {
  // https://nuxtjs.org/deployments/netlify/
  target: "static",

  ssr: false,

  // Define the source directory explicitly
  srcDir: __dirname,

  generate: {
    fallback: true,
  },

  // Headers of the page
  head: {
    title: "EnterCinema: Fast-track your entertainment picks",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Fast-track your entertainment picks.",
      },
      { hid: "author", name: "author", content: "ivanluna.dev" },
      { hid: "og:locale", property: "og:locale", content: "en_GB" },
      { hid: "og:title", property: "og:title", content: "EnterCinema" },
      {
        hid: "og:description",
        property: "og:description",
        content: "Fast-track your entertainment picks.",
      },
      { hid: "og:type", property: "og:type", content: "website" },
      {
        hid: "og:url",
        property: "og:url",
        content: "https://ivanluna.dev/",
      },
    ],
    link: [
      // Main favicon
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      
      // Standard favicon sizes
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32.png" },
      { rel: "icon", type: "image/png", sizes: "36x36", href: "/favicon-36.png" },
      { rel: "icon", type: "image/png", sizes: "48x48", href: "/favicon-48.png" },
      { rel: "icon", type: "image/png", sizes: "57x57", href: "/favicon-57.png" },
      { rel: "icon", type: "image/png", sizes: "60x60", href: "/favicon-60.png" },
      { rel: "icon", type: "image/png", sizes: "72x72", href: "/favicon-72.png" },
      { rel: "icon", type: "image/png", sizes: "76x76", href: "/favicon-76.png" },
      { rel: "icon", type: "image/png", sizes: "96x96", href: "/favicon-96.png" },
      { rel: "icon", type: "image/png", sizes: "192x192", href: "/favicon-192.png" },
      
      // Apple touch icons (precomposed versions for better iOS compatibility)
      { rel: "apple-touch-icon", sizes: "72x72", href: "/favicon-72-precomposed.png" },
      { rel: "apple-touch-icon", sizes: "114x114", href: "/favicon-114-precomposed.png" },
      { rel: "apple-touch-icon", sizes: "120x120", href: "/favicon-120-precomposed.png" },
      { rel: "apple-touch-icon", sizes: "144x144", href: "/favicon-144-precomposed.png" },
      { rel: "apple-touch-icon", sizes: "152x152", href: "/favicon-152-precomposed.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/favicon-180-precomposed.png" },
      
      // Fonts
      {
        rel: "stylesheet",
        href: "//fonts.googleapis.com/css?family=Roboto:300,400,500",
      },
    ],
  },

  // Global CSS
  css: ["@/assets/css/global.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/lazyload.js",
    "~/plugins/filters.js",
    { src: "~/plugins/ga.js", ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // ESLint temporalmente desactivado para permitir hot-reloading
    // "@nuxtjs/eslint-module",
  ],

  modules: ["@nuxtjs/dotenv", "@nuxtjs/axios", "@nuxtjs/pwa"],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: "/",
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    icon: {
      // Configure PWA icons to use your favicon files
      source: 'static/favicon-192.png',
      sizes: [64, 120, 144, 152, 192, 384, 512]
    },
    manifest: {
      lang: "en",
      name: "EnterCinema",
      short_name: "EnterCinema",
      description: "Fast-track your entertainment picks.",
      theme_color: "#03496B",
      background_color: "#03496B",
      display: "standalone",
      icons: [
        {
          src: "/favicon-192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "/favicon-144-precomposed.png",
          sizes: "144x144",
          type: "image/png"
        },
        {
          src: "/favicon-96.png",
          sizes: "96x96",
          type: "image/png"
        },
        {
          src: "/favicon-72.png",
          sizes: "72x72",
          type: "image/png"
        },
        {
          src: "/favicon-48.png",
          sizes: "48x48",
          type: "image/png"
        }
      ]
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  loaders: {
    cssModules: {
      camelCase: true,
      localIdentName: "[local]_[hash:base64:5]",
    },
  },

  vue: {
    config: {
      productionTip: false,
      devtools: false,
    },
  },

  env: {
    FRONTEND_URL: process.env.FRONTEND_URL || "https://entercinema.com",
    API_URL: process.env.API_URL || "https://entercinema-drf.vercel.app",
    API_KEY: process.env.API_KEY || "",
    API_LANG: process.env.API_LANG || "en",
    API_COUNTRY: process.env.API_COUNTRY || "en",
    SUPABASE_URL: process.env.SUPABASE_URL || "https://lamskoiorahedpvfkvav.supabase.co",
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || "",
    API_YOUTUBE_KEY: process.env.API_YOUTUBE_KEY || "",
    GA: process.env.GA || "",
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
  },

  // Customize the progress bar color
  loading: {
    color: "#2196f3",
  },
};