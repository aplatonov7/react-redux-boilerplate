import path from 'path'
import createFromTemplate from './utils/createFromTemplate'
import capitalize from './utils/capitalize'

const args = process.argv.slice(2)

if (args.length === 0 || !/^[a-zA-z/]{1,}$/.test(args[0])) {
  throw new Error('You should specify a valid name argument')
}

const arg = process.argv[2].split('/')
const name = capitalize(arg[arg.length - 1])
const folders = arg.slice(0, -1).map(s => s.toLowerCase()).join('/')
const dest = path.join(__dirname, '../../app', 'containers', folders, name)

createFromTemplate('container/_js', { name }, dest, `${name}.js`)
createFromTemplate('container/_package', { name }, dest, 'package.json')
createFromTemplate('container/_test', { name }, dest, `${name}.spec.js`)
