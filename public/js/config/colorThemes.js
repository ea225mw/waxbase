export const themeID = 1

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

/* ------ THEME 2 ------------------------------------------------------------------------------ */

export const theme2 = {
  buttonsPlates: '#640D5F',
  mainBackground: '#D91656',
  oddRows: '',
  evenRows: '#EB5B00',
  color4: '#FFB200'
}

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
