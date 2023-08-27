export interface IconI {
  name: Icon;
  data: string;
}

export type Icon =
  'arrowDown' |
  'cross' |
  'arrow';

export type IconColor =
  'white' |
  'green' |
  'black';

export interface IconColorI {
  name: IconColor;
  color: string;
}

export const iconColorList: IconColorI[] = [
  {name: 'white', color: '#ffffff'},
  {name: 'green', color: '#46a6a4'},
  {name: 'black', color: '#000000'},
]
