const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

//customize yargs version
yargs.version('1.1.0')

// create add command
yargs.command({
	command: 'add',
	describe: 'Add a new note',
	builder:
	{
		title:{
			describe: 'Note title',
			demandOption: true,
			type: 'string'
		},
		body:{
			describe: 'Body of the title',
			demandOption: true,
			type: 'string'
		}
	},
	handler(argv)
	{
		notes.addnote(argv.title,argv.body)
	}
})

// create remove command
yargs.command({
	command: 'remove',
	describe: 'Remove a note',
	builder:
	{
		title:{
			describe: 'Title of node to be removed',
			demandOption: true,
			type: 'string'
		}
	},
	handler(argv)
	{
		notes.removenote(argv.title)
	}
})

// create read command
yargs.command({
	command: 'read',
	describe: 'Read a note',
	builder: 
	{
		title:
		{
			describe: 'Title of note to be read',
			demandOption: true,
			type: 'string'
		}
	},
	handler(argv)
	{
		notes.readnote(argv.title)
	}
})

// create list command
yargs.command({
	command: 'list',
	describe: 'List notes',
	handler()
	{
		notes.listnotes()
	}
})

yargs.parse()
//console.log(yargs.argv)
