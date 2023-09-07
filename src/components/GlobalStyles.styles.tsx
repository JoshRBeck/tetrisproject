import { createGlobalStyle } from "styled-components"
import TetrisMountain from "../img/TetrisMountain.jpg"


const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: url(${TetrisMountain}) #000;
    background-size: cover;
    background-position:center;
  }
`;

export default GlobalStyles