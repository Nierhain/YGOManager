import { mdiLightbulbOff, mdiLightbulbOn } from '@mdi/js';
import { Icon } from '@mdi/react';
import { Switch } from 'antd';
import React, { useState } from 'react'
import { useThemeSwitcher } from 'react-css-theme-switcher';

const ThemeToggler = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { switcher, status, themes } = useThemeSwitcher();

    if (status === "loading") {
      return null
    };

    const toggleTheme = (isChecked: boolean) => {
        setIsDarkMode(isChecked);
        switcher({theme: isChecked ? themes.dark : themes.light})
    }

    return (
        <Switch
            unCheckedChildren={<Icon path={mdiLightbulbOff} />}
            checkedChildren={<Icon path={mdiLightbulbOn} />}
            checked={isDarkMode}
            onChange={toggleTheme}
        ></Switch>
        
    )
}

export default ThemeToggler;