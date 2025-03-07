import { Module } from '@nestjs/common';
import { RecommendationModule } from './app/recommendation/recommendation.module';

@Module({
  imports: [RecommendationModule],
})
export class AppModule {}
