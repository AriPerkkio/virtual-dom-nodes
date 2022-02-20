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
