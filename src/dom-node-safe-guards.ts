export function isElement(node: Node | null): node is Element {
    return node != null && node.nodeType === Node.ELEMENT_NODE;
}

export function isTextNode(node: Node | null): node is Text {
    return node != null && node.nodeType === Node.TEXT_NODE;
}
