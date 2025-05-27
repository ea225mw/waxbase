export const themeID = 2

/* ------ THEME 1 ------------------------------------------------------------------------------ */

export const theme1 = {
  buttonsPlates: '#89A8B2',
  mainBackground: '#B3C8CF',
  oddRows: 'rgb(217, 213, 206)',
  evenRows: '#E5E1DA',
  color4: '#F1F0E8'
}

const testcolors1 =
// eslint-disable-next-line
/*css*/
`
buttonsPlates: #89A8B2;
mainBackground: #B3C8CF;
oddRows:rgb(217, 213, 206);
evenRows: #E5E1DA;
color4: #F1F0E8;
`

/* ------ THEME 2 (DARK) ------------------------------------------------------------------------------ */

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
  inputAndSelect: '#ECDFCC',
  plusAndMinusBtn: '#4e5047'
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
inputAndSelect: #ECDFCC;
plusAndMinusBtn: #4e5047;
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
