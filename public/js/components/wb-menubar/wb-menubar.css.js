export const cssTemplate =
// eslint-disable-next-line
/*css*/`
#menubar {
  /*background-color: aqua;*/
  display: flex;
  gap: 0.625rem;
  height: 3rem;
  margin: 0;
}

.menu-buttons {
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  background-color: bisque;
  /*padding: 0.5rem;*/
  height: 3rem;
  width: 3rem;
  cursor: pointer;
  text-align: center;
  font-size: 1rem;
  border-radius: 0.5rem;
}

.columns {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-x: visible;
}

ul {
  position: absolute;
  top: 3rem;
  list-style: none;
  padding: 0;
  background-color: lightpink;
  width: fit-content;
  margin-top: 0;
  transform: scaleY(0);
  transform-origin: top;
  transition: 0.2s;
  z-index: 10;
}

ul.visible {
  transform: scaleY(1);
}

li {
  font-size: 1rem;
  padding: 0.3125rem;
  white-space: nowrap;
  cursor: pointer;
}

li:hover {
  background-color: yellow;
} 
`
