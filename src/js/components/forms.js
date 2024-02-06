import JustValidate from "just-validate"
import Inputmask from "inputmask"

// инициализируем модальное окно для submit
import GraphModal from "../vendor/graph-modal"
const modal = new GraphModal()

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
    ruleSelector: "#agreement", // чекбокс
    rules: [
      {
        rule: "required",
        errorMessage: "Обязательно",
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

export const validateForms = (selector, rules, afterSend) => {
  const form = document?.querySelector(selector)
  const telSelector = form?.querySelector('input[type="tel"]')

  if (!form) {
    console.error("Нет такого селектора!")
    return false
  }
  if (!rules) {
    console.error("Вы не передали правила валидации!")
    return false
  }

  if (telSelector) {
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
    submitHandler: function (form, values, ajax) {
      console.log(form)
    },
  })

  for (let item of rules) {
    // console.log("rule > ", item.rules);
    validation.addField(item.ruleSelector, item.rules)
  }

  validation.onSuccess((ev) => {
    console.log("[Верно заполнено, отправляем форму]", ev)
    // send
    let formData = new FormData(ev.target)
    //console.log(...formData)

    let popId = formData.get("form_popup")
    //console.log(popId)
    // let xhr = new XMLHttpRequest()
    // xhr.onreadystatechange = function () {
    //   if (xhr.readyState === 4) {
    //     if (xhr.status === 200) {
    //       console.log("Отправлено")
    //     }
    //   }
    // }
    // xhr.open("POST", "mail.php", true)
    // xhr.send(formData)

    // открыть модальное окно - перенести в запрос
    modal.open(popId)

    ev.target.reset()
  })
}

const afterForm = () => {
  console.log("Произошла отправка, тут можно писать любые действия")
}

validateForms(".contactform", rules3, afterForm)
validateForms(".startupsform", rules3, afterForm)