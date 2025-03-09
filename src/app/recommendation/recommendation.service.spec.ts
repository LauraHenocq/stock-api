import { Test, TestingModule } from '@nestjs/testing';
import { RecommendationService } from './recommendation.service';
import { recommendationEntityMock } from './entities/recommendation.entity.mock';

describe('RecommendationService', () => {
  let recommendationService: RecommendationService;
  const initialStock = 6;
  const packSize = 6;
  const dailyConsumption = 3;
  const dailyWeekendConsumption = 4;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecommendationService],
    }).compile();

    recommendationService = module.get<RecommendationService>(RecommendationService);
  });

  it('should be defined', () => {
    expect(recommendationService).toBeDefined();
  });

  describe('getOrderRecommendation', () => {
    it('should return the order recommendation when it is called with all required params', () => {
      expect(recommendationService.getOrderRecommendation(
        initialStock,
        packSize,
        dailyConsumption,
        dailyWeekendConsumption
      )).toEqual(recommendationEntityMock);
    });
  });
});
