export enum KeyTypeEnum {
  'Line',
  'Text',
  'Clear',
}

enum KeyColorEnum {
  Black = '#000',
  Red = '#EA0606',
  Blue = '#00C0EA',
  Brown = '#934D26',
  Green = '#04D219',
  Orange = '#F9990A',
}

export interface IKeyButtonList {
  type: keyof typeof KeyTypeEnum;
  color: KeyColorEnum;
  value: string;
}

const KeyButtonList: IKeyButtonList[] = [
  // Row 1
  {
    type: 'Line',
    color: KeyColorEnum.Red,
    value: '紅',
  },
  {
    type: 'Line',
    color: KeyColorEnum.Blue,
    value: '藍',
  },
  {
    type: 'Text',
    color: KeyColorEnum.Black,
    value: '1',
  },
  {
    type: 'Text',
    color: KeyColorEnum.Black,
    value: '2',
  },
  {
    type: 'Text',
    color: KeyColorEnum.Black,
    value: '3',
  },
  // Row 2
  {
    type: 'Line',
    color: KeyColorEnum.Brown,
    value: '棕',
  },
  {
    type: 'Line',
    color: KeyColorEnum.Green,
    value: '綠',
  },
  {
    type: 'Text',
    color: KeyColorEnum.Black,
    value: '4',
  },
  {
    type: 'Text',
    color: KeyColorEnum.Black,
    value: '5',
  },
  {
    type: 'Text',
    color: KeyColorEnum.Black,
    value: '6',
  },
  // Row 3
  {
    type: 'Line',
    color: KeyColorEnum.Orange,
    value: '橘',
  },
  {
    type: 'Line',
    color: KeyColorEnum.Black,
    value: '小',
  },
  {
    type: 'Text',
    color: KeyColorEnum.Black,
    value: '7',
  },
  {
    type: 'Text',
    color: KeyColorEnum.Black,
    value: '8',
  },
  {
    type: 'Text',
    color: KeyColorEnum.Black,
    value: '9',
  },
  // Row 4
  {
    type: 'Line',
    color: KeyColorEnum.Black,
    value: '幹線',
  },
  {
    type: 'Line',
    color: KeyColorEnum.Black,
    value: '市民',
  },
  {
    type: 'Line',
    color: KeyColorEnum.Black,
    value: 'F',
  },
  {
    type: 'Text',
    color: KeyColorEnum.Black,
    value: '0',
  },
  {
    type: 'Clear',
    color: KeyColorEnum.Black,
    value: '清除',
  },
];

export default KeyButtonList;
