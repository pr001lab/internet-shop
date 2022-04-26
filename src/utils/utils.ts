import {GuitarType} from '../types/guitar';

export const getGuitarTypeListWithStrings = (guitarsList: GuitarType[]) => Array
  .from(guitarsList)
  .sort()
  .reduce((acc: {[key: string]: number[]}, guitar) => {
    if(!acc[guitar.type]) {
      acc[guitar.type] = [];
    }

    if ((!acc[guitar.type].includes(guitar.stringCount))) {
      (acc[guitar.type]).push(guitar.stringCount);
      (acc[guitar.type])
        .sort((
          firstStringCount: number,
          secondStringCount: number,
        ) => firstStringCount - secondStringCount);
    }

    return acc;
  }, {});

export const getAllUniqStringCounts = (
  guitarTypeListWithStrings: {[key: string]: number[]} | null,
  guitarTypes: string[],
) => {
  if (guitarTypeListWithStrings === null) {
    return [];
  }

  const stringCountArray = guitarTypes
    .reduce((acc: number[], guitarType) =>
      [...acc, ...guitarTypeListWithStrings[guitarType]], [],
    )
    .reduce((acc: number[], item: number) => acc.includes(item)
      ? acc
      : [...acc, item], []);

  return stringCountArray;
};

export const getGuitarsDataReducer = (guitars: GuitarType[]) => {
  const priceMinData = Math.min(...Object.values(guitars)
    .map((elem) => elem.price));
  const priceMaxData = Math.max(...Object.values(guitars)
    .map((elem) => elem.price));

  return {
    priceMinData,
    priceMaxData,
  };
};

export const getPreviewImg = (previewImg: string) => previewImg
  .replace('/', '/content/');

export const formatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  minimumFractionDigits: 0,
});

export const formatterDate = new Intl.DateTimeFormat('ru-RU', {
  month: 'long',
  day: 'numeric',
});

export const getKeyByValue = (
  object: Record<string, unknown>,
  value: string,
) => Object.keys(object).find((key) => object[key] === value);
