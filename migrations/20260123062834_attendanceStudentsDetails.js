/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  const hasAttendanceStudents = await knex.schema.hasTable('AttendanceStudents');

  if (!hasAttendanceStudents) {
    await knex.raw(`
      CREATE TABLE "AttendanceStudents" (
        "id" SERIAL PRIMARY KEY,
        "studentId" TEXT NOT NULL,
        "batchId" INTEGER NOT NULL,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "AttendanceStudents_batchId_fkey" 
          FOREIGN KEY ("batchId") 
          REFERENCES "AttendanceBatches"("id") 
          ON DELETE CASCADE 
          ON UPDATE CASCADE
      );
    `);
  }
};

exports.down = async function(knex) {
  const hasAttendanceStudents = await knex.schema.hasTable('AttendanceStudents');

  if (hasAttendanceStudents) {
    await knex.raw('DROP TABLE "AttendanceStudents" CASCADE;');
  }
};
