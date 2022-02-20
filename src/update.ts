import { isElement, isTextNode } from './dom-node-safe-guards';
import { htmlToElement } from './html-to-element';

interface Attribute {
    key: string;
    value: string;
}

/**
 * Apply changes of `Node` or HTML string to given `Node` optimally.
 */
export function update(current: Node, nextNodeOrHtml: Node | string): void {
    const nextNode =
        typeof nextNodeOrHtml === 'string'
            ? htmlToElement(nextNodeOrHtml)
            : nextNodeOrHtml;

    return updateNode(current, nextNode);
}

function updateNode(current: Node, next: Node): void {
    if (shouldUpdateWholeNode(current, next)) {
        // No need to traverse children
        return updateWholeNode(current, next);
    }

    const childrenToAdd = Array.from(next.childNodes).slice(
        current.childNodes.length
    );
    const childrenToRemove: Node[] = [];

    // TODO: If order of nodes changes they are currently completely re-created.
    // This could be optimized to preserve nodes and respect their order.
    current.childNodes.forEach((currentChild, index) => {
        const nextChild = next.childNodes[index];

        if (!nextChild) {
            return childrenToRemove.push(currentChild);
        }

        if (currentChild.hasChildNodes() || nextChild.hasChildNodes()) {
            updateNode(currentChild, nextChild);
        }

        if (isTextNode(currentChild) && isTextNode(nextChild)) {
            if (currentChild.textContent !== nextChild.textContent) {
                currentChild.textContent = nextChild.textContent;
            }
        }
    });

    childrenToRemove.forEach(current.removeChild.bind(current));
    childrenToAdd.forEach(current.appendChild.bind(current));

    // Update attributes
    if (isElement(current)) {
        const currentAttributes = getAttributes(current);
        const nextAttributes = getAttributes(next);

        const nextIsElement = isElement(next);

        for (const { key, value } of nextAttributes) {
            // Update changed attributes and add new attributes
            if (current.getAttribute(key) !== value) {
                current.setAttribute(key, value);
            }
        }

        for (const { key } of currentAttributes) {
            if (nextIsElement) {
                // Remove missing attributes
                if (!next.hasAttribute(key)) {
                    current.removeAttribute(key);
                }
            }
        }
    }
}

function getAttributes(node: Node): Attribute[] {
    if (!isElement(node)) return [];

    return node
        .getAttributeNames()
        .reduce<Attribute[]>(
            (all, key) => [
                ...all,
                { key, value: node.getAttribute(key) || '' },
            ],
            []
        );
}

function shouldUpdateWholeNode(current: Node, next: Node): boolean {
    // Node type has changed, e.g. Element -> TextNode
    if (current.nodeType !== next.nodeType) {
        return true;
    }

    // Node type has changed, e.g. <div> -> <span>
    if (isElement(current) && isElement(next)) {
        return current.tagName !== next.tagName;
    }

    // At this point both nodes at TextNodes
    return current.textContent !== next.textContent;
}

function updateWholeNode(current: Node, next: Node): void {
    // Previous element can be completely replaced with new node
    if (isElement(current)) {
        current.replaceWith(next);
    }
    // Previous text node can be replaced with new text
    else if (isTextNode(current) && isTextNode(next)) {
        current.textContent = next.textContent;
    }
    // Previous text node can be replaced with new node
    else if (isTextNode(current) && isElement(next)) {
        if (current.parentElement) {
            current.parentElement.replaceChild(next, current);
        } else {
            console.warn(`Unexpected case, missing parentElement: ${current}`);
        }
    } else {
        console.warn(
            [
                'Unexpected case:',
                `isElement(current): ${isElement(current)}`,
                `isTextNode(current): ${isTextNode(current)}`,
                `isElement(next): ${isElement(next)}`,
                `isTextNode(next): ${isTextNode(next)}`,
            ].join(' ')
        );
    }
}
