import type { ReactNode } from 'react';
import { Box, Text, useMantineTheme } from '@mantine/core';
import { AprilIcon } from '../icons/AprilIcon';
import type { AprilLucideIcon } from '../icons/AprilIcon';
import { Check } from 'lucide-react';

export interface AprilSuccessScreenProps {
  /** Заголовок. */
  title: string;
  /** Описание. */
  description?: ReactNode;
  /** Кастомная иконка. Default — Check (зелёный круг). */
  icon?: AprilLucideIcon;
  className?: string;
}

/**
 * AprilSuccessScreen — экран успешного завершения wizard.
 *
 * Сверено с прототипом LKFL: icon container 64×64, inner 32px, bg #DCFCE7.
 */
export function AprilSuccessScreen({
  title,
  description,
  icon: IconComponent = Check,
  className,
}: AprilSuccessScreenProps) {
  const theme = useMantineTheme();
  const primaryColor = theme.colors.teal[6] as unknown as string;
  const mutedColor = theme.colors.gray[5] as unknown as string;

  return (
    <Box
      className={className}
      style={{
        textAlign: 'center',
        padding: '20px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
      }}
    >
      {/* Icon */}
      <Box
        aria-hidden
        style={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          background: '#DCFCE7',
          color: primaryColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <AprilIcon icon={IconComponent} size={32} />
        </Box>
      </Box>

      {/* Title */}
      <Text
        style={{
          fontSize: 18,
          fontWeight: 800,
        }}
      >
        {title}
      </Text>

      {/* Description */}
      {description ? (
        <Text
          component="div"
          style={{
            fontSize: 13,
            color: mutedColor,
            lineHeight: 1.5,
          }}
        >
          {description}
        </Text>
      ) : null}
    </Box>
  );
}
