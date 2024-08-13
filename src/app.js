/* eslint-disable */

import * as yup from 'yup';
import view from './view.js';
import onChange from 'on-change';
import resources from './locale/ru.js';
import i18next from 'i18next';


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



/*
  const validate = (field, feeds) => {
    const schema = yup.object({
      url: yup
      .string()
      .required('URL is required')
      .url('Invalid URL format')
      .notOneOf(feeds),
    });
    return schema.validate(field);
  };
*/


/*
  const validate = (formData) => {
    const schema = yup.object().shape({
      url: yup
        .string()
        .required('URL is required')
        .url('Invalid URL format'),
    });
    return schema.validate(formData, { context: { existingUrls: ['http://existingurl.com'] } });
  };
*/






/*
const schema = yup.object().shape({
  url: yup
    .string()
    .required('URL is required')
    .url('Invalid URL format'),
});
*/
/*
    schema.validate(formData, { context: { existingUrls: ['http://existingurl.com'] } })
    .then(() => {
      url_data.classList.remove('is-invalid');
    })
    .catch((err) => {
      url_data.classList.add('is-invalid');
    });
*/


  const form = document.getElementById('general_form');
  const url_data = document.getElementById('url-input');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = url_data.value.trim();
    const formData = { url };


/*
    schema.validate(formData, { context: { existingUrls: ['http://existingurl.com'] } })
    .then(() => {
      url_data.classList.remove('is-invalid');
    })
    .catch((err) => {
      url_data.classList.add('is-invalid');
    });
*/










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








/*
    validate(formData)
    .then(() => {
      url_data.classList.remove('is-invalid');
      console.log('ok');
      watchedState.feeds.push(formData);
      url_data.focus();
      form.reset();
    })
    .catch((err) => {
      url_data.classList.add('is-invalid');
      console.log('not ok');
      console.log(err.message);
      watchedState.form.status = 'invalid';
      watchedState.form.errors = err.message;
    });
*/

/*
    validate({ url: formData }, state.feeds)
    .then(() => {
      url_data.classList.remove('is-invalid');
      console.log('ok');
      watchedState.feeds.push(formData);
      url_data.focus();
      form.reset();
    })
    .catch((err) => {
      url_data.classList.add('is-invalid');
      console.log('not ok');
      console.log(err.message);
      watchedState.form.status = 'invalid';
      watchedState.form.errors = err.message;
    });
*/


  });

   

};

export default app;






/*
    schema.validate(formData, { context: { existingUrls: ['http://existingurl.com'] } })
    .then(() => {
      input.classList.remove('is-invalid');
    })
    .catch((err) => {
      input.classList.add('is-invalid');
    });
*/
