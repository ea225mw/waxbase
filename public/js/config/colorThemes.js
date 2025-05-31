export const themeID = 1

/* ------ THEME 1 (BLUE/GRAY) ---------------------------------------------------------------------------- */

export const theme1 = {
  buttonsPlates: '#89A8B2',
  mainBackground: '#B3C8CF',
  generalText: 'black',
  oddRows: '#d9d5ce',
  evenRows: '#E5E1DA',
  selectedRow: '#89A8B2',
  selectedRowText: 'white',
  statisticsParts: '#E5E1DA',
  greyBtnText: 'black',
  shadedText: '#343434',
  lightText: 'white',
  modal: '#89A8B2',
  selectedTabAndForms: '#E5E1DA',
  tab: '#cbc4b8',
  inputAndSelect: 'white',
  plusAndMinusBtn: '#89A8B2',
  plusAndMinusBtnText: 'white'
}

/* ------ THEME 2 (DARK) --------------------------------------------------------------------------------- */

export const theme2 = {
  buttonsPlates: '#697565',
  mainBackground: '#1E201E',
  generalText: '#ECDFCC',
  oddRows: '#3C3D37',
  evenRows: '#4e5047',
  selectedRow: '#ECDFCC',
  selectedRowText: '#1E201E',
  statisticsParts: '#4e5047',
  greyBtnText: '#4e5047',
  shadedText: '#d3c7b5',
  lightText: 'white',
  modal: '#1E201E',
  selectedTabAndForms: '#697565',
  tab: '#4e5047',
  inputAndSelect: '#ECDFCC',
  plusAndMinusBtn: '#4e5047',
  plusAndMinusBtnText: '#ECDFCC'
}

/* ------ THEME 3 --------------------------------------------------------------------------------- */

export const theme3 = {
  // #9FBB73 grön
  // #D24545 röd
  // #BF3131 mörkare röd

  buttonsPlates: '#D24545',
  mainBackground: '#9FBB73',
  generalText: 'white',
  oddRows: '#72884f',
  evenRows: '#809858',
  selectedRow: '#ECDFCC',
  selectedRowText: '#1E201E',
  statisticsParts: '#F1EB90',
  greyBtnText: '#4e5047',
  shadedText: '#d3c7b5',
  lightText: 'white',
  modal: '#72884f',
  selectedTabAndForms: '#F1EB90',
  tab: '#809858',
  inputAndSelect: '#ECDFCC',
  plusAndMinusBtn: '#4e5047',
  plusAndMinusBtnText: '#ECDFCC'
}

/* ------ THEME 4 --------------------------------------------------------------------------------- */

export const theme4 = {
  // vindröd: #B82132
  // gammelrosa: #D2665A
  // persika: #f2bc8c;
  // persika variant: #fec592;
  // rosagrå: #F6DED8;

  buttonsPlates: '#D2665A',
  mainBackground: '#F6DED8',
  generalText: '',
  th: '#B82132',
  oddRows: '#f2bc8c',
  evenRows: '#fec592',
  selectedRow: '',
  selectedRowText: '',
  statisticsParts: '',
  greyBtnText: '',
  shadedText: '',
  lightText: '#F6DED8',
  modal: '',
  selectedTabAndForms: '',
  tab: '',
  inputAndSelect: '',
  plusAndMinusBtn: '',
  plusAndMinusBtnText: ''
}

const emptyTheme = {
  buttonsPlates: '',
  mainBackground: '',
  generalText: '',
  th: '',
  oddRows: '',
  evenRows: '',
  selectedRow: '',
  selectedRowText: '',
  statisticsParts: '',
  greyBtnText: '',
  shadedText: '',
  lightText: '',
  modal: '',
  selectedTabAndForms: '',
  tab: '',
  inputAndSelect: '',
  plusAndMinusBtn: '',
  plusAndMinusBtnText: ''
}
/**
 * Returns the theme with the number of parameter id.
 *
 * @param {number} id - The id number.
 * @returns {object} - The returned theme object.
 */
export function getTheme (id) {
  switch (id) {
    case 1:
      return theme1
    case 2:
      return theme2
    case 3:
      return theme3
    case 4:
      return theme4
    default:
      return theme1
  }
}
