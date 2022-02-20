import { isElement } from './dom-node-safe-guards';

/**
 * Create `Element` from HTML string
 */
export function htmlToElement(html: string): Element {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = trimWhitespace(html);

    if (!wrapper.hasChildNodes()) {
        throw new Error('Expected to have child nodes');
    }

    if (wrapper.childElementCount > 1) {
        throw new Error('Expected to have only a single child');
    }

    const [element] = wrapper.children;

    if (!isElement(element)) {
        throw new Error('Expected to contain an Element');
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
