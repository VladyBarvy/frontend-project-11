/* eslint-disable */

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
    fetch('https://your-rss-feed-url.com/feed.xml')
      .then(response => response.text()) // Достаем текст RSS-канала
      .then(str => new DOMParser().parseFromString(str, "text/xml")) // Преобразуем текст в XML
      .then(data => {
        const items = data.querySelectorAll("item"); // Ищем все элементы 'item'
        items.forEach(el => {
          console.log(`Заголовок: ${el.querySelector("title").textContent}`); // Показываем заголовок каждого 'item'
          console.log(`Ссылка: ${el.querySelector("link").textContent}`); // Показываем ссылку каждого 'item'
        });
      });
*/










///////////////////////////////////
// https://codepen.io/picks/feed/


//fetch(formData)
//  .then(response => response.text()); // Достаем текст RSS-канала

/*
fetch(formData)
  .then(response => response.text()) // Достаем текст RSS-канала
  .then(str => new DOMParser().parseFromString(str, "text/xml")) // Преобразуем текст в XML
  .then(data => {
    const items = data.querySelectorAll("item"); // Ищем все элементы 'item'
    items.forEach(el => {
      console.log(`Заголовок: ${el.querySelector("title").textContent}`); // Показываем заголовок каждого 'item'
      console.log(`Ссылка: ${el.querySelector("link").textContent}`); // Показываем ссылку каждого 'item'
    });
  });

*/







/*
const addProxy = (url) => {
  const urlWithProxy = new URL('/get', 'https://allorigins.hexlet.app');
  urlWithProxy.searchParams.set('url', url);
  urlWithProxy.searchParams.set('disableCache', 'true');
  return urlWithProxy.toString();
};




const data = axios.get(addProxy(url));


console.log(data);
*/




  // console.log(typeof(formData.url));



  // Получение данных из RSS-потока
  fetch(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(formData.url)}`)
  .then(response => {
    if (response.ok) return response.text()
    throw new Error('Network response was not ok.')
  })
  .then((data) => {
    //console.log('Data view: ');
    //console.log(data);

    //console.log(data)

/*
    const parseChannel = (channel) => ({
      title: channel.querySelector('title')?.textContent || '',
      description: channel.querySelector('description')?.textContent || '',
    });
    
    const parseItem = (item) => ({
      title: item.querySelector('title')?.textContent || '',
      link: item.querySelector('link')?.textContent || '',
      description: item.querySelector('description')?.textContent || '',
      id: uniqueId(),
    });

*/


    // Парсинг данных с помощью DOMParser
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, 'text/html');  // text/html    application/xml
    
    
      
      


    console.log(doc.querySelector('channel').querySelector('title').textContent);

    //const rss = doc.querySelector('rss');
    //const items = doc.querySelectorAll('item');
    //const channels = doc.querySelectorAll('channel');
    

/*
    const getFeed = Array.from(channels).map(parseChannel);
    const getPosts = Array.from(items).map(parseItem);

    const result = { feed: getFeed, posts: getPosts };
*/
  


  // Извлекаем основную информацию для фидов
  /*
  const channel = doc.querySelectorAll('channel');
  const title = channel.querySelector('title').textContent;
  const description = channel.querySelector('description').textContent;

  // Извлекаем информацию для постов
  const items = channel.querySelectorAll('item');
  const posts = [...items].map((item) => ({
    id: generateId(),
    title: item.querySelector('title').textContent,
    description: item.querySelector('description').textContent,
    link: item.querySelector('link').textContent,
  }));
*/
  //console.log(doc);




    // Извлечение необходимых данных
    //const title = doc.querySelector('title').textContent;
    //console.log(title); // Заголовок элемента
    //console.log(items.description); // Описание элемента
    /*
    items.forEach((item) => {
      console.log(item.title.textContent); // Заголовок элемента
      console.log(item.link.href); // Ссылка элемента
    });
    */
  })
  .catch(error => console.error(error));


  



  /*
  .then(str => new DOMParser().parseFromString(str, "text/xml")) // Преобразуем текст в XML
  .then(data => {
    const items = data.querySelectorAll("item"); // Ищем все элементы 'item'
    items.forEach(el => {
      console.log(`Заголовок: ${el.querySelector("title").textContent}`); // Показываем заголовок каждого 'item'
      console.log(`Ссылка: ${el.querySelector("link").textContent}`); // Показываем ссылку каждого 'item'
    });
  });
*/

/*
fetch(formData)
  .then(response => response.json())
  .then(commits => alert(commits[0].author.login));
*/


///////////////////////////////////////////////////////////////////////








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
