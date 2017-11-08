import React from 'react'
import propTypes from 'prop-types'

import { storiesOf } from '@storybook/react'
import R from 'ramda'

import '../../src/styles/index.css'
import style from './style.css'

const getThemeColors = (theme) => {
  const isRoot = rule => rule.selectorText === ':root'
  const isColorProperty = prop => prop.startsWith(theme)

  const result = Array.from(document.styleSheets).reduce((accProperties, sheet) => {
    const rules = Array.from(sheet.cssRules).filter(isRoot)

    const cssText = rules.reduce((acc, rule) => {
      let themeProperties = Array.from(rule.style).filter(isColorProperty)

      themeProperties = themeProperties.filter(prop => !acc.includes(prop))

      return acc.concat(themeProperties)
    }, [])

    return accProperties.concat(cssText)
  }, [])

  const groupByColorName = R.groupBy(prop => prop.split('-')[4])

  return groupByColorName(result)
}


class Colors extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      colors: [],
    }
  }

  componentWillMount () {
    const theme = getThemeColors(this.props.theme)

    this.setState({
      colorNames: Object.keys(theme),
      colors: theme,
    })
  }

  render () {
    return (
      <div className={style.container}>
        {this.state.colorNames.map(name => (
          <div key={name}>
            <h2>{name}</h2>

            <div>
              {this.state.colors[name].map(customProp => (
                <div key={customProp}>
                  <div
                    style={{ background: `var(${customProp})` }}
                    className={style.row}
                  >
                    <div className={style.rowText}>
                      {customProp}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }
}

Colors.propTypes = {
  theme: propTypes.string.isRequired,
}

storiesOf('Colors', module)
  .add('all', () => (
    <div className={style.root}>
      <h1>Light Theme</h1>
      <Colors theme="--color-light" />
    </div>
  ))
