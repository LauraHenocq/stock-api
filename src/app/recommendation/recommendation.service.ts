import { Injectable } from '@nestjs/common';
import { RecommendationEntity } from './entities/recommendation.entity';
import { OrderSchedule } from './types/order-schedule';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RecommendationService {
  getOrderRecommendation(initialStock: number, packSize: number, dailyConsumption: number, dailyWeekendConsumption: number): RecommendationEntity {

    // INIT THE RECOMMENDATION WITH ITS BASIC INFORMATION
    const recommendationEntity = new RecommendationEntity({
      id: uuidv4(),
      recommendationParams: {
        initialStock,
        packSize,
        dailyConsumption,
        dailyWeekendConsumption
      }
    });

    const orderSchedule = this.getOrderShedule(initialStock, packSize, dailyConsumption, dailyWeekendConsumption)

    // COMPLETE THE RECOMMENDATION WITH ORDER SCHEDULE
    recommendationEntity.setOrderSchedule(orderSchedule);
      
    return recommendationEntity;
  }

  private getOrderShedule(initialStock: number, packSize: number, dailyConsumption: number, dailyWeekendConsumption: number): OrderSchedule[] {
    const orderSchedule: OrderSchedule[] = [];
    let currentDate = new Date('2025-01-05');
    let stock = initialStock;
    let weeklyConsumption = (5 * dailyConsumption) + (2 * dailyWeekendConsumption);
    
    for (let week = 0; week < 52; week++) {
      const day = currentDate.getDay();
      const consumptionOfTheDay = day === 0 || day === 6 ? dailyWeekendConsumption : dailyConsumption;
      stock -= consumptionOfTheDay;
  
      const packNumberToOrder = this.calculateOrderAmount(stock, packSize, weeklyConsumption);
      orderSchedule.push({
        date: currentDate.toISOString().split('T')[0],
        packNumberToOrder: packNumberToOrder,
      });

      stock += (packNumberToOrder * packSize) - weeklyConsumption; // After delivery
  
      currentDate.setDate(currentDate.getDate() + 7);
    }

    return orderSchedule;
  }

  private calculateOrderAmount(stock: number, packSize: number, weeklyConsumption: number): number {
    return Math.ceil((weeklyConsumption - stock) / packSize);
  }
}
