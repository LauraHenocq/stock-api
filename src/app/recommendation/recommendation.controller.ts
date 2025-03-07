import { Controller, Body, Get, Query } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { CreateOrderRecommendationDto } from './dto/create-order-recommendation.dto';
import { RecommendationEntity } from './entities/recommendation.entity';

@Controller('recommendation')
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

  @Get()
  getOrderRecommendation(
    @Query('initialStock') initialStock: number,
    @Query('packSize') packSize: number,
    @Query('dailyConsumption') dailyConsumption: number,
    @Query('dailyWeekendConsumption') dailyWeekendConsumption: number,
  ): RecommendationEntity {
    return this.recommendationService.getOrderRecommendation(initialStock, packSize, dailyConsumption, dailyWeekendConsumption);
  }
}

