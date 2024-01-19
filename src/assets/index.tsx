import {fromPairs} from 'lodash';

const SOURCE = {
  LOGO: require('./logo.png'),
};

export const getSource = (source: keyof typeof SOURCE) => {
  return SOURCE[source];
};

export * from './svg';
