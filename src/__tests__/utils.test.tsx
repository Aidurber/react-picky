import {
  hasItem,
  hasItemIndex,
  sortCollection,
  arraysEqual,
} from '../lib/utils';
import { defaultAccessor, __valueAccessor } from '../accessors';

describe('Utils', () => {
  describe('hasItem', () => {
    //@ts-ignore
    let all;
    beforeAll(() => {
      all = Array.from(Array(10).keys()).map(v => {
        return {
          id: v + 1,
          name: `Label ${v + 1}`,
        };
      });
    });
    it('should return false if nothing supplied', () => {
      //@ts-ignore
      expect(hasItem()).toBeFalsy();
    });

    it('should return false if no all prop supplied', () => {
      //@ts-ignore
      expect(hasItem(undefined, 1)).toBe(false);
    });
    it('should return false if no item prop supplied', () => {
      //@ts-ignore
      expect(hasItem(1, undefined)).toBe(false);
    });

    it('should return true if array of objects supplied and there is a match', () => {
      //@ts-ignore
      expect(hasItem(all, { id: 1, name: 'Item 1' }, __valueAccessor)).toBe(
        true
      );
    });
    it('should return false if array of objects supplied and there is no match', () => {
      //@ts-ignore
      expect(hasItem(all, { id: 101, name: 'Item 101' }, __valueAccessor)).toBe(
        false
      );
    });
    it('should find simple value if and there is a match', () => {
      expect(hasItem([1, 2, 3, 4, 5], 3, defaultAccessor)).toBe(true);
    });
    it('should not find simple value if and there is not a match', () => {
      expect(hasItem([1, 2, 3, 4, 5], 7, defaultAccessor)).toBe(false);
    });
    it('should find single value', () => {
      expect(hasItem(3, 3, defaultAccessor)).toBe(true);
    });
    it('should not find single value if no match', () => {
      expect(hasItem(3, 7, defaultAccessor)).toBe(false);
    });
    describe('Find index', () => {
      it('should find correct index', () => {
        expect(
          //@ts-ignore
          hasItemIndex(all, { id: 1, name: 'Item 1' }, __valueAccessor)
        ).toEqual(0);
        expect(
          //@ts-ignore
          hasItemIndex(all, { id: 10, name: 'Item 10' }, __valueAccessor)
        ).toEqual(9);

        expect(
          //@ts-ignore
          hasItemIndex([1, 2, 3, 4], 1, defaultAccessor, true)
        ).toEqual(0);
        expect(
          //@ts-ignore
          hasItemIndex([1, 2, 3, 4], 4, defaultAccessor, true)
        ).toEqual(3);
      });
    });
  });

  describe('sort', () => {
    it('should sort simple array ascending', () => {
      const data = [2, 3, 1];
      const result = sortCollection(data);
      expect(result).toEqual([1, 2, 3]);
    });

    it('should sort an array of strings ascending', () => {
      const data = ['b', 'c', 'a'];
      const result = sortCollection(data);
      expect(result).toEqual(['a', 'b', 'c']);
    });
  });
  describe('arrays equal', () => {
    it('should return false if arrays are different lengths', () => {
      const left = [1, 2, 3];
      const right = [1, 2];
      const result = arraysEqual(left, right);
      expect(result).toBe(false);
    });
    it('should return return true if arrays are equal', () => {
      const left = [1, 2, 3];
      const right = [1, 2, 3];
      const result = arraysEqual(left, right);
      expect(result).toBe(true);
    });
    it('should return return false if arrays are not equal', () => {
      const left = [1, 2, 3];
      const right = [2, 1, 3];
      const result = arraysEqual(left, right);
      expect(result).toBe(false);
    });
  });
});
