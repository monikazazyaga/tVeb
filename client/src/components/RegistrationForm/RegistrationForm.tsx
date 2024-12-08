import { FormEvent, useState } from "react";
import styles from "./RegistrationForm.module.css"
import {
  Button,
  Form,
  Input, Select
} from 'antd';
import {RegistrationData} from "../../servises/api"

export type RegistrationData = {
 login: string;
  password: string;
}

type FormProps = {
  onSubmit: (data: RegistrationData) => void;
}

export default function RegistrationForm({onSubmit}: FormProps) {
  const [login, setLogin] = useState("");
  const [loginError, setLoginError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [form] = Form.useForm();
  

  const isValid = (): boolean => {
    let result = true;

    // очищаем ошибки
    setLoginError("");

    if (!/^([a-z0-9]{6,20})$/.test(login)) {
      setLoginError("Логин должен содержать от 6 до 20 символов латинского алфавита и цифры.");
      result = false;
    }

    if (login.length === 0) {
      setLoginError("Логин не может быть пустым.");
      result = false;
    }

    setPasswordError("");

    if (password.length === 0) {
      setPasswordError("Пароль не может быть пустым.");
      result = false;
    }

    return result;
  };

  const handleSubmit = (values: RegistrationData) => {
    onSubmit({
      login: values.login,
      password: values.password
  });
  };

  return <>
    <Form form={form} onFinish={handleSubmit} style={{ maxWidth: 600 }}>

<Form.Item label="Login" name={"login"} rules={[{ required: true }]}>
  <Input placeholder="Login" />
</Form.Item>

<Form.Item label="Password" name="password" rules={[{ required: true }]}>
  <Input.Password />
</Form.Item>

{/* Field */}
<Form.Item
    label="Confirm Password"
    name="passwordConfirm"
    dependencies={['password']}
    rules={[
      {
        required: true,
      },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || getFieldValue('password') === value) {
            return Promise.resolve();
          }
          return Promise.reject(new Error('The new password that you entered do not match!'));
        },
      }),
    ]}
>
  <Input.Password />
</Form.Item>

<Button type="primary" htmlType="submit">
  Зарегистрироваться
</Button>

</Form>
</>
}