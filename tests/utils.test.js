import { isDataObject, hasItem } from '../src/lib/utils';
describe('Utils', () => {
  describe('isDataObject', () => {
    it('should return false if not an object', () => {
      expect(isDataObject(1, '', '')).toBe(false);
    });
    it('should return false object doesnt have keys', () => {
      expect(isDataObject({ id: 1 }, 'test', 'test')).toBe(false);
    });
    it('should return true object has keys', () => {
      expect(isDataObject({ id: 1, label: 'test' }, 'id', 'label')).toBe(true);
    });
  });

  describe('hasItem', () => {
    let all;
    beforeAll(() => {
      all = Array.from(Array(10).keys()).map(v => {
        return {
          id: v + 1,
          name: `Label ${v + 1}`
        };
      });
    });
    it('should return false if nothing supplied', () => {
      expect(hasItem()).toBeFalsy();
    });

    it('should return false if no all prop supplied', () => {
      expect(hasItem(undefined, 1)).toBe(false);
    });
    it('should return false if no item prop supplied', () => {
      expect(hasItem(1, undefined)).toBe(false);
    });

    it('should return true if array of objects supplied and there is a match', () => {
      expect(hasItem(all, { id: 1, name: 'Item 1' }, 'id', 'name')).toBe(true);
    });
    it('should return false if array of objects supplied and there is no match', () => {
      expect(hasItem(all, { id: 101, name: 'Item 101' }, 'id', 'name')).toBe(
        false
      );
    });
    it('should find simple value if and there is a match', () => {
      expect(hasItem([1, 2, 3, 4, 5], 3)).toBe(true);
    });
    it('should not find simple value if and there is not a match', () => {
      expect(hasItem([1, 2, 3, 4, 5], 7)).toBe(false);
    });
    it('should find single value', () => {
      expect(hasItem(3, 3)).toBe(true);
    });
    it('should not find single value if no match', () => {
      expect(hasItem(3, 7)).toBe(false);
    });
  });
});
