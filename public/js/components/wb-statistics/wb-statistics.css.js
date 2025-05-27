import { getTheme, themeID } from '../../config/colorThemes.js'

const theme = getTheme(themeID)

export const cssTemplate =
// eslint-disable-next-line
/*css*/`
* {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
.statisticsWrapper {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 10px;
}

.toggableDiv {
  display: flex;
  flex-direction: row;
  gap: 10px;
  background-color: ${theme.buttonsPlates};
  width: fit-content;
  transform: scaleY(0);
  transform-origin: bottom;
  transition: 0.3s;
  height: 65px;
  border-top-right-radius: 20px;
}
  
.parts:nth-last-child(n) {
  margin-right: 20px;
}


.visible {
  transform: scaleY(1);
}

.parts {
  background-color: ${theme.color4};
  border-top-right-radius: 20px;
  margin-top: 10px;
}

h1 {
  font-size: 16px;
  font-weight: 600;
  margin: 5px 10px;
}

p {
  margin: 5px 10px;
}

#toggleStatisticsBtn {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: ${theme.buttonsPlates};
  color: white;
  font-size: 16px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}`
