import { Utils } from '../../../utils/Utils';

test('verify if object is empty or not', () => {
    const test1 = {};
    const result1 = Utils.isEmpty(test1);
    expect(true).toEqual(result1);
    const test2 = {value: 'fs'}
    const result2 = Utils.isEmpty(test2)
    expect(false).toEqual(result2);
});

test('verify if string is empty or not', () => {
    const test1 = '';
    const result1 = Utils.isEmpty(test1);
    expect(true).toEqual(result1);
    const test2 = 'fdff'
    const result2 = Utils.isEmpty(test2)
    expect(false).toEqual(result2);
});

test('verify if variable is undefined or null', () => {
    const test1:number = null;
    const result1 = Utils.isEmpty(test1);
    expect(true).toEqual(result1);
    const test2:number = undefined
    const result2 = Utils.isEmpty(test2)
    expect(true).toEqual(result2);
})