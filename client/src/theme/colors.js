const cyan = [
  '#CDF6F9',
  '#A6EEF1',
  '#7FE5EA',
  '#5ADAE1',
  '#3BCFD6',
  '#0AC2CC', // Active Cyan
  '#1BA4AB',
  '#12848A',
  '#0B6268',
  '#043F43',
];

const green = [
  '#EDFBCC',
  '#DEF7A4',
  '#CFF27D',
  '#BFEB58',
  '#AEE234',
  '#9DD911', // Global Green
  '#83B70A',
  '#699405',
  '#4D6E01',
  '#324700',
];

const grayScale = [
  '#FFFFFF', // Community White
  '#FAFAFA',
  '#F5F8FA',
  '#E9EFF5', // Sportman Gray
  '#D1DCE8',
  '#C3D1DE',
  '#99ACBF',
  '#697B8C',
  '#3E4C59',
  '#222F3C', // Business Black
  '#000000',
];

const red = [
  '#FECFD6',
  '#FEAAB5',
  '#FD8696',
  '#FD6579',
  '#FD455C',
  '#FE223C', // Passionate Red
  '#CB243A',
  '#9C1F30',
  '#701925',
  '#451118',
];

const yellow = [
  '#FFF6D1',
  '#FFEEAF',
  '#FEE58D',
  '#FEDC6F',
  '#FED353',
  '#FDC83D', // Team Yellow
  '#CCA334',
  '#9D7E2B',
  '#715C20',
  '#463915',
];

const orange = [
  '#FFE9CD',
  '#FFD7A7',
  '#FFC582',
  '#FEB35E',
  '#FAA13C',
  '#FD9426', // Innovative Orange
  '#CF7612',
  '#A65D0B',
  '#794405',
  '#4D2B02',
];

const blue = [
  '#D6E5FF',
  '#B6D0FF',
  '#97BBFF',
  '#7AA7FC',
  '#5D93F9',
  '#4280F4', // Preserving Blue
  '#3369CD',
  '#2551A4',
  '#193B79',
  '#0F254D',
];

const purple = [
  '#E2DAF7',
  '#CABDEF',
  '#B3A1E7',
  '#9D85DE',
  '#876BD4',
  '#7151C9', // Playful Purple
  '#5C40A8',
  '#483187',
  '#342264',
  '#201540',
];

const magenta = [
  '#FCD1E9',
  '#F9AED7',
  '#F58CC5',
  '#EF6BB3',
  '#E84CA1',
  '#E02D8F', // Impact Magenta
  '#BD2176',
  '#97175E',
  '#710F45',
  '#49082B',
];

// Define Colors
export const black = grayScale[10];
export const white = grayScale[0];

export const communityWhite = grayScale[0];
export const sportmanGray = grayScale[3];
export const businessBlack = grayScale[9];
export const passionateRed = red[5];
export const playfulPurple = purple[5];
export const impactMagenta = magenta[5];
export const correctGreen = green[5];
export const brightYellow = yellow[5];

export const primary = playfulPurple;
export const primaryHover = purple[4];
export const primaryDisabled = purple[1];
export const primaryPressed = purple[6];

export const text = businessBlack;
export const textHover = grayScale[8];
export const secondaryText = grayScale[6];

export const border = grayScale[5];
export const divider = grayScale[3];

export const background = grayScale[1];
export const secondaryBg = grayScale[2];

export const danger = passionateRed;
export const dangerHover = red[3];
export const warningHover = yellow[0];
export const successHover = blue[0];

export const disabledButton = grayScale[2];

const colors = {
  primary,
  primaryDisabled,
  primaryHover,
  primaryPressed,

  text,
  textHover,
  secondaryText,

  white,
  black,
  background,
  secondaryBg,
  border,
  divider,

  danger,
  dangerHover,

  playfulPurple,
  impactMagenta,

  gray100: grayScale[1],
  gray200: grayScale[2],
  gray700: grayScale[7],
  gray800: grayScale[8],
  red700: red[6],

  correctGreen,
  brightYellow
};

export default colors;
