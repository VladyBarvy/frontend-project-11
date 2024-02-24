/* eslint-disable */
import onChange from 'on-change';
import { setLocale, string } from 'yup';

const app = (i18n) => {
  // yup
  setLocale({
    mixed: {
      notOneOf: 'form.messages.errors.urlActuallyExist',
      required: 'form.messages.errors.emptyValue',
    },
    string: {
      url: 'form.messages.errors.invalidUrl',
    },
  });
};
