import type {RegistrationFormInput} from "../ui/RegistrationForm.tsx";

export const loginValidation = {
  required: "Поле обязательно к заполнению",
  minLength: {
    value: 7,
    message: "Минимальная длина 7 символов"
  }
}

export const passwordValidation = {
  required: "Поле обязательно к заполнению" as const,
  minLength: {
    value: 6,
    message: "Минимальная длина 6 символов" as const
  }
};

export const confirmPasswordValidation = {
  required: "Подтвердите пароль" as const,
  validate: (value: string, formValues: RegistrationFormInput) =>
      value === formValues.password || "Пароли не совпадают"
};