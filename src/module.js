import { registerSettings, registerHandlebars } from "./scripts/settings.js";
import API from "./scripts/API/api.js";
import { registerSocket } from "./scripts/socket.js";
import CONSTANTS from "./scripts/constants/constants.js";
import { i18n } from "./scripts/lib/lib.js";
import { ItemAutomaticBonusDnd5eHelpers } from "./scripts/lib/item-automatic-bonus-dnd5e-helpers.js";
import { ItemAutomaticBonusDnd5eMapperHelpers } from "./scripts/lib/item-automatic-bonus-dnd5-mapper-helpers.js";

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
  ItemAutomaticBonusDnd5eMapperHelpers.addConfigItemDurabilityOptions();
});

/* ------------------------------------ */
/* Other Hooks							*/
/* ------------------------------------ */

Hooks.once("devModeReady", ({ registerPackageDebugFlag }) => {
  registerPackageDebugFlag(CONSTANTS.MODULE_ID);
});

Hooks.on("renderActorSheet", (app, html, data) => {
  ItemAutomaticBonusDnd5eHelpers.applyImagesOnInventory(app, html, data);
});

Hooks.on("renderItemSheet", (app, html, data) => {
  ItemAutomaticBonusDnd5eHelpers.applyPanelItemDurabilityProperties(app, html, data);
  ItemAutomaticBonusDnd5eHelpers.applyPanelItemSpecialProperties(app, html, data);
});

Hooks.once("tidy5e-sheet.ready", (api) => {
  // ItemAutomaticBonusDnd5eHelpers.applyPanelItemDurabilityPropertiesForTidy(app, html, data);
  // ItemAutomaticBonusDnd5eHelpers.applyPanelItemSpecialPropertiesForTidy(app, html, data);
  const myTab = new api.models.HandlebarsTab({
    title: i18n("item-automatic-bonus-dnd5e.itemDurabilityTab.title"), // TOD i18n
    tabId: "item-automatic-bonus-dnd5e-item-durability-tab",
    path: `modules/${CONSTANTS.MODULE_ID}/templates/itemDurabilityPropertiesForm.hbs`,
    enabled: (data) => {
      //return ["spell", "feat", "weapon", "consumable", "equipment", "power", "maneuver"].includes(data.item.type)
      return ["weapon", "equipment"].includes(data.item.type);
    },
    getData: (data) => {
      data = ItemAutomaticBonusDnd5eHelpers._getItemSheetData(
        data,
        data.item,
        CONSTANTS.FLAGS.itemDurabilityProperties
      );
      data.showHeader = false;
      return data;
    },
    onRender: (params) => {
      ItemAutomaticBonusDnd5eHelpers._activateMacroListeners(params.app, params.tabContentsElement);
    },
  });
  api.registerItemTab(myTab);
});

// Hooks.on("dnd5e.preRollDamage", (item, rollConfig) => {
Hooks.on("dnd5e.rollDamage", (item, rollConfig) => {});

Hooks.on("updateItem", async (item, update, options, user) => {
  ItemAutomaticBonusDnd5eHelpers.onUpdateItem(item, update, options, user);
});
