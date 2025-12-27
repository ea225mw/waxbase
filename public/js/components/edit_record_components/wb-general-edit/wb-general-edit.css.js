import { getTheme, themeID } from '../../../config/colorThemes.js'

const theme = getTheme(themeID)

export const cssTemplate = /*css*/ `
input, select {
  box-shadow: 2px 2px 5px rgba(0,0,0,0.1);
  padding: 0.1875rem;
  background-color: ${theme.inputAndSelect}
}

label {
  margin-top: 0.75rem;
  margin-bottom: 0.1875rem;
  color: ${theme.generalText}
}

#generalWrapper {
  display: flex;
  flex-direction: column;
  position: relative;
}

select[name="formatId"] {
  max-width: 5.625rem;
}

input[name="albumTitle"] {
  width: 15.5rem;
}

input[name="releaseYear"], 
input[name="origReleaseYear"], 
input[name="price"]{
  max-width: 3.125rem;
}
`
