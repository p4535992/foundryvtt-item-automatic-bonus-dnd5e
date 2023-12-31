import { registerSettings, registerHandlebars } from "./scripts/settings.js";
import API from "./scripts/API/api.js";
import { registerSocket } from "./scripts/socket.js";
import CONSTANTS from "./scripts/constants/constants.js";
import { i18n } from "./scripts/lib/lib.js";

/* ------------------------------------ */
/* Initialize module					*/
/* ------------------------------------ */
Hooks.once("init", async () => {
  // console.log(`${CONSTANTS.MODULE_ID} | Initializing ${CONSTANTS.MODULE_ID}`);
  // Register custom module settings
  registerSettings();

  registerHandlebars();

  // Preload Handlebars templates
  //await preloadTemplates();

  // Hooks.once("socketlib.ready", registerSocket);
  // registerSocket();
});

/* ------------------------------------ */
/* Setup module							*/
/* ------------------------------------ */
Hooks.once("setup", function () {
  // Do anything after initialization but before ready
  game.modules.get(CONSTANTS.MODULE_ID).api = API;
});

/* ------------------------------------ */
/* When ready							*/
/* ------------------------------------ */
Hooks.once("ready", async () => {
  // Do anything once the module is ready
  // if (!game.modules.get('lib-wrapper')?.active && game.user?.isGM) {
  //   let word = 'install and activate';
  //   if (game.modules.get('lib-wrapper')) word = 'activate';
  //   throw error(`Requires the 'libWrapper' module. Please ${word} it.`);
  // }
  // if (!game.modules.get("socketlib")?.active && game.user?.isGM) {
  //   let word = "install and activate";
  //   if (game.modules.get("socketlib")) word = "activate";
  //   throw error(`Requires the 'socketlib' module. Please ${word} it.`);
  // }
  // await setupSockets();
});

/* ------------------------------------ */
/* Other Hooks							*/
/* ------------------------------------ */

Hooks.once("devModeReady", ({ registerPackageDebugFlag }) => {
  registerPackageDebugFlag(CONSTANTS.MODULE_ID);
});

