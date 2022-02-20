export function isElement(node: Node): node is Element {
    return node.nodeType === Node.ELEMENT_NODE;
}

export function isTextNode(node: Node): node is Text {
    return node.nodeType === Node.TEXT_NODE;
}