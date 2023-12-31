import CONSTANTS from "../constants/constants";
import { error, i18n } from "./lib";

export class ItemAutomaticBonusDnd5eHelpers {
  static applyImagesOnInventory(app, html, data) {
    if (!app) {
      return;
    }
    const actor = app.object;

    // =================================
    // DnD5e
    // =================================
    if (game.system.id === "dnd5e") {
      let items = [];
      const isTidySheetKgar = actor.sheet.id.startsWith("Tidy5eCharacterSheet");
      if (isTidySheetKgar) {
        items = html.find($(".item-table .item-table-row"));
      } else {
        items = html.find($(".item-list .item"));
      }

      for (let itemElement of items) {
        let htmlId = itemElement.outerHTML.match(/data-item-id="(.*?)"/);
        if (!htmlId) {
          continue;
        }
        let id = htmlId[1];
        let item = actor.items.get(id);
        if (!item) {
          continue;
        }
        let title = null;
        if (isTidySheetKgar) {
          title = itemElement.querySelector(".item-name");
        } else {
          title = itemElement.querySelector("h4");
        }
        title.style.display = "contents";

        const itemBonusProperties = API.getCollection({ item: item });
        if (itemBonusProperties) {
          for (const itemBonusProperty of itemBonusProperties) {
            if (itemBonusProperty.showImageIcon) {
              const icon = itemBonusProperty.img;
              const tooltipText = itemBonusProperty.shortDescriptionLink
                ? itemBonusProperty.shortDescriptionLink
                : itemBonusProperty.subType;
              const img = document.createElement("img");
              img.src = icon;
              // img.classList.add("item-image");
              img.style.border = "none";
              img.style.marginRight = "5px";
              img.style.marginLeft = "5px";
              img.style.height = "20px";
              img.style.width = "20px";
              if (tooltipText) {
                img.dataset.tooltip = tooltipText;
                img.dataset.tooltipDirection = "UP";
              }
              title.prepend(img);
            }
          }
        }
      }
    }
  }

  static async transferFlagsFromItemToItem(itemWherePutTheFlags, itemWithTheFlags) {
    itemWherePutTheFlags = await getItemAsync(itemWherePutTheFlags);
    itemWithTheFlags = await getItemAsync(itemWithTheFlags);
    const currentFlags = getProperty(itemWherePutTheFlags, `flags.${CONSTANTS.MODULE_ID}`) ?? {};
    const newFlags = getProperty(itemWithTheFlags, `flags.${CONSTANTS.MODULE_ID}`) ?? {};
    const updatedFlags = mergeObject(currentFlags, newFlags);
    await itemWherePutTheFlags.update(
      {
        flags: {
          [CONSTANTS.MODULE_ID]: {
            updatedFlags,
          },
        },
      },
      { render: false }
    );
  }

  // =====================================================================================================

  static _getSystemCONFIG() {
    switch (game.system.id) {
      //@ts-expect-error .
      case "dnd5e":
        return CONFIG.DND5E;
      //@ts-expect-error .
      case "sw5e":
        return { ...CONFIG.SW5E, skills: { ...CONFIG.SW5E.skills, ...CONFIG.SW5E.starshipSkills } };
      //@ts-expect-error .
      case "n5e":
        return CONFIG.N5E;
      default:
        return {};
    }
  }

  async _onMacroControl(event) {
    event.preventDefault();
    const a = event.currentTarget;

    // TODO
  }

  static _activateMacroListeners(app, html) {
    //@ts-ignore
    if (app.isEditable) {
      // $(html).find(".macro-control").on("click", _onMacroControl.bind(app));
      $(html)
        .find(`input[name^='${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.itemDurabilityProperties}']`)
        .on("click", ItemAutomaticBonusDnd5eHelpers._onMacroControl.bind(app));
    }
  }

  static _getItemSheetDataItemDurability(data, item) {
    const config = ItemAutomaticBonusDnd5eHelpers._getSystemCONFIG();
    const itemDurabilityProps = getProperty(
      config,
      `${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.itemDurabilityProperties}`
    );
    if (!item) {
      const message = "item not defined in getItemSheetData";
      console.error(message, data);
      //TroubleShooter.recordError(new Error(message));
      return;
    }
    data = mergeObject(data, {
      itemDurabilityPropertyLabels: itemDurabilityProps,
    });
    setProperty(
      data,
      `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.itemDurabilityProperties}`,
      getProperty(item, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.itemDurabilityProperties}`) ?? {}
    );
    if (
      item &&
      // && ["spell", "feat", "weapon", "consumable", "equipment", "power", "maneuver"].includes(item.type)
      ["weapon", "equipment"].includes(item.type)
    ) {
      for (let prop of Object.keys(itemDurabilityProps)) {
        if (
          getProperty(item, `system.properties.${prop}`) !== undefined &&
          getProperty(item, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.itemDurabilityProperties}.${prop}`) ===
            undefined
        ) {
          setProperty(
            data,
            `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.itemDurabilityProperties}.${prop}`,
            item.system.properties[prop]
          );
        } else if (
          getProperty(item, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.itemDurabilityProperties}.${prop}`) ===
          undefined
        ) {
          if (prop === "saveDamage") {
            // DO NOTHING
          } else {
            setProperty(
              data,
              `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.itemDurabilityProperties}.${prop}`,
              false
            );
          }
        }
      }
    }
    data.showHeader = true;
    return data;
  }

  static applyPanelItemDurabilityProperties(app, html, data) {
    const item = app.object;
    if (!item) {
      return;
    }
    if (app.constructor.name !== "Tidy5eKgarItemSheet") {
      if (
        item &&
        // && ["spell", "feat", "weapon", "consumable", "equipment", "power", "maneuver"].includes(data.item.type)
        ["weapon", "equipment"].includes(data.item.type)
      ) {
        data = mergeObject(data, ItemAutomaticBonusDnd5eHelpers._getItemSheetDataItemDurability(data, item));
        renderTemplate(`modules/${CONSTANTS.MODULE_ID}/templates/itemDurabilityPropertiesForm.hbs`, data).then(
          (templateHtml) => {
            const element = html.find('input[name="system.chatFlavor"]').parent().parent();
            element.append(templateHtml);
            ItemAutomaticBonusDnd5eHelpers._activateMacroListeners(app, html);
          }
        );
      }
    }

    return data;
  }

  static applyPanelItemSpecialProperties(app, html, data) {}
}
