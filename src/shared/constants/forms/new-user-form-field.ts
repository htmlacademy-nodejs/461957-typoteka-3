const NewUserFormField = {
  EMAIL: {
    name: `email`,
    label: `Электронная почта`,
  },
  PASSWORD: {
    name: `password`,
    label: `Пароль`,
  },
  PASSWORD_REPEATED: {
    name: `passwordRepeated`,
    label: `Повтор пароля`,
  },
  FIRST_NAME: {
    name: `firstName`,
    label: `Имя`,
  },
  LAST_NAME: {
    name: `lastName`,
    label: `Фамилия`,
  },
  AVATAR: {
    name: `avatar`,
    label: `Аватар профиля`,
  },
} as const;

export {NewUserFormField};
