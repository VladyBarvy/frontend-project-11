/* eslint-disable */

import './styles.css';
import 'bootstrap';
import _ from 'lodash';
import i18n from 'i18next';
import validateUrl from './validator.js';
import resources from './locales/index.js';
import domParser from './domParser.js';
import { checkForUpdates, fetchRss } from './utils.js';
import createWatchState from './view/watchState.js';

async function runApp() {
  try {
    const i18nextInstance = i18n.createInstance();
    await i18nextInstance.init({
      lng: 'ru',
      resources,
    });

    const elements = {
      form: document.querySelector('.rss-form'),
      input: document.querySelector('#url-input'),
      feedback: document.querySelector('.feedback'),
      modal: document.querySelector('.modal-footer'),
      submitButton: document.querySelector('button[type="submit"]'),
      postsContainer: document.querySelector('.posts'),
      feedsContainer: document.querySelector('.feeds'),
    };

    const state = {
      feeds: [],
      posts: [],
      error: null,
      feedback: null,
      viewedPosts: new Set(),
      isSubmitting: false,
      selectedPostId: null,
    };

    const watchedState = createWatchState(state, elements, i18nextInstance);

    // Обработчик отправки формы
    elements.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      watchedState.isSubmitting = true;
      watchedState.error = null; // Сброс ошибки перед новым запросом

      try {
        const formData = new FormData(e.target);
        const url = formData.get('url').trim();

        // Валидация URL
        await validateUrl(url, state);

        // Получение RSS данных
        const data = await fetchRss(url);

        const dataWithoutId = domParser(data.contents);
        const feedId = _.uniqueId('feed-');

        const feed = {
          id: feedId,
          title: dataWithoutId.title,
          description: dataWithoutId.description,
          url,
        };

        const posts = dataWithoutId.posts.map((post) => ({
          ...post,
          id: _.uniqueId('post-'),
          feedId,
        }));

        watchedState.feeds.unshift(feed);
        watchedState.posts.unshift(...posts);

        watchedState.feedback = 'success';
        watchedState.error = null; // Успешная обработка, очищаем ошибку

        e.target.reset();
        elements.input.focus();
      } catch (error) {
        watchedState.error = error.message;
      } finally {
        watchedState.isSubmitting = false; // Сбрасываем состояние отправки в любом случае
      }
    });

    // Обработчик кликов по постам
    elements.postsContainer.addEventListener('click', (event) => {
      const { target } = event;

      if (target.tagName === 'A') {
        const postId = target.getAttribute('data-id');
        watchedState.viewedPosts.add(postId);
      }

      if (target.tagName === 'BUTTON') {
        const postId = target.getAttribute('data-id');
        watchedState.selectedPostId = postId;
        watchedState.viewedPosts.add(postId);
      }
    });

    // Запуск проверки обновлений
    checkForUpdates(watchedState);
  } catch (error) {
    console.error('errors.i18nInitError', error);
  }
}

runApp();


/*
import * as yup from 'yup';
import view from './view.js';
import onChange from 'on-change';
import resources from './locale/ru.js';
import i18next from 'i18next';
import axios from 'axios';


const state = {
  form: {
    status: 'valid',
    errors: null,
  },
  feeds: [],
  posts: [],
};


const app = () => {

  const i18nextInstance = i18next.createInstance();
  i18nextInstance.init({
    lng: 'ru',
    resources,
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


  const watchedState = onChange(state, (path, value) => {
    console.log("birs1: " + path);
    console.log("birs2: " + value);
    view(path, value);
  });


  const form = document.getElementById('general_form');
  const url_data = document.getElementById('url-input');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = url_data.value.trim();
    const formData = { url };

    const schema = yup.object().shape({
      url: yup
        .string()
        .required('URL is required')
        .url('Invalid URL format'),
    });


    schema.validate(formData, { context: { existingUrls: ['http://existingurl.com'] } })
    .then(() => {
      //url_data.classList.remove('is-invalid');
      console.log('ok');
      //watchedState.feeds.push(formData);
      watchedState.form.status = 'valid';
      watchedState.form.errors = i18nextInstance.t('ok');
      url_data.focus();
      form.reset();
    })
    .catch((err) => {
      //url_data.classList.add('is-invalid');
      console.log('not ok');
      console.log(i18nextInstance.t('url'));
      console.log(err.message);
      watchedState.form.status = 'invalid';
      watchedState.form.errors = i18nextInstance.t('url');
    });


  // Получение данных из RSS-потока
  fetch(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(formData.url)}`)
  .then(response => {
    if (response.ok) return response.text()
    throw new Error('Network response was not ok.')
  })
  .then((data) => {



    // Парсинг данных с помощью DOMParser
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, 'text/html');  // text/html    application/xml


    console.log(doc.querySelector('channel').querySelector('title').textContent);

  })
  .catch(error => console.error(error));


  });

   

};

export default app;
*/

