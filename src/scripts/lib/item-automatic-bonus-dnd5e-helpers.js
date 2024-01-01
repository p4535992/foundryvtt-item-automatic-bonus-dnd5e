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

        // TODO
        // const itemBonusProperties = API.getCollection({ item: item });
        const itemBonusProperties = [];
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

  // ===============================================================================================================

  /**
   * Get a color used to represent the current hit points of an Actor.
   * @param {number} current        The current HP value
   * @param {number} max            The maximum HP value
   * @returns {Color}               The color used to represent the HP percentage
   */
  static _getHPColor(current, max) {
    const pct = Math.clamped(current, 0, max) / max;
    return Color.fromRGB([1 - pct / 2, pct, 0]);
  }

  static onUpdateItem(item, update, options, user) {
    const hp = {
      value: getProperty(item, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.itemHpValue}`),
      max: getProperty(item, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.itemHpMax}`),
      temp: getProperty(item, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.itemHpTemp}`),
      tempmax: getProperty(item, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.itemHpTempMax}`),
      formula: getProperty(item, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.itemHpFormula}`),
    };

    // const hpUpdate = {
    //   value: getProperty(update, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.itemHpValue}`),
    //   max: getProperty(update, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.itemHpMax}`),
    //   temp: getProperty(update, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.itemHpTemp}`),
    //   tempmax: getProperty(update, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.itemHpTempMax}`),
    //   formula: getProperty(update, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.itemHpFormula}`),
    // };

    const hpUpdateKeys = Object.keys(getProperty(update, `flags.${CONSTANTS.MODULE_ID}`) || {}) || [];
    const isHpUpdate =
      hpUpdateKeys.includes(`${CONSTANTS.FLAGS.itemHpValue}`) ||
      hpUpdateKeys.includes(`${CONSTANTS.FLAGS.itemHpMax}`) ||
      hpUpdateKeys.includes(`${CONSTANTS.FLAGS.itemHpTemp}`) ||
      hpUpdateKeys.includes(`${CONSTANTS.FLAGS.itemHpTempMax}`) ||
      hpUpdateKeys.includes(`${CONSTANTS.FLAGS.itemHpFormula}`);
    if (isHpUpdate) {
    }
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

  static async _onMacroControl(event) {
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
      // .on("click", ItemAutomaticBonusDnd5eHelpers._onMacroControl(app));
    }
  }

  static _getItemSheetData(data, item, flagNamespace) {
    const config = ItemAutomaticBonusDnd5eHelpers._getSystemCONFIG();
    const itemProps = getProperty(config, `${CONSTANTS.MODULE_ID}.${flagNamespace}`);
    if (!item) {
      const message = "item not defined in getItemSheetData";
      console.error(message, data);
      //TroubleShooter.recordError(new Error(message));
      return;
    }
    data = mergeObject(data, {
      [`${flagNamespace}Labels`]: itemProps,
      // TODO ??? NON SEMBRA NECESSARIO
      // [CONSTANTS.MODULE_ID]: {
      //   [`${flagNamespace}Labels`]: itemProps,
      // }
    });
    setProperty(
      data,
      `flags.${CONSTANTS.MODULE_ID}.${flagNamespace}`,
      getProperty(item, `flags.${CONSTANTS.MODULE_ID}.${flagNamespace}`) ?? {}
    );
    if (
      item &&
      // && ["spell", "feat", "weapon", "consumable", "equipment", "power", "maneuver"].includes(item.type)
      ["weapon", "equipment"].includes(item.type)
    ) {
      for (let prop of Object.keys(itemProps)) {
        if (
          getProperty(item, `system.properties.${prop}`) !== undefined &&
          getProperty(item, `flags.${CONSTANTS.MODULE_ID}.${flagNamespace}.${prop}`) === undefined
        ) {
          setProperty(data, `flags.${CONSTANTS.MODULE_ID}.${flagNamespace}.${prop}`, item.system.properties[prop]);
        } else if (getProperty(item, `flags.${CONSTANTS.MODULE_ID}.${flagNamespace}.${prop}`) === undefined) {
          if (prop === "saveDamage") {
            // DO NOTHING
          } else {
            setProperty(data, `flags.${CONSTANTS.MODULE_ID}.${flagNamespace}.${prop}`, false);
          }
        }
      }
    }
    data.showHeader = true;

    // HP bar
    const m = {};
    m.hp = {};
    const hp = {
      value: getProperty(item, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.itemHpValue}`) || 0,
      max: getProperty(item, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.itemHpMax}`) || 0,
      temp: getProperty(item, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.itemHpTemp}`) || 0,
      tempmax: getProperty(item, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.itemHpTempMax}`) || 0,
      formula: getProperty(item, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.itemHpFormula}`) || "",
    };
    // member.system.attributes.hp;
    m.hp.current = hp.value + (hp.temp || 0);
    m.hp.max = Math.max(0, hp.max + (hp.tempmax || 0));
    m.hp.pct = Math.clamped((m.hp.current / m.hp.max) * 100, 0, 100).toFixed(2);
    m.hp.color = ItemAutomaticBonusDnd5eHelpers._getHPColor(m.hp.current, m.hp.max).css;
    m.currentHP += m.hp.current; // stats.
    m.maxHP += m.hp.max; // stats.

    (m.itemHpValue = getProperty(item, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.itemHpValue}`) || 0),
      (m.itemHpMax = getProperty(item, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.itemHpMax}`) || 0),
      (m.itemHpTemp = getProperty(item, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.itemHpTemp}`) || 0),
      (m.itemHpTempMax = getProperty(item, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.itemHpTempMax}`) || 0),
      (m.itemHpFormula = getProperty(item, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.itemHpFormula}`) || "");

    data.member = m;
    data.displayHPValues = item.testUserPermission(game.user, "OBSERVER");
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
        data = mergeObject(
          data,
          ItemAutomaticBonusDnd5eHelpers._getItemSheetData(data, item, CONSTANTS.FLAGS.itemDurabilityProperties)
        );
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
