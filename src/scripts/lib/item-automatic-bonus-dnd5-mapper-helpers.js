import CONSTANTS from "../constants/constants";
import { ItemAutomaticBonusDnd5eHelpers } from "./item-automatic-bonus-dnd5e-helpers";
import { i18n } from "./lib";

export class ItemAutomaticBonusDnd5eMapperHelpers {
  static addConfigItemDurabilityOptions() {
    CONFIG.DND5E.lootTypes["iabdBonus"] = {
      label: "item-automatic-bonus-dnd5e.Loot.Bonus",
    };

    let config = ItemAutomaticBonusDnd5eHelpers._getSystemCONFIG();
    if (game.system.id === "dnd5e" || game.system.id === "n5e") {
      setProperty(config, `${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.itemDurabilityProperties}`, {});
      // TODO RECUPERA I DATI DAGLI ITEM NEL COMPENDIUM
      setProperty(config, `${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.itemDurabilityProperties}.${"test"}`, {
        enable: false,
        img: CONSTANTS.DEFAULT_ICON_IMG_DURABILITY,
        name: i18n("test label"),
        percentage: 0,
      });
    } else if (game.system.id === "sw5e") {
      //   // sw5e
      //   config = CONFIG.SW5E;
      //   setProperty(config, `${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.itemDurabilityProperties}`, {});
      //   setProperty(
      //     config,
      //     `${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.itemDurabilityProperties}.${"test"}`,
      //     i18n("test label")
      //   );
    }
  }
}
