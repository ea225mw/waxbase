import { getTheme, themeID } from '../../../config/colorThemes.js'

const theme = getTheme(themeID)

export const cssTemplate = /*css*/ `
input {
  box-shadow: 2px 2px 5px rgba(0,0,0,0.1);
  padding: 0.1875rem;
  background-color: ${theme.inputAndSelect};
  width: 15.5rem;
}

label {
  margin-top: 0.75rem;
  margin-bottom: 0.1875rem;
  color: ${theme.generalText}
}

.suggestions {
  position: absolute;
  left: 16.875rem;
  list-style: none;
  margin: 0;
  padding: 0;
  background: white;
  min-width: 12.5rem;
  max-width: 22rem;
}

.suggestions li {
  padding: 0.25rem;
  cursor: pointer;
}

.suggestions li:hover {
  background-color: ${theme.mainBackground};
}

.inputWithSuggestions {
  display: flex;
  flex-direction: row;
  gap: 0.625rem;
  position: relative;
}
`
