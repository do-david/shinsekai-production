import React from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'

import { useDispatch, useSelector } from 'react-redux'
import { changeTheme } from '../../actions/theme'
import { themeDark, themeLight } from '../../configs/theme'

const ThemeButton = () => {
  const themeName = useSelector(state => state?.theme?.currentTheme?.name)
  console.log(themeName)
  const dispatch = useDispatch()
  return (
    <>
      {themeName === 'dark' ? (
        <FaSun
          size={32}
          color='#ffffff'
          onClick={() => dispatch(changeTheme(themeLight))}
        ></FaSun>
      ) : (
        <FaMoon
          size={32}
          color='#222222'
          onClick={() => dispatch(changeTheme(themeDark))}
        ></FaMoon>
      )}
    </>
  )
}

ThemeButton.propTypes = {}

export default ThemeButton
