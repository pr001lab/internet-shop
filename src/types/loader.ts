export type loadersDisplayType = {
  'type': LoaderType,
  'color': string,
  'height': string,
  'width': string,
};

export enum LoaderType {
  Watch = 'Watch',
  Audio = 'Audio',
  BallTriangle = 'BallTriangle',
  Bars = 'Bars',
  Circles = 'Circles',
  Grid = 'Grid',
  Hearts = 'Hearts',
  Oval = 'Oval',
  Puff = 'Puff',
  Rings = 'Rings',
  TailSpin = 'TailSpin',
  ThreeDots = 'ThreeDots',
  RevolvingDot = 'RevolvingDot',
  Triangle = 'Triangle',
  Plane = 'Plane',
  MutatingDots = 'MutatingDots',
  CradleLoader = 'CradleLoader',
}
