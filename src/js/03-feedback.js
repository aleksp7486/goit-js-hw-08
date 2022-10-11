'Use strict';

var _ = require('lodash');
const validator = require('validator');
import locSt from './storage_save-load';

const form = document.querySelector('.feedback-form');
const formSubmitBtn = form.querySelector('button');

const validateEmail = email => {
  return validator.isEmail(email);
};
const formStateKey = 'feedback-form-state';
const formStateValue = {};
const formEmail = form.elements.email;
const forMessage = form.elements.message;
const formLocStCurrentValue = locSt.load(formStateKey);

setFormValueS();
form.addEventListener('input', _.throttle(getFormValues, 500));
formSubmitBtn.addEventListener('click', formSubmit);

function setFormValueS() {
  if (!formLocStCurrentValue) {
    return;
  }
  if (!(formLocStCurrentValue.email || formLocStCurrentValue.message)) {
    return;
  }
  formEmail.value = formLocStCurrentValue.email;
  forMessage.value = formLocStCurrentValue.message;
}

function getFormValues(evt) {
  evt.preventDefault();
  const formData = new FormData(form);
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
  form.reset();
}
