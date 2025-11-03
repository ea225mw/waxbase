import { getTheme, themeID } from '../../config/colorThemes.js'

const theme = getTheme(themeID)

export const cssTemplate =
 
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
  gap: 0.59rem;
  background-color: ${theme.buttonsPlates};
  width: fit-content;
  transform: scaleY(0);
  transform-origin: bottom;
  transition: 0.3s;
  height: 3.82rem;
  border-top-right-radius: 1.18rem;
}
  
.parts:nth-last-child(n) {
  margin-right: 1.18rem;
}


.visible {
  transform: scaleY(1);
}

.parts {
  background-color: ${theme.statisticsParts};
  border-top-right-radius: 1.18rem;
  margin-top: 0.59rem;
  color: ${theme.generalText}
}

h1 {
  font-size: 0.94rem;
  font-weight: 600;
  margin: 0.3rem 0.59rem;
}

p {
  margin: 0.3rem 0.59rem;
}

#toggleStatisticsBtn {
  width: 4.70rem;
  height: 4.70rem;
  border-radius: 50%;
  background-color: ${theme.buttonsPlates};
  color: ${theme.lightText};
  font-size: 0.94rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}`
