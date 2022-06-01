const {format_date, format_plural, format_url} = require('../utils/helpers');

// test for format_date() function
test('format_date() returns a date string', () => {
    const date = new Date('2022-05-25 16:12:03');

    expect(format_date(date)).toBe('5/25/2022');
})

// test for format_plural() function
test('format_plural() returns plural word if there are multiple of word', () => {
    const word = 'tiger';

    expect(format_plural(word, 1)).toBe('tiger');
    expect(format_plural(word, 2)).toBe('tigers');
})

// test for format_url() function
test('format_url() returns a simplified url string', () => {
    const url1 = format_url('http://test.com/page/1');
    const url2 = format_url('https://www.coolstuff.com/abcdefg');
    const url3 = format_url('https://www.google.com?q=hello');

    expect(url1).toBe('test.com');
    expect(url2).toBe('coolstuff.com');
    expect(url3).toBe('google.com');
})