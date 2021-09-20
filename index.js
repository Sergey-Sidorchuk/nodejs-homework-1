const contacts = require('./contacts');
// const argv = require('yargs').argv;

// function invokeAction({ action, id, name, email, phone }) {
// switch (action) {
// case 'list':
//         contacts.listContacts();
// break;

//     case 'get':
//         contacts.getContactById(id);
//         break;

//     case 'add':
//         contacts.addContact(name, email, phone);
//         break;

//     case 'remove':
//         contacts.removeContact(id);
//         break;

//     default:
//         console.warn('\x1B[31m Unknown action type!');
// }
// }

// invokeAction(argv);

const { program } = require('commander');
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);
const argv = program.opts();

async function invokeAction(argv) {
  const { action, id, name, email, phone } = argv;
  switch (action) {
    case 'list':
        const allContacts = await contacts.listContacts();
        console.table(allContacts);
      break;

    case 'get':
      const oneContact = await contacts.getContactById(Number(id));
      if (!oneContact){
          throw new Error(`Contact with id=${id} not found`);
      }
      console.table(oneContact);
      break;

    case 'add':
        await contacts.addContact(name, email, phone)
        console.log("Contact added successfully");
      break;

    case 'remove':
        const result = await contacts.removeContact(Number(id));
        if (!result){
            throw new Error(`Contact with id=${id} not found`);
        }
        console.log("Contact successfully removed");
      break;
    
    case 'update':
        const updateContact = await contacts.updateContactById(Number(id), name);
        if (!updateContact){
            throw new Error(`Contact with id=${id} not found`);
        }
        console.log(updateContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);