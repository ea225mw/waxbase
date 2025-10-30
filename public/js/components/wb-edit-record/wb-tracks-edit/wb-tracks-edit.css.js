import { getTheme, themeID } from '../../../config/colorThemes.js'

const theme = getTheme(themeID)

export const cssTemplate =
// eslint-disable-next-line
/*css*/`
form {
  margin: 15px;
  grid-area: a;
}

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

#tracksWrapper input {
  width: 28rem;
}

.minutesField, .secondsField {
  max-width: 1.2rem;
}

.trackTitle {
  min-width: 17.5rem;
}

.trackIndexTD {
  width: 1.5625rem;
  text-align: right;
  margin-right: 0.1875rem;
}

#addTrackBtn, #removeTrackBtn {
  width: 1.6rem;
  height: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  font-size: 1.25rem;
}

#plusAndMinusBtn {
  margin-top: 0.625rem;
  margin-left: 1.875rem;
  display: flex;
  gap: 1rem;
}

#plusAndMinusBtn button {
  background-color: ${theme.plusAndMinusBtn};
  color: ${theme.plusAndMinusBtnText};
}

#removeTrackConfirmDiv {
  display: none;
  background-color: ${theme.inputAndSelect};
  max-width: 37.5rem;
  padding: 0.75rem;
  border-radius: 0.625rem;
}

#removeTrackConfirmDiv button {
  margin-top: 0.5rem;
  margin-right: 0.5rem;
}

.deleteBtnTD {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
}

.deleteBtnTD img {
  height: 1.4rem;
}

.deleteBtnTD div {
  background: #e92f2f;
  width: 1.2rem;
  height: 1.2rem;
  text-align: center;
  border-radius: 50%;
  color: white;
}
`
