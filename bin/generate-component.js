/*
  Helper script for quick React component generation.
  Accepts name={component_name} as an argument and optional "container" flag.
*/

import fs from 'fs'
import mkdirp from 'mkdirp'
import path from 'path'

const args = process.argv.slice(2)

if (args.length === 0 || !/^name=[a-zA-z]{1,}$/.test(args[0])) {
  throw new Error('You should specify a valid name argument')
}

const name = process.argv[2].split('=')[1]
const container = process.argv.includes('container')

const folder = container ? 'containers' : 'components'
const dest = path.join(__dirname, '../app', folder, name)

const stylesFile = `
@import '../../styles/variables.scss';
@import '../../styles/mixins.scss';
`

const componentFile = `
import React, { PropTypes } from 'react'
import s from './${name}.scss'

const ${name} = (props) => (
  <div></div>
)

${name}.propTypes = {

}

export default ${name}
`

const containerFile = `
import React, { Component, PropTypes } from 'react'

class ${name} extends Component {
  static propTypes = {

  }

  constructor(props) {
    super(props)
  }

  render() {
    return <div></div>
  }
}

export default ${name}
`

/* eslint-disable no-console */
mkdirp(dest, (err) => {
  if (err) throw new Error(err)
  else console.log(`Created directory ${dest}`)
})

if (!container) {
  fs.writeFile(path.join(dest, `${name}.scss`), stylesFile.trim(), (err) => {
    if (err) throw new Error(err)
    console.log(`Generated ${name}.scss file`)
  })

  fs.writeFile(path.join(dest, 'index.js'), componentFile.trim(), (err) => {
    if (err) throw new Error(err)
    console.log(`Generated ${name}.js file`)
  })
} else {
  fs.writeFile(path.join(dest, 'index.js'), containerFile.trim(), (err) => {
    if (err) throw new Error(err)
    console.log(`Generated ${name}.js file`)
  })
}
