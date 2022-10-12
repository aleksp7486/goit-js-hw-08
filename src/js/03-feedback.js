'Use strict';

var _ = require('lodash');
const validator = require('validator');
import locSt from './storage';

const refs = {
  form: document.querySelector('.feedback-form'),
};
// const form = document.querySelector('.feedback-form');

const validateEmail = email => {
  return validator.isEmail(email);
};
const formStateKey = 'feedback-form-state';
const formStateValue = {};
const formEmail = refs.form.elements.email;
const forMessage = refs.form.elements.message;
const formLocStCurrentValue = locSt.load(formStateKey);

setFormValueS();
refs.form.addEventListener('input', _.debounce(getFormValues, 300));
refs.form.addEventListener('submit', formSubmit);

function setFormValueS() {
  if (!formLocStCurrentValue) {
    return;
  }
  formEmail.value = formLocStCurrentValue.email;
  forMessage.value = formLocStCurrentValue.message;
}

function getFormValues(evt) {
  const formData = new FormData(refs.form);
  formData.forEach((value, name) => {
    formStateValue[`${name}`] = value;
  });
  locSt.save(formStateKey, formStateValue);
}

function formSubmit(evt) {
  evt.preventDefault();
  if (!validateEmail(formEmail.value)) {
    alert('Пожалуйста введите корректный email');
    return;
  }
  if (!forMessage.value) {
    alert('Пожалуйста заполните текстовое поле');
    return;
  }
  console.table(locSt.load(formStateKey));
  locSt.remove(formStateKey);
  evt.currentTarget.reset();
}
