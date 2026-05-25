import {
  Box,
  Text,
  Paper,
  Flex,
  useMantineTheme,
} from '@mantine/core';
import { MapPin } from 'lucide-react';

export interface ClinicItem {
  id: string;
  name: string;
  address: string;
  schedule?: string;
  lat?: number;
  lng?: number;
}

export interface ClinicMapListProps {
  clinics: ClinicItem[];
  mapUrl?: string;
  mapHeight?: string;
  onClinicClick?: (clinic: ClinicItem) => void;
  showList?: boolean;
}

const DEFAULT_MAP_HEIGHT = '220px';
const MAP_BORDER_RADIUS = 12;
const LIST_GAP = 6;
const ITEM_GAP = 10;
const ITEM_BORDER_RADIUS = 8;

/**
 * ClinicMapList — комбинация карты + список клиник рядом.
 *
 * Карта (iframe) сверху, скrollable список клиник снизу.
 * Поддержка light/dark через Mantine theme colors.
 */
export function ClinicMapList({
  clinics,
  mapUrl,
  mapHeight = DEFAULT_MAP_HEIGHT,
  onClinicClick,
  showList = true,
}: ClinicMapListProps) {
  const theme = useMantineTheme();

  if (clinics.length === 0) {
    return (
      <Paper
        style={{
          borderRadius: MAP_BORDER_RADIUS,
          overflow: 'hidden',
          padding: theme.spacing.md,
          backgroundColor: theme.colors.gray[0],
        }}
      >
        <Flex
          justify="center"
          align="center"
          style={{ minHeight: '120px' }}
        >
          <MapPin
            size={24}
            style={{
              color: theme.colors.gray[4],
              marginBottom: theme.spacing.xs,
            }}
            aria-hidden
          />
          <Text c="dimmed" size="sm">
            Нет клиник
          </Text>
        </Flex>
      </Paper>
    );
  }

  return (
    <Paper
      style={{
        borderRadius: MAP_BORDER_RADIUS,
        overflow: 'hidden',
      }}
    >
      {/* Карта */}
      {mapUrl ? (
        <Box
          style={{
            borderRadius: `${MAP_BORDER_RADIUS}px ${MAP_BORDER_RADIUS}px 0 0`,
            overflow: 'hidden',
            height: mapHeight,
          }}
        >
          <iframe
            title="Карта клиник"
            src={mapUrl}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              display: 'block',
            }}
          />
        </Box>
      ) : null}

      {/* Список */}
      {showList ? (
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: LIST_GAP,
            padding: `0 ${theme.spacing.md}px ${theme.spacing.md}px`,
          }}
        >
          {clinics.map(clinic => (
            <Paper
              key={clinic.id}
              component="button"
              type="button"
              onClick={() => onClinicClick?.(clinic)}
              tabIndex={0}
              style={{
                display: 'flex',
                gap: ITEM_GAP,
                padding: '9px 12px',
                backgroundColor: theme.colors.gray[0],
                borderRadius: ITEM_BORDER_RADIUS,
                border: `1px solid ${theme.colors.gray[2] as unknown as string}`,
                cursor: onClinicClick ? 'pointer' : 'default',
                alignItems: 'flex-start',
                textAlign: 'left',
                width: '100%',
              }}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClinicClick?.(clinic);
                }
              }}
            >
              <MapPin
                size={14}
                style={{
                  color: theme.colors.teal[6],
                  flexShrink: 0,
                  marginTop: 2,
                }}
                aria-hidden
              />
              <Box style={{ minWidth: 0 }}>
                <Text
                  lineClamp={1}
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: theme.colors.dark[8],
                  }}
                >
                  {clinic.name}
                </Text>
                <Text
                  lineClamp={1}
                  style={{
                    fontSize: 11,
                    color: theme.colors.gray[6],
                  }}
                >
                  {clinic.address}
                </Text>
                {clinic.schedule ? (
                  <Text
                    lineClamp={1}
                    style={{
                      fontSize: 11,
                      color: theme.colors.gray[5],
                    }}
                  >
                    {clinic.schedule}
                  </Text>
                ) : null}
              </Box>
            </Paper>
          ))}
        </Box>
      ) : null}
    </Paper>
  );
}
