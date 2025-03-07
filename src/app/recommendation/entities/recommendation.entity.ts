import { OrderSchedule } from "../types/order-schedule";
import { RecommendationParams } from "../types/recommendation-params";


export type RecommendationEntityProps = {
  id: string;
  recommendationParams: RecommendationParams;
  orderSchedule?: OrderSchedule[] | null;
};

export class RecommendationEntity {
  public readonly id: string;
  public readonly recommendationParams: RecommendationParams;
  private _orderSchedule: OrderSchedule[];

  constructor(props: RecommendationEntityProps) {
    this.id = props.id;
    this.recommendationParams = props.recommendationParams;
    this._orderSchedule = props.orderSchedule;
  }

  public get orderSchedule(): OrderSchedule[] {
    return this._orderSchedule;
  }

  public setOrderSchedule(orderSchedule: OrderSchedule[]): void {
    this._orderSchedule = orderSchedule;
  }
}
