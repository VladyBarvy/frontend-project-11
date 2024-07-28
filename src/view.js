import onChange from 'on-change';
  



const state = {
  url_form: {
      isValid: false,
  },
};


const render = (path, value) => {
  result.textContent = value;
};


  // View  
  const watchedState = onChange(state, render);

export default watchedState;
