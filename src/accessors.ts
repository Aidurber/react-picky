import { OptionType } from './types';

export const defaultAccessor = (item: OptionType) => item;
export const __labelAccessor = (item: any) => item.name;
export const __valueAccessor = (item: any) => item.id;
