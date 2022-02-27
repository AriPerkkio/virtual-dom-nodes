import { htmlToElement } from '../src';

test('basic', () => {
    const element = htmlToElement(`
        <div>
            Hello world!
        </div>
    `);

    expect(element).toMatchInlineSnapshot(`
<div>
  Hello world!
</div>
`);
});

test('is element', () => {
    const element = htmlToElement('<div>Hello world!</div>');

    expect(element).toBeInstanceOf(Element);
});

test('with attributes', () => {
    const element = htmlToElement(`
        <div role="status" id="test-id">
            Hello world!
        </div>
    `);

    expect(element).toMatchInlineSnapshot(`
<div
  id="test-id"
  role="status"
>
  Hello world!
</div>
`);
});

test('with children', () => {
    const element = htmlToElement(`
        <div>
            <span>
                Hello world!
            </span>
            <h2>
                Some heading
            </h2>
        </div>
    `);

    expect(element).toMatchInlineSnapshot(`
<div>
  <span>
    Hello world!
  </span>
  <h2>
    Some heading
  </h2>
</div>
`);
});

test('broken tag', () => {
    const element = htmlToElement(`
  <div>
      <sp
          Hello world!
`);

    expect(element).toMatchInlineSnapshot(`<div />`);
});

test('text input', () => {
    const element = htmlToElement('Hello world');

    expect(element).toMatchInlineSnapshot(`
<div>
  Hello world
</div>
`);
});

test('empty input', () => {
    const element = htmlToElement('');

    expect(element).toMatchInlineSnapshot(`<div />`);
});

test('multiple elements', () => {
    const element = htmlToElement(`
        <div>
            First
        </div>
        <span>
            Second
        </span>

  `);

    expect(element).toMatchInlineSnapshot(`
<div>
  <div>
    First
  </div>
  <span>
    Second
  </span>
</div>
`);
});

test('element and text node', () => {
    const element = htmlToElement(`
        <div>
            First
        </div>
        Second
  `);

    expect(element).toMatchInlineSnapshot(`
<div>
  <div>
    First
  </div>
  Second
</div>
`);
});
