/* eslint-disable */
import './styles.scss';
import 'bootstrap';
import i18next from 'i18next';
import app from './app.js';
import ru from './locale/ru.js';
import * as yup from 'yup';

const runApp = async () => {
  
  const i18nextInstance = i18next.createInstance();
  await i18nextInstance.init({
    lng: 'ru',
    debug: true,
    resources: { ru },
  }).then(() => {
    yup.setLocale({
      mixed: {
        required: 'errorMessage.required',
        notOneOf: 'errorMessage.urlNotOneOf',
      },
      string: {
        url: 'errorMessage.url',
      }
    })
  });

    // инициализированный экземпляр необходимо передать в приложение
    app(i18nextInstance);
  };


runApp();
//app();

// console.log('Hello World!');


