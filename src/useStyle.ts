import { useContext, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { flattenDeep } from 'lodash';

/* EXAMPLE THEME
-----------------------------
const theme: ThemeType = {
  dark: false,
  roundness: 5,
  baseUnit: 10,
  fontSize: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 24,
  },
  fontFamily: {
    header: 'Adelle',
    default: 'Bernina Sans',
  },
  fontWeight: {
    regular: '400',
    bold: '800',
  },
  colors: {
    primary: '#317CB6',
    secondary: '#4FB9EC',
    tertiary: '#12395B',
    accent: '#B9D051',
    error: '#DB3C2E',
    grey: '#626262',
    background: '#ffffff',
    text: '#000000',
    placeholder: '#626262',
    header: '#ffffff',
    headerTitle: '#ffffff',
    white: '#ffffff',
  },
};
*/

/* EXAMPLE THEME TYPE
interface ThemeType {
  dark: boolean;
  roundness: number;
  baseUnit: number;
  fontSize: FontSizeType;
  fontFamily: FontFamilyType;
  fontWeight: FontWeightType;
  colors: ColorsType;
}
interface FontSizeType {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}
interface FontFamilyType {
  header?: string;
  default?: string;
}

interface ColorsType {
  primary: string;
  secondary: string;
  tertiary: string;
  accent: string;
  error: string;
  background: string;
  text: string;
  placeholder: string;
  header: string;
  headerTitle: string;
  white: string;
  grey: string;
}

interface FontWeightType {
  regular: string;
  bold: string;
}
*/

// import { ThemeType } from '../types/global';
// import ThemeContext from './Context/ThemeContext';

const cachedStyles = {};
const styleHasher = JSON.stringify;

// Uses cached or generates a new StyleSheet for a given style prop
const createStyleSheet = (stylesToGenerate: any) => {
  let styles = stylesToGenerate; // Need to make sure we're working with a flat array
  const styleSheet = {}; // passed to StyleSheet.create later

  // Load style from cache or add style to stylesheet
  Object.keys(styles).forEach((style: any, index: string | number) => {
    if (typeof style !== 'object' || !style) return;
    const hash = styleHasher(style);
    // @ts-ignore
    if (cachedStyles[hash]) {
      // @ts-ignore
      styles[index] = cachedStyles[hash];
    } else {
      // @ts-ignore
      styleSheet[`${index}`] = style;
    }
  });

  if (Object.keys(styleSheet).length) {
    // Generate the new stylesheet
    const generatedStyleSheet = StyleSheet.create(styleSheet);

    // Process the generated stylesheet
    Object.keys(generatedStyleSheet).forEach((key) => {
      const index = parseInt(key, 0);
      // @ts-ignore
      const generatedStyle = generatedStyleSheet[key];
      const hash = styleHasher(styles[index]);

      // add generated style to cache
      // @ts-ignore
      cachedStyles[hash] = generatedStyle;

      // swap generated style into result list
      styles[index] = generatedStyle;
    });
  }

  if (styles.length === 1) styles = styles[0]; // eslint-disable-line
  return styles;
};

const generateStyleLiteralFromStyledInput = (
  styleInput: any,
  theme: ThemeType
) => {
  const generatedStyle = styleInput;

  // If the styledInput is a funciton, call the funciton and pass in the theme context
  if (typeof generatedStyle === 'function') {
    return generatedStyle({ theme });
  }

  return generatedStyle;
};

// Merges two or more styles into one style object or array
const mergeStyles = (...stylesToMerge: any[]) =>
  flattenDeep(stylesToMerge).reduce(
    (accumulatedStyle: any, currentStyle: any) => {
      let style = accumulatedStyle;
      const styleRight = currentStyle;

      if (!styleRight && typeof styleRight !== 'number')
        return accumulatedStyle;

      // both styles are objects, we should turn them into a single object:
      if (
        typeof style === 'object' &&
        !Array.isArray(style) &&
        !Array.isArray(styleRight) &&
        typeof styleRight === 'object'
      ) {
        style = Object.assign({}, style, styleRight);

        // styles can't be merged automatically, result to joining them in an array
      } else {
        if (!Array.isArray(style)) {
          style = [style];
        }

        if (Array.isArray(styleRight)) {
          style = style.concat(styleRight);
        } else {
          style.push(styleRight);
        }
      }
      return style;
    }
  );


const useStyle: any = (styleInput: any, props?: any[]) => {
  const [styles, setStyles] = useState({});
  const theme = useContext(ThemeContext);

  useEffect(() => {
    const mergedStyles = styleInput.isArray
      ? mergeStyles(styleInput)
      : styleInput;

    const generatedStyles = generateStyleLiteralFromStyledInput(
      mergedStyles,
      theme
    );

    setStyles(generatedStyles);
  }, [...props]);

  return [createStyleSheet(styles), theme];
};

export default useStyle;
