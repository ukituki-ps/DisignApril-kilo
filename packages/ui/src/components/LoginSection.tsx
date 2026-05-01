import { useState } from 'react';
import {
  Box,
  Card,
  TextInput,
  PasswordInput,
  Button,
  Checkbox,
  Group,
  Text,
  Divider,
  Stack,
  Anchor,
  Center,
} from '@mantine/core';
import { MailIcon, LockIcon } from 'lucide-react';
import { useDensity } from '../DensityContext';

const LOGO_ICON = '/g12875-8.svg';

const TEAL_FILTER =
  'brightness(0) saturate(100%) invert(65%) sepia(51%) saturate(552%) hue-rotate(118deg) brightness(92%) contrast(87%)';

function GoogleIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function MicrosoftIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 21 21" fill="none">
      <rect x="1" y="1" width="9" height="9" fill="#F25022" />
      <rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
      <rect x="1" y="11" width="9" height="9" fill="#00A4EF" />
      <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
    </svg>
  );
}

export function LoginSection() {
  const { density } = useDensity();
  const isCompact = density === 'compact';
  const size = isCompact ? 'xs' : 'sm';
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <Stack gap="xl">
      <Text fw={500} size="sm">
        Предпросмотр экрана входа
      </Text>

      <Center>
        <Card
          shadow="md"
          p={isCompact ? 'lg' : 'xl'}
          radius="md"
          withBorder
          style={{
            width: '100%',
            maxWidth: 420,
          }}
        >
          <Stack gap="lg">
            <Center>
              <Group gap="sm">
                <img
                  src={LOGO_ICON}
                  alt="April"
                  style={{
                    height: 32,
                    width: 32,
                    objectFit: 'contain',
                    filter: TEAL_FILTER,
                  }}
                />

                <Text fw={700} size="xl">
                  April
                </Text>
              </Group>
            </Center>

            <Box ta="center">
              <Text size="lg" fw={600}>
                С возвращением
              </Text>
              <Text size="sm" c="dimmed">
                Войдите в рабочее пространство
              </Text>
            </Box>

            <Stack gap="sm">
              <Button variant="default" fullWidth size={size} leftSection={<GoogleIcon size={16} />}>
                Продолжить с Google
              </Button>
              <Button variant="default" fullWidth size={size} leftSection={<MicrosoftIcon size={16} />}>
                Продолжить с Microsoft
              </Button>
            </Stack>

            <Divider label="или войдите по почте" labelPosition="center" />

            <Stack gap="md">
              <TextInput
                label="Электронная почта"
                placeholder="you@company.com"
                leftSection={<MailIcon size={16} />}
                size={size}
                required
              />
              <PasswordInput
                label="Пароль"
                placeholder="Ваш пароль"
                leftSection={<LockIcon size={16} />}
                size={size}
                required
              />
            </Stack>

            <Group justify="space-between">
              <Checkbox label="Запомнить меня" size={size} />
              <Anchor size="sm" c="teal">
                Забыли пароль?
              </Anchor>
            </Group>

            <Button fullWidth size={size} loading={loading} onClick={handleLogin}>
              Войти
            </Button>

            <Text ta="center" size="sm" c="dimmed">
              Нет аккаунта?{' '}
              <Anchor c="teal" fw={500}>
                Зарегистрироваться
              </Anchor>
            </Text>
          </Stack>
        </Card>
      </Center>

      <Box>
        <Text fw={500} size="sm" mb="xs">
          Состав экрана входа
        </Text>
        <Text size="sm" c="dimmed">
          <strong>Верх:</strong> логотип и приветствие. <strong>Соцсети:</strong> Google и Microsoft SSO.{' '}
          <strong>Форма:</strong> почта и пароль с иконками. <strong>Действия:</strong> «Запомнить меня», восстановление
          пароля, кнопка входа с индикатором загрузки. <strong>Низ:</strong> ссылка на регистрацию.
        </Text>
        <Text size="sm" c="dimmed" mt="xs">
          Кнопка «Войти» показывает спиннер 1,5 с (демо). Все элементы учитывают режим плотности.
        </Text>
      </Box>
    </Stack>
  );
}
