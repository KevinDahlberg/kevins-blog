import * as admin from 'firebase-admin';
import * as inquirer from 'inquirer';
import { DatabaseMigration } from './interfaces/database-migration';
import { addMigration, getMigrationDocs } from './migrations.queries';

const databaseMigrations: DatabaseMigration[] = [];

export async function firestoreMigration(fbApp: admin.app.App) {
  try {
    console.log('Checking migrations...');
    const db = fbApp.firestore();
    const migrations = await getMigrationDocs(db);
    let lastMigrationDate;
    let remainingMigrations = databaseMigrations;
    if (migrations.length > 0) {
      for (const migration of migrations) {
        const date = migration.createdOn.toDate();
        if (lastMigrationDate) {
          lastMigrationDate = date > lastMigrationDate ? date : lastMigrationDate;
        } else {
          lastMigrationDate = date;
        }
        remainingMigrations = remainingMigrations.filter((m) => m.label !== migration.label);
      }
    }
    const message = `Database migration was last performed on ${lastMigrationDate}.  There are ${remainingMigrations.length} that have not been applied.`;
    if (remainingMigrations.length > 0) {
      const questions = [
        {
          type: 'confirm',
          name: 'continue',
          message: `${message} Would you like to continue?`,
          default: false,
        },
      ];

      const confirm = await inquirer.prompt(questions);
      if (confirm) {
        for (const migration of remainingMigrations) {
          await migration.migrationFn(db);
          await addMigration(db, migration.label);
        }
      }
    } else {
      console.log(`${message}  The robots have already done their job.`);
    }
  } catch (error) {
    throw error;
  }
}
