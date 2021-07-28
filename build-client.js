const { clientBuilder } = require("./client-builder");

(async () => {
  await clientBuilder();
  process.exit(0);
})();
