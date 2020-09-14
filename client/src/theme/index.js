import colors from "./colors";
import shadows from "./shadows";
// import buttons from "./buttons";
import text from "./text";
import links from "./links";
const gray5 = '#D4DADE';
const gray6 = '#E9EEF1';
const theme = {
  colors,
  border: {
    searchInput: `1px solid ${gray5}`,
    box: `1px solid ${gray6}`,
  },
  shadows,
  fonts: {
    body: "Quicksand, sans-serif",
    heading: "Quicksand, sans-serif",
  },
  buttons: {
    default: {
      fontFamily: "Quicksand, sans-serif",
      cursor: 'pointer',
    }
  },
  fontWeights: {
    normal: 400,
    medium: 600,
  },
  cards: {
    profile: {
      boxShadow: "below.low",
      borderRadius: "8px",
      bg: "white",
    },
  },
  variants: {
    divider: {
      height: "0px",
      borderBottom: `1px solid`,
      borderColor: "divider",
      width: "100%",
    },
    bgImage: {
      backgroundPosition: "center center",
      backgroundRepeat: "no-repeat",
    },
  },
  links,
  text,
  breakpoints: ["768px", "1160px", "1280px"],
};

export default theme;
