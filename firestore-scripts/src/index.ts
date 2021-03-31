import { Command } from 'commander';
import * as inquirer from 'inquirer';
import * as admin from 'firebase-admin';
import { firestoreMigration } from './modules/migrations/migrations.service';
import { version } from '../package.json';
main();

async function main() {
  console.log('running!');
  try {
    const program: any = new Command();
    program.version(version);
    program.option('--project <name>', 'project name: i.e. kevindahlberg-blog');
    program.option('--cert <file-path>', 'override the file path to firebase private key');
    program.option('--no-warnings', 'overrid warning messages');
    const options = program.opts();
    program
      .command('run-migrations')
      .description('Run migrations on database')
      .action(async (cmdObj: any) => {
        console.log('options', options);

        const { environment } = await getEnvironment(options.project);
        console.log('environment', environment);
        const fbApp = await getFirebaseApp(environment, options.cert, options.warnings);
        await firestoreMigration(fbApp);
        console.log('migration finished');
      });
    program.parse();
  } catch (error) {
    console.error('unable to run migration', error);
    process.exit(1);
  }
}

async function getEnvironment(project: string): Promise<any> {
  console.log('project', project);
  if (!project) {
    const questions = [
      {
        type: 'list',
        name: 'environment',
        message: 'What environment do you want to run the migration on?',
        choices: ['kevindahlberg-blog'],
        filter: function (val: string) {
          return val.toLowerCase();
        },
      },
    ];
    const answer = await inquirer.prompt(questions);
    return answer;
  }
  return { environment: project };
}
/**
 * Configs firebase admin app connector
 *
 * @param {string} projectName
 * @returns {Promise<admin.app.App>}
 */
async function getFirebaseApp(
  projectName: string,
  cert: string = null,
  showWarning = true,
): Promise<admin.app.App> {
  try {
    if (showWarning) {
      const updateText = 'update the firebase data';
      const questions: inquirer.QuestionCollection = [
        {
          type: 'confirm',
          name: 'confirmUpdate',
          default: false,
          message: `WARNING you are about to ${updateText} in the environment ${[
            projectName,
          ]}. Are you sure?`,
        },
      ];
      const answer: any = await inquirer.prompt(questions);
      if (answer.confirmUpdate !== true) {
        console.log('Abort mission. Repeat abort mission... Rodger that. Mission aborted.');
        process.exit(1);
      }
    }
    const certPath = cert ? cert : `./secrets/${projectName}-firebase-adminsdk.json`;
    const fbApp = admin.initializeApp({
      credential: admin.credential.cert(certPath),
      databaseURL: `https://${projectName}.firebaseio.com`,
    });
    return fbApp;
  } catch (error) {
    console.error('unable to get fb app', error);
    throw error;
  }
}
