import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryService implements InMemoryDbService {

  createDb() {
    const indicators = [];
    for (let id = 1; id <= 8; id++) {
      indicators.push(
        {
          id: `${id}`,
          title: 'Уровень карналита в силосной башне №',
          value: Math.round(Math.random() * 1000 + 500),
          minValue: Math.round(Math.random() * 1000 + 100),
          maxValue: Math.round(Math.random() * 1000 + 1500)
        }
      );
    }
    return {indicators};
  }
}
