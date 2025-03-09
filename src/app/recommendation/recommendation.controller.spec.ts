import { Test, TestingModule } from '@nestjs/testing';
import { RecommendationController } from './recommendation.controller';
import { RecommendationService } from './recommendation.service';
import { recommendationEntityMock } from './entities/recommendation.entity.mock';

describe('AppController', () => {
  let recommendationController: RecommendationController;
  const initialStock = 6;
  const packSize = 6;
  const dailyConsumption = 3;
  const dailyWeekendConsumption = 4;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RecommendationController],
      providers: [RecommendationService],
    }).compile();

    recommendationController = app.get<RecommendationController>(RecommendationController);
  });

  describe('getOrderRecommendation', () => {
    it('should return the order recommendation when it is called with all required params', () => {
      expect(recommendationController.getOrderRecommendation(
        initialStock,
        packSize,
        dailyConsumption,
        dailyWeekendConsumption
      )).toEqual(recommendationEntityMock);
    });
  });
});
