import { data } from './data/index'

const wordBank = data.words

export const getRandomWord = () => {
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
]

export const boardDefault = [
	['', '', '', '', ''],
	['', '', '', '', ''],
	['', '', '', '', ''],
	['', '', '', '', ''],
	['', '', '', '', ''],
	['', '', '', '', '']
]

/*
    currentWord: '',
    rows: [
      {id: 0, cells: ['','','','','']},
      {id: 1, cells: ['','','','','']},
      {id: 2, cells: ['','','','','']},
      {id: 3, cells: ['','','','','']},
      {id: 4, cells: ['','','','','']},
      {id: 5, cells: ['','','','','']}
    ],
    rowComp: [
      ['','','','',''],
      ['','','','',''],
      ['','','','',''],
      ['','','','',''],
      ['','','','',''],
      ['','','','','']
    ],
    keyboard: [
      ['Q','W','E','R','T','Y','U','I','O','P'],
      ['A','S','D','F','G','H','J','K','L'],
      ['Z','X','C','V','B','N','M']
    ],
    letterBank: [],
*/
