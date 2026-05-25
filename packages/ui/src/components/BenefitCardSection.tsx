import { Box, SimpleGrid, Stack, Text } from '@mantine/core';
import { Brain, Dumbbell, HeartPulse, ShoppingBag, Smile, Utensils } from 'lucide-react';
import { BenefitCard } from './BenefitCard';

export function BenefitCardSection() {
  return (
    <Stack gap="xl">
      {/* Каталог: сетка 3 колонки (прототип ЛК физика) */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Каталог льгот (сетка, как в прототипе)
        </Text>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
          <BenefitCard
            title="ДМС — Базовая программа"
            provider="АльфаСтрахование"
            description="Полис добровольного медицинского страхования. Включает амбулаторное лечение, стационар и скорую помощь."
            status="active"
            showPrice
            price="Включено"
            priceSuffix="в пакет"
            avatarIcon={<HeartPulse size={22} aria-hidden />}
          />
          <BenefitCard
            title="ДМС — Расширенная программа"
            provider="АльфаСтрахование"
            description="Расширенный пул клиник, стоматология, офтальмология и выезд врача на дом."
            status="available"
            showPrice
            price="3 500"
            priceSuffix="₽ / мес"
            avatarIcon={<HeartPulse size={22} aria-hidden />}
          />
          <BenefitCard
            title="ДМС Семья"
            provider="АльфаСтрахование"
            description="Добавьте супруга, детей или родителей к программе ДМС с персональным покрытием."
            status="available"
            showPrice
            price="от 1 800"
            priceSuffix="₽ / мес"
            avatarIcon={<HeartPulse size={22} aria-hidden />}
          />
          <BenefitCard
            title="Фитнес — World Class"
            provider="World Class"
            description="Доступ в сеть фитнес-клубов World Class с групповыми занятиями и бассейном."
            status="active"
            showPrice
            price="500"
            priceSuffix="баллов / мес"
            avatarIcon={<Dumbbell size={22} aria-hidden />}
          />
          <BenefitCard
            title="Обеды в офисе"
            provider="Яндекс Еда for Business"
            description="Компенсация обедов в офисе или доставки до рабочего места до 300 ₽ в день."
            status="available"
            showPrice
            price="300"
            priceSuffix="₽ / день"
            avatarIcon={<Utensils size={22} aria-hidden />}
          />
          <BenefitCard
            title="Психолог онлайн"
            provider="Яндекс Психотерапия"
            description="4 сессии с профессиональным психологом онлайн. Анонимно и конфиденциально."
            status="waiting"
            showPrice
            price="600"
            priceSuffix="баллов"
            avatarIcon={<Brain size={22} aria-hidden />}
          />
          <BenefitCard
            title="Мерч СДЭК"
            provider="СДЭК Store"
            description="Фирменная одежда и аксессуары СДЭК: худи, футболки, кружки, термосы."
            status="available"
            showPrice
            price="от 200"
            priceSuffix="баллов"
            avatarIcon={<ShoppingBag size={22} aria-hidden />}
          />
          <BenefitCard
            title="Стоматология"
            provider="Мать и дитя"
            description="Профилактические осмотры, чистка и лечение в сети стоматологических клиник."
            status="available"
            showPrice
            price="950"
            priceSuffix="баллов / год"
            avatarIcon={<Smile size={22} aria-hidden />}
          />
          <BenefitCard
            title="Фитнес (прошлый год)"
            provider="World Class"
            description="Абонемент истёк. Обновите подписку."
            status="expired"
            disabled
            avatarIcon={<Dumbbell size={22} aria-hidden />}
          />
        </SimpleGrid>
      </Stack>

      {/* Карточки с прогрессом */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          С прогрессом и CTA
        </Text>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
          <BenefitCard
            title="ДМС Премиум"
            provider="АльфаСтрахование"
            description="Расширенная страховка с стоматологией"
            status="active"
            showProgress
            progressValue={65}
            progressLabel="Использовано"
            quickAction="Открыть полис"
            avatarIcon={<HeartPulse size={22} aria-hidden />}
          />
          <BenefitCard
            title="Онлайн-курс JavaScript"
            provider="Skillbox"
            description="Пройдите курс и получите сертификат. Доступен до конца квартала."
            status="waiting"
            showProgress
            progressValue={40}
            progressLabel="Пройдено модулей"
            quickAction="Продолжить"
            avatarIcon={<Brain size={22} aria-hidden />}
          />
        </SimpleGrid>
      </Stack>

      {/* Mobile preview: полноширинные карточки */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Mobile preview (полноширинный стек)
        </Text>
        <Box
          style={{
            maxWidth: 375,
            margin: '0 auto',
            border: '1px solid var(--mantine-color-default-border)',
            borderRadius: 'var(--mantine-radius-md)',
            padding: 'var(--mantine-spacing-md)',
          }}
        >
          <Stack gap="sm">
            <BenefitCard
              title="ДМС — Базовая программа"
              provider="АльфаСтрахование"
              status="active"
              showPrice
              price="Включено"
              priceSuffix="в пакет"
              avatarIcon={<HeartPulse size={22} aria-hidden />}
              quickAction="Открыть полис"
            />
            <BenefitCard
              title="Фитнес — World Class"
              provider="World Class"
              status="active"
              showPrice
              price="500"
              priceSuffix="баллов / мес"
              showProgress
              progressValue={30}
              progressLabel="Визитов в этом месяце"
              avatarIcon={<Dumbbell size={22} aria-hidden />}
              quickAction="Записаться"
            />
            <BenefitCard
              title="Кино билеты"
              provider="Кинозаල"
              status="expired"
              disabled
              avatarIcon={<Smile size={22} aria-hidden />}
            />
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
}
