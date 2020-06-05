const fs=require('fs')
const chalk=require('chalk')

//adding notes
const addnote=  (title,body) =>
{
	const notes=loadnotes()  
	/*const duplicatenotes = notes.filter((note) =>  note.title===title)
	if(duplicatenotes.length===0)
	{
		notes.push({
			title:title,
			body:body
		})
		savenotes(notes)
		console.log(chalk.green.bold.inverse('New note added'))
	}
	else
	{
		console.log(chalk.blue.inverse('Note already exists'))
	}*/
	const duplicatenotes = notes.find((note) =>  note.title===title)
	if(duplicatenotes === undefined)
	{
		notes.push({
			title:title,
			body:body
		})
		savenotes(notes)
		console.log(chalk.green.bold.inverse('New note added'))
	}
	else
	{
		console.log(chalk.blue.inverse('Note already exists'))
	}
}
const savenotes = (notes) =>
{
	const dataJSON = JSON.stringify(notes)
	fs.writeFileSync('notes.json',dataJSON)
}

//removing note
const removenote = (title) =>
{
	const notes = loadnotes()
	const note_present = notes.filter((note) => note.title!==title)
	if(note_present.length===notes.length)
	{
		console.log(chalk.red.inverse('Node with title : '+title+' not found'))
	}
	else
	{
		savenotes(note_present)
		console.log(chalk.green.bold.inverse('Node with title : '+title+' found and removed'))
	}
}

const listnotes = () =>
{
	console.log(chalk.inverse('< format >'))
	console.log(chalk.inverse('id : title'))
	console.log(chalk.red.bold('Your Notes ...'))
	const notes = loadnotes()
	var i=1
	const all_notes = notes.filter((note) => console.log(chalk.green.bold((i++)+" : "+note.title)))
}

const readnote = (title) =>
{
	const notes = loadnotes()
	const found = notes.find((note) => note.title===title)
	if(found === undefined)
	{
		console.log(chalk.red.inverse('Error : No such note found'))
	}
	else
	{
		console.log(chalk.inverse('< format >'))
		console.log(chalk.inverse('title -> body'))
		console.log(chalk.green.bold(title)+" : "+chalk.blue.bold(found.body))
	}
}




const loadnotes = () =>
{
	try
	{
		const dataBuffer = fs.readFileSync('notes.json')
		const dataJSON = dataBuffer.toString()
		return JSON.parse(dataJSON)
	}
	catch(e)
	{
		return []
	}	
}

module.exports = {
	addnote: addnote,
	removenote: removenote,
	listnotes: listnotes,
	readnote: readnote
}