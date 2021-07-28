const { build } = require("esbuild");

/**
 *
 * @param {'production' | 'development'} environment
 * @returns
 */
async function clientBuilder(environment = "production") {
  return build({
    bundle: true,
    entryPoints: [`client/index.tsx`],
    minify: true,
    outfile: `public/client.js`,
    // for development
    sourcemap: environment !== "production",
    incremental: environment !== "production",
  });
}

module.exports = { clientBuilder };
