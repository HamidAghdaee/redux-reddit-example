import pathToRegexp from 'path-to-regexp'

export const compilePath = function compilePath(pattern, options) {
  const keys = []
  const re = pathToRegexp(pattern, keys, options);
  const compiledPattern = { re: re, keys: keys };

  return compiledPattern;
};
