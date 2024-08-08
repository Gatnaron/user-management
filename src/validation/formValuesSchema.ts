import * as yup from 'yup';

const formValuesSchema = yup.object().shape({
    username: yup.string().min(3, 'Минимальная длина 3 символа').required('Введите имя пользователя'),
    password: yup.string().min(4, 'Минимальная длина 4 символа').required('Введите пароль'),
    firstName: yup.string().min(2, 'Минимальная длина 2 символа').required('Введите имя'),
    lastName: yup.string(),
    roles: yup.array().of(yup.string().required()).required('Выберите роли'),
    workBorders: yup.array().of(yup.string().required()).required('Выберите рабочие границы'),
});

export default formValuesSchema;
