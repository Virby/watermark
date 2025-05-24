bridge.send('VKWebAppInit')
  .then((data) => { 
    if (data.result) {
      // Приложение инициализировано
    } else {
      // Ошибка
    }
  })
  .catch((error) => {
    // Ошибка
    console.log(error);
  });
