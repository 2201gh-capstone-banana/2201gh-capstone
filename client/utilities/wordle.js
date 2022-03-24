import { data } from '../data'

const wordBank = data.words;

const getDailyWord = () => {
    const randomIndex = Math.floor(Math.random() * wordBank.length)
    return wordBank[randomIndex]
}

export const rows = [
    { id: 0, cells: ['', '', '', '', ''] },
    { id: 1, cells: ['', '', '', '', ''] },
    { id: 2, cells: ['', '', '', '', ''] },
    { id: 3, cells: ['', '', '', '', ''] },
    { id: 4, cells: ['', '', '', '', ''] },
    { id: 5, cells: ['', '', '', '', ''] }
];

export const boardDefault = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
];