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
    const result: OrderSchedule[] = [];
    let currentDate = new Date('2025-01-05');
    let stock = initialStock;
    
    for (let i = 0; i < 360; i++) {
      const day = currentDate.getDay();
      const consumptionOfTheDay = day === 0 || day === 6 ? dailyWeekendConsumption : dailyConsumption;
      stock -= consumptionOfTheDay;
  
      if (currentDate.getDay() === 0) { // Sunday
        const orderAmount = this.calculateOrderAmount(stock, packSize);
        result.push({
          date: new Date(currentDate),
          orderAmount: orderAmount,
        });
        stock += orderAmount; // After delivery
      }
  
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return result;
  }

  private calculateOrderAmount(stock: number, packSize: number): number {
    if (stock < 0) {
      const needed = Math.abs(stock);
      const orders = Math.ceil(needed / packSize);
      return orders * packSize;
    }
    return 0;
  }
}
