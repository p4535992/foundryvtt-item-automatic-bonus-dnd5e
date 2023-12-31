# Item automatic bonus dnd5e

![Latest Release Download Count](https://img.shields.io/github/downloads/p4535992/foundryvtt-item-automatic-bonus-dnd5e/latest/module.zip?color=2b82fc&label=DOWNLOADS&style=for-the-badge)

[![Forge Installs](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2Fitem-automatic-bonus-dnd5e&colorB=006400&style=for-the-badge)](https://forge-vtt.com/bazaar#package=item-automatic-bonus-dnd5e)

![Foundry Core Compatible Version](https://img.shields.io/badge/dynamic/json.svg?url=https%3A%2F%2Fraw.githubusercontent.com%2Fp4535992%2Ffoundryvtt-item-automatic-bonus-dnd5e%2Fmaster%2Fsrc%2Fmodule.json&label=Foundry%20Version&query=$.compatibility.verified&colorB=orange&style=for-the-badge)

![Latest Version](https://img.shields.io/badge/dynamic/json.svg?url=https%3A%2F%2Fraw.githubusercontent.com%2Fp4535992%2Ffoundryvtt-item-automatic-bonus-dnd5e%2Fmaster%2Fsrc%2Fmodule.json&label=Latest%20Release&prefix=v&query=$.version&colorB=red&style=for-the-badge)

[![Foundry Hub Endorsements](https://img.shields.io/endpoint?logoColor=white&url=https%3A%2F%2Fwww.foundryvtt-hub.com%2Fwp-json%2Fhubapi%2Fv1%2Fpackage%2Fitem-automatic-bonus-dnd5e%2Fshield%2Fendorsements&style=for-the-badge)](https://www.foundryvtt-hub.com/package/item-automatic-bonus-dnd5e/)

![GitHub all releases](https://img.shields.io/github/downloads/p4535992/foundryvtt-item-automatic-bonus-dnd5e/total?style=for-the-badge)

[![Translation status](https://weblate.foundryvtt-hub.com/widgets/item-automatic-bonus-dnd5e/-/287x66-black.png)](https://weblate.foundryvtt-hub.com/engage/item-automatic-bonus-dnd5e/)

### if you feel generous you can to buy me a coffee [![alt-text](https://img.shields.io/badge/-Patreon-%23ff424d?style=for-the-badge)](https://www.patreon.com/p4535992)

## Installation

It's always easiest to install modules from the in game add-on browser.

To install this module manually:
1.  Inside the Foundry "Configuration and Setup" screen, click "Add-on Modules"
2.  Click "Install Module"
3.  In the "Manifest URL" field, paste the following url:
`https://raw.githubusercontent.com/p4535992/foundryvtt-item-automatic-bonus-dnd5e/master/src/module.json`
4.  Click 'Install' and wait for installation to complete
5.  Don't forget to enable the module in game using the "Manage Module" button

### socketlib

This module uses the [socketlib](https://github.com/manuelVo/foundryvtt-socketlib) library for wrapping core methods. It is a hard dependency and it is recommended for the best experience and compatibility with other modules.

## Known issue

# API

The wiki for the API is [here](wiki/api.md)


# Build

## Install all packages

```bash
npm install
```

### dev

`dev` will let you develop you own code with hot reloading on the browser

```bash
npm run dev
```

## npm build scripts

### build

`build` will build and set up a symlink between `dist` and your `dataPath`.

```bash
npm run build
```

### build-watch

`build-watch` will build and watch for changes, rebuilding automatically.

```bash
npm run build-watch
```

### prettier-format

`prettier-format` launch the prettier plugin based on the configuration [here](./.prettierrc)

```bash
npm run-script prettier-format
```

## [Changelog](./CHANGELOG.md)

## Issues

Any issues, bugs, or feature requests are always welcome to be reported directly to the [Issue Tracker](https://github.com/p4535992/foundryvtt-item-automatic-bonus-dnd5e/issues), or using the [Bug Reporter Module](https://foundryvtt.com/packages/bug-reporter/).

## License

- [Introduce Me](https://github.com/WBHarry/item-automatic-bonus-dnd5e) with [MIT](https://github.com/WBHarry/item-automatic-bonus-dnd5e/blob/main/LICENSE)

This package is under an [MIT license](LICENSE) and the [Foundry Virtual Tabletop Limited License Agreement for module development](https://foundryvtt.com/article/license/).

## Credit

- Thanks to [WBHarry](https://github.com/WBHarry) for the module [Introduce Me](https://github.com/WBHarry/item-automatic-bonus-dnd5e)
- Thanks to [DarKDinDoN](https://github.com/DarKDinDoN) for the module [Introduce Me (with some bug fix)](https://github.com/DarKDinDoN/item-automatic-bonus-dnd5e)
