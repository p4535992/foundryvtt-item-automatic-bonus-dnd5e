import CONSTANTS from "./constants/constants.js";

export const registerSettings = () => {
  game.settings.register(CONSTANTS.MODULE_ID, "debug", {
    name: `${CONSTANTS.MODULE_ID}.gameSettings.debug.title`,
    hint: `${CONSTANTS.MODULE_ID}.gameSettings.debug.hint`,
    scope: "client",
    config: true,
    default: false,
    type: Boolean,
  });
};

export const registerHandlebars = () => {
  // loadTemplates([
  //   `modules/${CONSTANTS.MODULE_ID}/templates/introduction.hbs`,
  // ]);
};
