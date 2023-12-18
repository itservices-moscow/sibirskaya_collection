import JustValidate from "just-validate"
import Inputmask from "inputmask"

let inputs = document.querySelectorAll('input[type="tel"]')
let im = new Inputmask("+7(999)999-99-99")
im.mask(inputs)
// console.log("im", inputs, im);

const rules3 = [
  {
    ruleSelector: ".contact-fio",
    rules: [
      {
        rule: "minLength",
        value: 2,
        errorMessage: "Имя должно быть не короче 2 символов",
      },
      {
        rule: "required",
        value: true,
        errorMessage: "Заполните имя",
      },
    ],
  },
  {
    ruleSelector: ".contact-email",
    rules: [
      {
        rule: "email",
        value: true,
        errorMessage: "Введите корректный email",
      },
      {
        rule: "required",
        value: true,
        errorMessage: "Заполните email",
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
        errorMessage: "Заполните телефон",
      },
    ],
  },
]

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

export const validateForms = (selector, rules, afterSend) => {
  const form = document?.querySelector(selector)
  const telSelector = form?.querySelector('input[type="tel"]')

  console.log(form, telSelector)

  if (!form) {
    console.error("Нет такого селектора!")
    return false
  }
  if (!rules) {
    console.error("Вы не передали правила валидации!")
    return false
  }

  if (telSelector) {
    // const inputMask = new Inputmask("+7(999)999-99-99");
    // inputMask.mask(telSelector);

    for (let item of rules) {
      if (item.tel) {
        item.rules.push({
          rule: "function",
          validator: function () {
            const phone = telSelector.inputmask.unmaskedvalue()
            return phone.length === 10
          },
          errorMessage: item.telError,
        })
      }
    }
  }

  const validation = new JustValidate(selector, {
    errorLabelStyle: {
      color: "#FF3A2E",
    },
    // submitHandler: function (form, values, ajax) {
    //   console.log(form);
    // },
  })

  for (let item of rules) {
    // console.log("rule > ", item.rules);
    validation.addField(item.ruleSelector, item.rules)
  }

  validation.onSuccess((ev) => {
    console.log("верно заполнено", ev)
    // send

    ev.target.reset()
  })
}

const afterForm = () => {
  console.log("Произошла отправка, тут можно писать любые действия")
}

validateForms(".contactform", rules3, afterForm)
