# virtual-dom-nodes

[![version](https://img.shields.io/npm/v/virtual-dom-nodes)](https://www.npmjs.com/package/virtual-dom-nodes)

Apply changes to DOM `Element`s with minimal work. Utilizes internal "virtual DOM" to avoid causing expensive and slow DOM manipulations.

## API

### `update`

```ts
import { update } from 'virtual-dom-nodes';

const element = document.createElement('div');
element.setAttribute('id', 'demo-id');
element.appendChild(document.createTextNode('Hello world'));

// Optimally applies required changes to element
update(element, "<div id='new-id'>Hello world<div>");

> element.outerHTML
'<div id="new-id">Hello world<div>'
```

### `htmlToElement`

```ts
import { htmlToElement } from 'virtual-dom-nodes';

const element = htmlToElement(`
    <div role="status" id="test-id">
        Hello world!
    </div>
`);

> element instanceof Element
true

> element.outerHTML
'<div role="status" id="test-id">Hello world!</div>'
```
