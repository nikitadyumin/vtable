/**
 * Created by ndyumin on 10.08.2016.
 */

const alphanumeric = 'abcdefghijklmnopqrstuwvxyz1234567890';

const randomChar = line => line[Math.floor(Math.random() * line.length)];

const randomString = () => Array.from(
    {length: Math.random() * 5 + 3},
    randomChar.bind(null, alphanumeric)
).join('');

export const generateData = (cols, rows) => Array.from(
    {length: rows},
    () => Array.from({length: cols}, randomString)
);

export const prepareMock = arr => ({
    items: arr.map(row => ({
        A: row[0],
        B: row[1],
        C: row[2],
        D: row[3],
        E: row[4]
    })),
    count: arr.length
});

export const shuffle = arr => {
    const res = arr.slice(0);
    const length = res.length;
    for (let i = 0; i < length; i++) {
        const t = res[i];
        const randomPos = Math.floor(Math.random() * (length - i)) + i;
        res[i] = res[randomPos];
        res[randomPos] = t;
    }
    return res;
};

export const randomVisibility = arr => arr.map(c => {
    c.visible = Math.random() > 0.25;
    return c;
});

export const meta = () => ({
    columns: [
        {
            visible: false,
            name: 'A',
            id: 'A'
        },
        {
            visible: true,
            name: 'B',
            id: 'B'
        },
        {
            visible: true,
            name: 'C',
            id: 'C'
        },
        {
            visible: true,
            name: 'D',
            id: 'D'
        },
        {
            visible: true,
            name: 'E',
            id: 'E'
        }
    ]
});

export const mock = () => prepareMock(generateData(5, 50));