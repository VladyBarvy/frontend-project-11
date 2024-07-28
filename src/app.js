/* eslint-disable */

import * as yup from 'yup';
import watchedState from './view.js';

const app = () => {





const schema = yup.object().shape({
  url: yup
    .string()
    .required('URL is required')
    .url('Invalid URL format'),
});



  const form = document.getElementById('general_form');
  const url_data = document.getElementById('url-input');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = url_data.value.trim();
    const formData = { url };



    schema.validate(formData, { context: { existingUrls: ['http://existingurl.com'] } })
    .then(() => {
      url_data.classList.remove('is-invalid');
    })
    .catch((err) => {
      url_data.classList.add('is-invalid');
    });






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
