/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  // Check if the Organization table exists before creating the index
  const hasOrganization = await knex.schema.hasTable('Organization');

  if (hasOrganization) {
    await knex.raw(`
      CREATE UNIQUE INDEX IF NOT EXISTS "Organization_name_key" ON "Organization"("name");
    `);
  }
};

exports.down = async function(knex) {
  // Drop the index if it exists
  await knex.raw('DROP INDEX IF EXISTS "Organization_name_key"');
};