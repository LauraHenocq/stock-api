import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { RecommendationModule } from '../src/app/recommendation/recommendation.module';
import { recommendationEntityMock } from '../src/app/recommendation/entities/recommendation.entity.mock';

describe('Recommendation Controller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [RecommendationModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET getOrderRecommendation', () => {
    return request(app.getHttpServer())
      .get('/recommendation?initialStock=6&packSize=6&dailyConsumption=3&dailyWeekendConsumption=4')
      .expect(200)
      .expect(recommendationEntityMock);
  });
});
