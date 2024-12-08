import { FormEvent, useState } from "react";
import styles from "./LoginForm.module.css";
import {
  Button,
  Form,
  Input, Select
} from 'antd';
import {LoginData} from "../../servises/api"

type FormProps = {
  onSubmit: (data: LoginData) => void;
}

export default function LoginForm({onSubmit}: FormProps) {
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

  const handleSubmit = (values: LoginData) => {
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

<Button type="primary" htmlType="submit">
  Зарегистрироваться
</Button>

</Form>
</>
}