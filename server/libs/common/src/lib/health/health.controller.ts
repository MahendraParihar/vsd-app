import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, SequelizeHealthIndicator } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: SequelizeHealthIndicator,
  ) {
  }

  @Get()
  @HealthCheck()
  check() {
    const checks = [() => this.db.pingCheck('database', { timeout: 5000 })];
    return this.health.check(checks);
  }
}
