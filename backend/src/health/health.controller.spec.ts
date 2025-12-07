import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

describe('HealthController', () => {
  let healthController: HealthController;
  let healthService: HealthService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [HealthService],
    }).compile();

    healthController = app.get<HealthController>(HealthController);
    healthService = app.get<HealthService>(HealthService);
  });

  describe('check', () => {
    it('should return "ok" status', () => {
      const result = { status: 'ok' };
      jest.spyOn(healthService, 'checkHealth').mockImplementation(() => result);
      expect(healthController.check()).toBe(result);
    });
  });
});
