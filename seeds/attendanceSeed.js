exports.seed = async function(knex) {
  await knex.raw('TRUNCATE TABLE "AttendanceBatches" RESTART IDENTITY CASCADE');
  await knex.raw('TRUNCATE TABLE "AttendanceStudents" RESTART IDENTITY CASCADE');

  const batchResult = await knex.raw(`
    INSERT INTO "AttendanceBatches" (date, class, "markedBy")
    VALUES 
      ('2026-01-23', 'cse02a', 'EMP@001'),
      ('2026-01-23', 'cse02b', 'EMP@002')
    RETURNING id;
  `);

  const batch1Id = batchResult.rows[0].id;
  const batch2Id = batchResult.rows[1].id;

  await knex.raw(`
    INSERT INTO "AttendanceStudents" ("studentId", "batchId")
    VALUES 
      ('S1001', ${batch1Id}),
      ('S1002', ${batch1Id}),
      ('S1013', ${batch1Id}),
      ('S1011', ${batch1Id}),
      ('S10123', ${batch1Id}),
      ('S10112', ${batch1Id}),
      ('S10164', ${batch1Id}),
      ('S10122', ${batch2Id}),
      ('S10187', ${batch2Id}),
      ('S10197', ${batch2Id}),
      ('S10157', ${batch2Id}),
      ('S10197', ${batch2Id}),
      ('S10109', ${batch2Id}),
      ('S101987', ${batch2Id}),
      ('S10135', ${batch2Id});
  `);
};