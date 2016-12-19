import React, { PropTypes } from 'react'

const Html = ({ children, initialState = {}, scripts, styles, inlineStyles = '' }) => (
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <title>My React-Redux app</title>
      {styles.map(s => <link rel="stylesheet" key={s} href={s} />)}
      {inlineStyles ? <style type="text/css" id="SSRStyles">{inlineStyles}</style> : null}
      <script
        dangerouslySetInnerHTML={{ __html: `
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
          window.__CLIENT__ = true
        ` }}
      />
    </head>
    <body>
      <div id="app">{children}</div>
      {scripts.map(s => <script key={s} src={s} />)}
      <script
        dangerouslySetInnerHTML={{ __html: 'document.getElementById("SSRStyles").remove()' }}
      />
    </body>
  </html>
)

Html.propTypes = {
  children: PropTypes.node,
  inlineStyles: PropTypes.string,
  initialState: PropTypes.object, // eslint-disable-line
  scripts: PropTypes.arrayOf(PropTypes.string).isRequired,
  styles: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default Html
