/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = async function(knex) {
  //! 1. Check if the Organization table exists using Knex helper
  const hasOrganization = await knex.schema.hasTable('Organization');
  if (!hasOrganization) {
    // Execute your exact SQL string
    await knex.raw(`
      CREATE TABLE "Organization" (
        "id" SERIAL NOT NULL,
        "name" TEXT NOT NULL,
        "chairmanName" TEXT,
        "status" TEXT NOT NULL DEFAULT 'ACTIVE',
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
      );
    `);
  }

  //! 2.check if the Branch table exits using Knex helper
  const hasBranch=await knex.schema.hasTable('Branch');
  if (!hasBranch) {
    // 2. Execute the raw SQL for table creation
    await knex.raw(`
      CREATE TABLE "Branch" (
        "id" SERIAL NOT NULL,
        "organizationId" INTEGER NOT NULL,
        "name" TEXT NOT NULL,
        "address" TEXT,
        "branchHead" TEXT,
        "status" TEXT NOT NULL DEFAULT 'ACTIVE',
        CONSTRAINT "Branch_pkey" PRIMARY KEY ("id")
      );
    `);
  }
  if (hasBranch) {
    await knex.raw(`
      ALTER TABLE "Branch" 
      ADD CONSTRAINT "Branch_organizationId_fkey" 
      FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") 
      ON DELETE RESTRICT ON UPDATE CASCADE;
    `);
  }

  //! 3.check if the Role table exits using Knex helper
  const hasRole = await knex.schema.hasTable('Role');
  if (!hasRole) {
    await knex.raw(`
      CREATE TABLE "Role" (
        "id" SERIAL NOT NULL,
        "name" TEXT NOT NULL,
        "description" TEXT,
        CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
      );
    `);
  }
  if (hasRole) {
    await knex.raw(`
      CREATE UNIQUE INDEX IF NOT EXISTS "Role_name_key" ON "Role"("name");
    `);
  }
 
  //! 4.check if the User table exits using Knex helper
  const hasUser = await knex.schema.hasTable('User');
  if (!hasUser) {
    await knex.raw(`
      CREATE TABLE "User" (
        "id" SERIAL NOT NULL,
        "username" TEXT NOT NULL,
        "password" TEXT NOT NULL,
        "status" TEXT NOT NULL DEFAULT 'ACTIVE',
        "roleId" INTEGER NOT NULL,
        "branchId" INTEGER NOT NULL,
        CONSTRAINT "User_pkey" PRIMARY KEY ("id")
      );
    `);
  }
  if (hasUser) {
    await knex.raw(`
      CREATE UNIQUE INDEX IF NOT EXISTS "User_username_key" ON "User"("username");
    `);
    await knex.raw(`
      ALTER TABLE "User" 
      ADD CONSTRAINT "User_roleId_fkey" 
      FOREIGN KEY ("roleId") REFERENCES "Role"("id") 
      ON DELETE RESTRICT ON UPDATE CASCADE;
    `);
    await knex.raw(`
      ALTER TABLE "User" 
      ADD CONSTRAINT "User_branchId_fkey" 
      FOREIGN KEY ("branchId") REFERENCES "Branch"("id") 
      ON DELETE RESTRICT ON UPDATE CASCADE;
    `);}


  //! 5.check if the RolePermission table exits using Knex helper
  const hasRolePermission = await knex.schema.hasTable('RolePermission');
  if (!hasRolePermission) {
    await knex.raw(`
      CREATE TABLE "RolePermission" (
        "id" SERIAL NOT NULL,
        "roleId" INTEGER NOT NULL,
        "module" TEXT NOT NULL,
        "action" TEXT NOT NULL,
        CONSTRAINT "RolePermission_pkey" PRIMARY KEY ("id")
      );
    `);
  }
  if (hasRolePermission) {
    await knex.raw(`
      ALTER TABLE "RolePermission" 
      ADD CONSTRAINT "RolePermission_roleId_fkey" 
      FOREIGN KEY ("roleId") REFERENCES "Role"("id") 
      ON DELETE RESTRICT ON UPDATE CASCADE;
    `);
  }

  //! 6.check if the AuditLog table exits using Knex helper
const hasAuditLog = await knex.schema.hasTable('AuditLog');
  if (!hasAuditLog) {
    await knex.raw(`
      CREATE TABLE "AuditLog" (
        "id" SERIAL NOT NULL,
        "userId" INTEGER NOT NULL,
        "action" TEXT NOT NULL,
        "entity" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
      );
    `);
  }
  if (hasAuditLog) {
    await knex.raw(`
      ALTER TABLE "AuditLog" 
      ADD CONSTRAINT "AuditLog_userId_fkey" 
      FOREIGN KEY ("userId") REFERENCES "User"("id") 
      ON DELETE RESTRICT ON UPDATE CASCADE;
    `);
  }
}
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down =async function(knex) {
    await knex.raw('DROP TABLE IF EXISTS "Organization" CASCADE');
    await knex.raw('DROP TABLE IF EXISTS "Branch" CASCADE');
    await knex.raw('DROP TABLE IF EXISTS "Role" CASCADE');
    await knex.raw('DROP TABLE IF EXISTS "User" CASCADE');
    await knex.raw('DROP TABLE IF EXISTS "RolePermission" CASCADE');
    await knex.raw('DROP TABLE IF EXISTS "AuditLog" CASCADE');
  
};
