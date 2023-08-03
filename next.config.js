// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withSentryConfig } = require("@sentry/nextjs")

const isProduction = process.env.APP_ENV === "production"

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  compiler: {
    removeConsole: isProduction,
  },
  webpack(config) {
    // don't minimize in development
    config.optimization.minimize = isProduction

    return config
  },
  async headers() {
    // Do not add headers here because they don't get applied correctly in Amplify. Use `customHttp.yaml` instead.
    return []
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/earn",
        permanent: false,
      },
      {
        source: "/stage4",
        destination: "/publicsale",
        permanent: false,
      },
      {
        source: "/vaults/:path*", // temporary don't want vault to show till ready & prevent snooping
        destination: "/",
        permanent: false,
      },
    ]
  },
}

module.exports = withSentryConfig(nextConfig, {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
  dryRun: !isProduction,
})
