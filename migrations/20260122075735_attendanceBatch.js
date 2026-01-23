/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  const hasBatch = await knex.schema.hasTable('AttendanceBatches');

  if (!hasBatch) {
    await knex.raw(`
      CREATE TABLE "AttendanceBatches" (
        "id" SERIAL PRIMARY KEY,
        "date" DATE NOT NULL,
        "class" TEXT NOT NULL,
        "markedBy" TEXT NOT NULL,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }
};

exports.down = async function(knex) {
  const hasBatch = await knex.schema.hasTable('AttendanceBatches');
  if (hasBatch) {
    // We use CASCADE to ensure any foreign keys pointing to Batch 
    // are also cleaned up, preventing constraint errors.
    await knex.raw('DROP TABLE "AttendanceBatches" CASCADE;');
  }
};
