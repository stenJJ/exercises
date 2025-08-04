// dynamically load theme
async function loadConfig() {
  const hour = new Date().getHours(); // current hour
  const theme = await import('./theme.mjs'); // load theme module

  if (hour < 18) {
    theme.setLightTheme(); // daytime
  } else {
    theme.setDarkTheme(); // nighttime
  }
}

loadConfig(); // run config
