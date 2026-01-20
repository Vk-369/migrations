/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  // Check if the Branch table exists before creating the composite index
  const hasBranch = await knex.schema.hasTable('Branch');

  if (hasBranch) {
    await knex.raw(`
      CREATE UNIQUE INDEX IF NOT EXISTS "Branch_organizationId_name_key" 
      ON "Branch"("organizationId", "name");
    `);
  }
};

exports.down = async function(knex) {
  // Drop the composite index if it exists
  await knex.raw('DROP INDEX IF EXISTS "Branch_organizationId_name_key"');
  
};