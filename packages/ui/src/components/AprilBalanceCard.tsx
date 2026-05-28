import { Box, Text, useMantineTheme } from '@mantine/core';

export interface AprilBalanceCategory {
  label: string;
  value: string;
  percentage: number; // 0-100
}

export interface AprilBalanceCardProps {
  /** Label (например "Доступный баланс"). */
  label: string;
  /** Основное значение (например "1 250"). */
  value: string;
  /** Подзаголовок (например "Следующее начисление: +500 в июне"). */
  subtitle?: string;
  /** Категории с прогресс-барами. */
  categories?: AprilBalanceCategory[];
  className?: string;
  'data-testid'?: string;
}

/**
 * AprilBalanceCard — зелёная карточка баланса с прогресс-барами по категориям.
 *
 * Сверено с прототипом LKFL: primary bg, border-radius 14px, padding 28px 24px.
 */
export function AprilBalanceCard({
  label,
  value,
  subtitle,
  categories,
  className,
  'data-testid': dataTestId,
}: AprilBalanceCardProps) {
  const theme = useMantineTheme();
  const primaryColor = theme.colors.teal[6] as unknown as string;

  return (
    <Box
      className={className}
      data-testid={dataTestId}
      style={{
        background: primaryColor,
        borderRadius: 14,
        padding: '28px 24px',
        color: 'white',
      }}
    >
      {/* Label */}
      <Text
        style={{
          fontSize: 12,
          fontWeight: 600,
          opacity: 0.75,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          marginBottom: 6,
        }}
      >
        {label}
      </Text>

      {/* Value */}
      <Text
        style={{
          fontSize: 48,
          fontWeight: 800,
          letterSpacing: '-2px',
          lineHeight: 1,
          marginBottom: subtitle || categories ? 8 : 0,
        }}
      >
        {value}
      </Text>

      {/* Subtitle */}
      {subtitle ? (
        <Text
          style={{
            fontSize: 12,
            opacity: 0.7,
            lineHeight: 1.4,
            marginBottom: categories ? 20 : 0,
          }}
        >
          {subtitle}
        </Text>
      ) : null}

      {/* Categories with progress bars */}
      {categories && categories.length > 0 ? (
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            marginTop: 20,
          }}
        >
          {categories.map((cat) => {
            const clamped = Math.max(0, Math.min(100, cat.percentage));
            return (
              <Box key={cat.label}>
                {/* Category label + value */}
                <Box
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 6,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      opacity: 0.85,
                    }}
                  >
                    {cat.label}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    {cat.value}
                  </Text>
                </Box>

                {/* Progress bar */}
                <Box
                  style={{
                    height: 6,
                    background: 'rgba(255,255,255,0.25)',
                    borderRadius: 3,
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    style={{
                      height: '100%',
                      width: `${clamped}%`,
                      background: 'white',
                      borderRadius: 3,
                      transition: 'width 0.3s ease',
                    }}
                  />
                </Box>
              </Box>
            );
          })}
        </Box>
      ) : null}
    </Box>
  );
}
