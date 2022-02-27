import { update } from '../src';

test('basic', () => {
    const source = html();
    update(source, html('<div>Hello world</div>'));

    expect(excludeRoot(source)).toMatchInlineSnapshot(`
<div>
  Hello world
</div>
`);
});

test('change root element type', () => {
    const source = html('<div>Hello world</div>');
    update(source, html('<span>Hello world</span>'));

    expect(excludeRoot(source)).toMatchInlineSnapshot(`
<span>
  Hello world
</span>
`);
});

test('empty', () => {
    const source = html(`
        <div>
            Parent
            <span id="target">
                Hello world
            </span>
        </div>
    `);
    const target = source.querySelector('#target')!;

    update(target, null);

    expect(excludeRoot(source)).toMatchInlineSnapshot(`
<div>
  Parent
</div>
`);
});

test('change children element type', () => {
    const source = html(`
        <div>
            <span>
                Hello world
            </span>
        </div>
    `);

    update(
        source,
        html(`
            <div>
                <p>
                    Hello world
                </p>
            </div>
        `)
    );

    expect(excludeRoot(source)).toMatchInlineSnapshot(`
<div>
  <p>
     Hello world 
  </p>
</div>
`);
});

test('change root element attribute', () => {
    const setAttribute = jest.spyOn(Element.prototype, 'setAttribute');
    const source = html('<div role="status">Hello world</div>');

    update(source, html('<div role="alert">Hello world</div>'));

    expect(excludeRoot(source)).toMatchInlineSnapshot(`
<div
  role="alert"
>
  Hello world
</div>
`);
    expect(setAttribute).toHaveBeenCalledWith('role', 'alert');
});

test('change root element type and attribute', () => {
    const source = html('<div role="status">Hello world</div>');
    update(source, html('<span role="alert">Hello world</span>'));

    expect(excludeRoot(source)).toMatchInlineSnapshot(`
<span
  role="alert"
>
  Hello world
</span>
`);
});

function html(content?: string): Element {
    const element = document.createElement('div');

    if (content) {
        element.innerHTML = trimWhitespace(content);
    }

    return element;
}

function excludeRoot(element: Element): Element | null {
    return element.firstElementChild;
}

function trimWhitespace(text: string) {
    return text
        .replace(/\s+/g, ' ')
        .replace(/\n+/, '\n')
        .replace(/> *(\w*) *</g, '>$1<')
        .trim();
}
