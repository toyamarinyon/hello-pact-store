// This would be externalised into a separate, importable plugin
import { Pact } from "@pact-foundation/pact";
import rimraf from "rimraf";

/**
 * @type {Cypress.PluginConfig}
 */
const handler = (on: (event: string, config: any) => void) => {
  let server: Pact;

  on("task", {
    async setupProvider(options) {
      server = new Pact({ ...options, logLevel: "debug" });
      const result = await server.setup();
      return result;
    },
    addInteractionToProvider(options) {
      return server.addInteraction(options);
    },
    verifyProvider() {
      return server.verify();
    },
    async finalizeProvider() {
      if (server) {
        console.log("finalize");
        return server.finalize().then(() => true);
      }
      throw new Error(
        "pact: cannot stop server, as no Pact mock service has been configured"
      );
    },
    //   async stopMockServer() {
    //     if (server) {
    //       return server.finalize().then(() => true);
    //     }
    //     throw new Error(
    //       "pact: cannot stop server, as no Pact mock service has been configured"
    //     );
    //   },
    //   addMockRoute(options) {
    //     return server.addInteraction(options);
    //   },
    //   verifyPacts() {
    //     if (server) {
    //       return server.verify();
    //     }
    //     throw new Error(
    //       "pact: cannot verify pacts, as no Pact mock service has been configured"
    //     );
    //   },
    //   clearPreviousPactInteractions({ dir }) {
    //     return new Promise((resolve, reject) => {
    //       rimraf(`${dir}/*.json`, (e) => {
    //         if (e) {
    //           console.log(
    //             "pact: error cleaning previous contract files:",
    //             e.message
    //           );
    //           reject(e);
    //         }
    //         resolve(null);
    //       });
    //     });
    //   },
  });
};
export default handler;
