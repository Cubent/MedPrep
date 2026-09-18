import { PrismaClient } from '../../../packages/database/generated/client/index.js';

const database = new PrismaClient();

const system = await database.system.findUnique({
  where: { examType_name: { examType: 'STEP_2_CK', name: 'AI Generated' } },
});

const groups = await database.learningObjective.groupBy({
  by: ['discipline'],
  where: { systemId: system.id },
  _count: { _all: true },
  orderBy: { discipline: 'asc' },
});

let total = 0;
for (const g of groups) {
  console.log(g.discipline, '->', g._count._all);
  total += g._count._all;
}
console.log('GRAND TOTAL:', total, 'across', groups.length, 'disciplines');
await database.$disconnect();
