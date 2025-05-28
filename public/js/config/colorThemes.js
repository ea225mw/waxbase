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

const testcolors2 =
// eslint-disable-next-line
/*css*/
`
buttonsPlates: #697565;
mainBackground: #1E201E;
generalText: #ECDFCC;
oddRows: #3C3D37;
evenRows: #4e5047;
selectedRow: #ECDFCC;
selectedRowText: #1E201E;
statisticsParts: #4e5047;
greyBtnText: #4e5047;
shadedText: #d3c7b5;
modal: #4e5047;
inputAndSelect: #ECDFCC;
plusAndMinusBtn: #4e5047;
`

const testcolors1 =
// eslint-disable-next-line
/*css*/
`
buttonsPlates: #89A8B2;
mainBackground: #B3C8CF;
oddRows: #cbc4b8;
evenRows: #E5E1DA;
color4: #F1F0E8;
shadedText: #343434;
`

export const theme3 = {
  buttonsPlates: '#3D5300',
  mainBackground: '#ABBA7C',
  oddRows: '',
  evenRows: '#FFE31A',
  color4: '#F09319'
}

export const theme4 = {
  buttons: '#257180',
  mainBackground: '#F2E5BF',
  oddRows: '',
  evenRows: '#FD8B51',
  color4: '#CB6040'
}

/* export const theme = {
  buttons: '#CD5656',
  mainBackground: '#FFFBDE',
  evenRows: '#faf4c3',
  oddRows: 'gray',
  color4: '#096B68'
} */

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
