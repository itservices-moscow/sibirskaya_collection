// inputMask
import JustValidate from "just-validate";
import Inputmask from "inputmask";

let inputs = document.querySelectorAll('input[type="tel"]');
let im = new Inputmask("+7(999)999-99-99");
im.mask(inputs);
console.log("im", inputs, im);

import { validateForms } from "./functions/validate-forms";

const rules3 = [
  {
    ruleSelector: ".contact-name",
    rules: [
      {
        rule: "minLength",
        value: 2,
      },
      {
        rule: "required",
        value: true,
        errorMessage: "Заполните имя!",
      },
    ],
  },
  {
    ruleSelector: ".contact-tel",
    tel: true,
    telError: "Введите корректный телефон",
    rules: [
      {
        rule: "required",
        value: true,
        errorMessage: "Заполните телефон!",
      },
    ],
  },
];

// function validateForms(selector, rules) {
//   new JustValidate(selector, {
//     rules: rules,
//     submitHandler: function (form, values, ajax) {
//       console.log(form);
//     },
//   });
// }

// validateForms(".contactform", {
//   email: { required: true, email: true },
//   fio: { required: true },
//   tel: { required: true },
// });

// ===========================

// const rules1 = [...];
// const rules1 = [
//   {
//     ruleSelector: ".input-name",
//     rules: [
//       {
//         rule: "minLength",
//         value: 3,
//       },
//       {
//         rule: "required",
//         value: true,
//         errorMessage: "Заполните имя!",
//       },
//     ],
//   },
//   {
//     ruleSelector: ".input-tel",
//     tel: true,
//     telError: "Введите корректный телефон",
//     rules: [
//       {
//         rule: "required",
//         value: true,
//         errorMessage: "Заполните телефон!",
//       },
//     ],
//   },
// ];

const afterForm = () => {
  console.log("Произошла отправка, тут можно писать любые действия");
};

validateForms(".contactform", rules3, afterForm);
