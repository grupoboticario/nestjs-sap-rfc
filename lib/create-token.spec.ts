import { createToken } from './create-token';

const SUFFIX_SYMBOL = Symbol('SUFFIX_SYMBOL');

describe('CreateToken', () => {
  test.each([
    [undefined, ''],
    ['', undefined],
    [undefined, undefined],
    [null, ''],
    ['', null],
    [null, null],
    ['', ''],
    ['Prefix', undefined],
    ['Prefix', null],
    ['Prefix', ''],
  ])(
    'should be undefined | %s => %s',
    (prefix: string, suffix: string | symbol) => {
      expect(createToken(prefix, suffix)).toBeUndefined();
    },
  );

  test.each([
    ['Prefix', 'Suffix', 'PREFIX_SUFFIX'],
    ['', 'Suffix', 'Suffix'],
    [null, 'Suffix', 'Suffix'],
    [undefined, 'Suffix', 'Suffix'],
    [undefined, SUFFIX_SYMBOL, SUFFIX_SYMBOL],
    ['Prefix', SUFFIX_SYMBOL, `PREFIX_${SUFFIX_SYMBOL.description}`],
  ])(
    'should be created a token | %s => %s = %s',
    (prefix: string, suffix: string | symbol, expected: string | symbol) => {
      expect(createToken(prefix, suffix)).toBe(expected);
    },
  );
});
