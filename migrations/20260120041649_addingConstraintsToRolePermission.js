/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  // Check if the RolePermission table exists before creating the composite index
  const hasRolePermission = await knex.schema.hasTable('RolePermission');

  if (hasRolePermission) {
    await knex.raw(`
      CREATE UNIQUE INDEX IF NOT EXISTS "RolePermission_roleId_module_action_key" 
      ON "RolePermission"("roleId", "module", "action");
    `);
  }
};

exports.down = async function(knex) {
  // Drop the composite index if it exists
  await knex.raw('DROP INDEX IF EXISTS "RolePermission_roleId_module_action_key"');
};