import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { TextInput, PasswordInput, Text, Paper, Group } from "@mantine/core";
import { Button, Checkbox, Anchor, Stack } from "@mantine/core";
import classes from "./LoginForm.module.css";
import { useMutation } from "@tanstack/react-query";
import apiFetcher from "../../../../services/api";
import { useAuth } from "../../../../config/authprovider";
import { useNavigate } from "react-router-dom";

export const login = async (data) => apiFetcher("login", "POST", null, data);

export const register = async (data) =>
  apiFetcher("register", "POST", null, data);

const LoginForm = () => {
  const [type, toggle] = useToggle(["login", "register"]);
  const form = useForm({
    initialValues: {
      email: type === "register" ? "" : undefined,
      username: "",
      password: "",
      terms: type === "register" ? true : undefined,
    },
    validate: {
      email: (val) =>
        type === "register" && (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const { localLogin } = useAuth();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localLogin(data.token);
      navigate("/dashboard/reports");
    },
  });

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      localLogin(data.token);
      navigate("/dashboard/reports");
    },
  });

  const handleSubmit = (values) => {
    if (type === "login") {
      loginMutation.mutate({
        username: values.username,
        password: values.password,
      });
    } else {
      registerMutation.mutate({
        email: values.email,
        username: values.username,
        password: values.password,
        terms: values.terms,
      });
    }
  };

  return (
    <div className={classes.wrapper}>
      <Paper radius="md" p="xl" withBorder>
        <Text size="lg" fw={500} mb={30}>
          Bienvenido a tu app,{" "}
          {type === "login" ? "inicia sesión" : "regístrate"}
        </Text>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            {type === "register" && (
              <TextInput
                label="Correo electrónico"
                placeholder="hello@mail.com"
                value={form.values.email}
                onChange={(event) =>
                  form.setFieldValue("email", event.currentTarget.value)
                }
                error={form.errors.email && "Correo inválido"}
                radius="md"
              />
            )}

            <TextInput
              required
              label="Nombre de usuario"
              placeholder="Username"
              value={form.values.username}
              onChange={(event) =>
                form.setFieldValue("username", event.currentTarget.value)
              }
              radius="md"
            />

            <PasswordInput
              required
              label="Contraseña"
              placeholder="Tu contraseña"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={
                form.errors.password &&
                "Password debe incluir al menos 6 caracteres"
              }
              radius="md"
            />

            {type === "register" && (
              <Checkbox
                label="Yo acepto los términos y condiciones"
                checked={form.values.terms}
                onChange={(event) =>
                  form.setFieldValue("terms", event.currentTarget.checked)
                }
              />
            )}
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor
              component="button"
              type="button"
              c="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === "register"
                ? "Ya tienes una cuenta? Inicia sesión"
                : "Aún no tienes una cuenta? Regístrate aquí"}
            </Anchor>
            <Button type="submit" radius="xl">
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </div>
  );
};

export default LoginForm;
