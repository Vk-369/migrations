/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  const hasAuditLog = await knex.schema.hasTable('AuditLog');

  if (hasAuditLog) {
    await knex.raw(`
      ALTER TABLE "AuditLog" DROP CONSTRAINT IF EXISTS "AuditLog_userId_fkey";
      ALTER TABLE "AuditLog" 
      DROP COLUMN IF EXISTS "userId",
      ADD COLUMN "actorId" INTEGER,
      ADD COLUMN "actorRole" TEXT,
      ADD COLUMN "entityId" INTEGER,
      ADD COLUMN "ip" TEXT,
      ADD COLUMN "metadata" JSONB,
      ADD COLUMN "userAgent" TEXT;
    `);
  }
};

exports.down = async function(knex) {
  const hasAuditLog = await knex.schema.hasTable('AuditLog');

  if (hasAuditLog) {
    await knex.raw(`
      
      ALTER TABLE "AuditLog" 
      DROP COLUMN IF EXISTS "actorId",
      DROP COLUMN IF EXISTS "actorRole",
      DROP COLUMN IF EXISTS "entityId",
      DROP COLUMN IF EXISTS "ip",
      DROP COLUMN IF EXISTS "metadata",
      DROP COLUMN IF EXISTS "userAgent",
      ADD COLUMN "userId" INTEGER;

      ALTER TABLE "AuditLog" 
      ADD CONSTRAINT "AuditLog_userId_fkey" 
      FOREIGN KEY ("userId") REFERENCES "User"("id") 
      ON DELETE RESTRICT ON UPDATE CASCADE;
    `);
  }
};
