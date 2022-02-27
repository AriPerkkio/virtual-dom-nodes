import { isElement } from './dom-node-safe-guards.js';

/**
 * Create `Element` from HTML string
 */
export function htmlToElement(html: string): Element {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = trimWhitespace(html);

    if (wrapper.childNodes.length > 1) {
        // As given html created multiple nodes, we'll just return a div
        // wrapper with given nodes as children.
        return wrapper;
    }

    const element = wrapper.firstElementChild;

    if (!isElement(element)) {
        // As given html did not create an element, we'll just return a div
        // wrapper with given HTML as innerHTML (= text content).
        return wrapper;
    }

    return element;
}

const MULTIPLE_SPACES_REGEXP = / {2,}/g;
const MULTIPLE_NEWLINES_REGEXP = /\n+/g;
const LEADING_WHITESPACE_REGEXP = /\n {1,}/g;
const TRAILING_WHITESPACE_REGEXP = / {1,}\n/g;
const NEWLINE_REGEXP = /\n/g;

function trimWhitespace(text: string) {
    return text
        .replace(MULTIPLE_SPACES_REGEXP, ' ')
        .replace(MULTIPLE_NEWLINES_REGEXP, '\n')
        .replace(LEADING_WHITESPACE_REGEXP, '\n')
        .replace(TRAILING_WHITESPACE_REGEXP, '\n')
        .replace(NEWLINE_REGEXP, '')
        .trim();
}
