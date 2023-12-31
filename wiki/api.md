The api is reachable from the variable `game.modules.get('item-automatic-bonus-dnd5e').api` or from the socket libary `socketLib` on the variable `game.modules.get('item-automatic-bonus-dnd5e').socket` if present and active.

### The documentation can be out of sync with the API code checkout the code if you want to dig up [API](../src/scripts/api.js)

You can find some javascript examples here **=> [macros](./macros/) <=**

#### xxx({options}):void ⇒ <code>Promise&lt;void&gt;</code>

**Returns**: <code>Promise&lt;void&gt;</code> - Return nothing

| Param | Type | Description | Note |
| --- | --- | --- | --- |
| options | `object` | | The options to pass to the function 
| [options.yyy] | <code>string</code> |  | |


**Example basic**:

```javascript

game.modules.get('item-automatic-bonus-dnd5e').api.xxx(
{

});

```