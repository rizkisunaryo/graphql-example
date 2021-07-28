const chokidar = require("chokidar");
const liveServer = require("live-server");
const { clientBuilder } = require("./client-builder");

(async () => {
  // `esbuild` bundler for JavaScript / TypeScript.

  const builder = await clientBuilder("development");
  // `chokidar` watcher source changes.
  chokidar
    // Watches TypeScript and React TypeScript.
    .watch("client/**/*.{js,jsx,ts,tsx}", {
      interval: 0, // No delay
    })
    // Rebuilds esbuild (incrementally -- see `build.incremental`).
    .on("all", () => {
      builder.rebuild();
    });
  // `liveServer` local server for hot reload.
  liveServer.start({
    // Opens the local server on start.
    open: false,
    // Uses `PORT=...` or 8080 as a fallback.
    port: 3000,
    // Uses `public` as the local server folder.
    root: "public",
    file: "client.html",
    proxy: [["/api", "http://localhost:4000/api"]],
  });
})();
