export interface DatabaseMigration {
  label: string;
  migrationFn: any;
}
