import React from 'react';
import classes from './Auth.module.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import is from 'is_js';
import axios from 'axios';
/* 
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
} */

export default class Auth extends React.Component {

    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Введите корректный email',
                valid: 'false',
                touched: 'false',
                /* Правила, по которым мы будет валидировать данный контрол */
                validation: {
                    required: true, // мы требуем, чтобы ввели данный контрол
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'пароль',
                errorMessage: 'Введите корректный пароль',
                valid: 'false',
                touched: 'false',
                /* Правила, по которым мы будет валидировать данный контрол */
                validation: {
                    required: true, // мы требуем, чтобы ввели данный контрол
                    minLength: 6
                }
            }
        }
    }

    loginHandler = async () => {

        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }

        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBB3aazLL-Jpr07-75hbpurNNSZJ4RAyN4', authData)
            console.log(response.data)
        } catch (e) {
            console.log(e)
        }

    }

    registerHandler = async () => {

        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }

        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBB3aazLL-Jpr07-75hbpurNNSZJ4RAyN4', authData)
            //console.log(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    submitHandler = (e) => {
        e.preventDefault();
    }

    validateControl(value, validation) {
        if (!validation) {
            return true
        }

        let isValid = true

        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (validation.email) {
            isValid = is.email(value) && isValid

        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid
    }

    onChangeHandler = (event, controlName) => {
        //console.log(`${controlName}: `, event.target.value);

        const formControls = { ...this.state.formControls } //так получаем копиюданного стейта
        const control = { ...formControls[controlName] }

        control.value = event.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation)

        formControls[controlName] = control

        let isFormValid = true;

        //console.log(formControls)

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({
            formControls, isFormValid
        })

    }

    renderInputs() {
        const inputs = Object.keys(this.state.formControls).map((controlName, index) => {

            const control = this.state.formControls[controlName];



            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={event => this.onChangeHandler(event, controlName)}
                />
            )
        })
        return inputs;
    }

    render() {

        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Авторизация</h1>

                    <form onSubmit={this.submitHandler} className={classes.AuthForm}>
                        {this.renderInputs()}
                        <Button
                            type="success"
                            onClick={this.loginHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Войти</Button>

                        <Button
                            type="primary"
                            onClick={this.registerHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Зарегистрироваться</Button>
                    </form>
                </div>
            </div>
        )
    }
}