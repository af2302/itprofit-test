import React, {useState} from 'react';
import '../../styles/FeedbackForm.scss';
import InputMask from 'react-input-mask';

const FeedbackForm: React.FC = () => {
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    function handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
    }
    function validateForm(values: { [key: string]: string }) {
        let errors: { [key: string]: string } = {};

        // Проверка имени
        if (!values.name) {
            errors.name = "Поле Имя обязательно к заполнению";
        }

        // Проверка email
        if (!values.email) {
            errors.email = "Поле E-mail обязательно к заполнению";
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = "Некорректный адрес электронной почты";
        }

        // Проверка телефона
        if (!values.phone) {
            errors.phone = "Поле Телефон обязательно к заполнению";
        }

        // Проверка сообщения
        if (!values.message) {
            errors.message = "Поле Сообщение обязательно к заполнению";
        }

        return errors;
    }


    function sendFormData() {
        // Замените URL на ваш endpoint
        const url = '';

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(formValues),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    // Обработка успешной отправки
                    alert(data.msg);
                    setFormValues({
                        name: '',
                        email: '',
                        phone: '',
                        message: ''
                    }); // сброс значений формы после успешной отправки
                    setErrors({}); // очистка ошибок
                } else if (data.status === 'error') {
                    // Обработка ошибок с сервера
                    setErrors(data.fields);
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }
    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        const formErrors = validateForm(formValues);
        setErrors(formErrors);

        if (Object.keys(formErrors).length === 0) {
            // Обработка успешной отправки формы
            sendFormData(); // Вызовите эту функцию перед сбросом значений
        }
    }


    return (
        <div className="feedback-form">
            <h2>Форма обратной связи</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="name">Имя</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formValues.name}
                        placeholder="Введите ваше имя"
                        onChange={handleInputChange}
                    />
                    {errors.name && <div className="error-message">{errors.name}</div>}
                </div>

                <div className="input-group">
                    <label htmlFor="email">E-mail</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formValues.email}
                        placeholder="Введите ваш email"
                        onChange={handleInputChange}
                    />
                    {errors.email && <div className="error-message">{errors.email}</div>}
                </div>

                <div className="input-group">
                    <label htmlFor="phone">Телефон</label>
                    <InputMask
                        mask="+375 (99) 999-99-99"
                        id="phone"
                        name="phone"
                        value={formValues.phone}
                        placeholder="Введите ваш телефон"
                        onChange={handleInputChange}
                    />
                    {errors.phone && <div className="error-message">{errors.phone}</div>}
                </div>

                <div className="input-group">
                    <label htmlFor="message">Сообщение</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formValues.message}
                        placeholder="Ваше сообщение"
                        onChange={handleInputChange}
                    ></textarea>
                    {errors.message && <div className="error-message">{errors.message}</div>}
                </div>

                <button type="submit" >Отправить</button>
            </form>
        </div>
    );
}

export default FeedbackForm;
