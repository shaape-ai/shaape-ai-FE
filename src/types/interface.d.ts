import { BODY_SHAPE } from "./enums";

export type IFindPerfectFitAPIReqObj = {
  height: number;
  weight: number;
  age: number;
  body_shape: BODY_SHAPE;
};
