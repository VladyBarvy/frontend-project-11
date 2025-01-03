/*
export default {
  translation: {
    errorMessage: {
      url: 'Ссылка должна быть валидным URL',
      urlValid: 'RSS успешно загружен',
      urlInValid: 'Ресурс не содержит валидный RSS',
      urlNotOneOf: 'RSS уже существует',
      required: 'Это обязательное поле',
      timeout: 'Ошибка сети',
    },
    feeds: 'Фиды',
    posts: {
      title: 'Посты',
      button: 'Просмотр',
    },
  },
};
*/
/*
export default {
  ru: {
    translation: {
      "url": 'Ссылка должна быть валидным URL',
      "urlValid": 'RSS успешно загружен',
      "urlInValid": 'Ресурс не содержит валидный RSS',
      "urlNotOneOf": 'RSS уже существует',
      "required": 'Это обязательное поле',
      "timeout": 'Ошибка сети',
      "ok": '',
    },
  },
};
*/

const resources = {
  ru: {
    translation: {
      errors: {
        invalidUrl: 'Ссылка должна быть валидным URL', // err1
        invalidRss: 'Ресурс не содержит валидный RSS', // err2
        duplicateRss: 'RSS уже существует', // duplicate
        networkError: 'Ошибка сети', // netError1
        serverError: 'Ошибка сервера', // netError2
        unknownError: 'Неизвестная ошибка. Что-то пошло не так.', // unknownError
        i18nInitError: 'Ошибка инициализации i18n', // Новая ошибка для инициализации i18n
        rssFetchError: 'Ошибка загрузки RSS фида с ', // Новая ошибка для загрузки RSS фида
        generalUpdateError: 'Критическая ошибка обновления фидов:',
      },
      successful: {
        rssLoadSuccess: 'RSS успешно загружен', // success1
      },
      headers: {
        feeds: 'Фиды',
        posts: 'Посты',
      },
      buttons: {
        viewing: 'Просмотр', // viewing
        read: 'Читать полностью', // read
        close: 'Закрыть', // close
      },
    },
  },
};

export default resources;

