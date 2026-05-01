import type { LucideIcon } from 'lucide-react';
import {
  AprilIconDashboard,
  AprilIconFolder,
  AprilIconUsers,
  AprilIconFileText,
  AprilIconSettings,
  AprilIconChevronRight,
  AprilIconChevronLeft,
  AprilIconPanelLeft,
  AprilIconSearch,
  AprilIconPlus,
  AprilIconPencil,
  AprilIconEdit,
  AprilIconTrash,
  AprilIconCopy,
  AprilIconMoreHorizontal,
  AprilIconRotateCcw,
  AprilIconSend,
  AprilIconCheck,
  AprilIconClose,
  AprilIconInfo,
  AprilIconSuccess,
  AprilIconWarning,
  AprilIconError,
  AprilIconBell,
  AprilIconHelp,
  AprilIconMessage,
  AprilIconMail,
  AprilIconLock,
  AprilIconClipboardList,
  AprilIconBraces,
  AprilIconCalendar,
  AprilIconLogOut,
  AprilIconUser,
  AprilIconSun,
  AprilIconMoon,
} from './aprilUiIcons';

export type AprilIconShowcaseItem = {
  /** Имя экспорта из `@april/ui` для копирования в код. */
  exportName: string;
  component: LucideIcon;
  hint: string;
};

export type AprilIconShowcaseGroup = {
  label: string;
  items: AprilIconShowcaseItem[];
};

export const aprilIconShowcaseGroups: AprilIconShowcaseGroup[] = [
  {
    label: 'Навигация и оболочка',
    items: [
      { exportName: 'AprilIconDashboard', component: AprilIconDashboard, hint: 'Главная, дашборд' },
      { exportName: 'AprilIconFolder', component: AprilIconFolder, hint: 'Раздел, проект' },
      { exportName: 'AprilIconUsers', component: AprilIconUsers, hint: 'Команда, HRM' },
      { exportName: 'AprilIconFileText', component: AprilIconFileText, hint: 'Документ' },
      { exportName: 'AprilIconSettings', component: AprilIconSettings, hint: 'Настройки' },
      { exportName: 'AprilIconChevronRight', component: AprilIconChevronRight, hint: 'Раскрыть, вперёд' },
      { exportName: 'AprilIconChevronLeft', component: AprilIconChevronLeft, hint: 'Назад, свернуть' },
      { exportName: 'AprilIconPanelLeft', component: AprilIconPanelLeft, hint: 'Боковая панель' },
    ],
  },
  {
    label: 'Действия',
    items: [
      { exportName: 'AprilIconSearch', component: AprilIconSearch, hint: 'Поиск' },
      { exportName: 'AprilIconPlus', component: AprilIconPlus, hint: 'Добавить' },
      { exportName: 'AprilIconPencil', component: AprilIconPencil, hint: 'Правка' },
      { exportName: 'AprilIconEdit', component: AprilIconEdit, hint: 'Редактировать (альтернатива)' },
      { exportName: 'AprilIconTrash', component: AprilIconTrash, hint: 'Удалить' },
      { exportName: 'AprilIconCopy', component: AprilIconCopy, hint: 'Копировать' },
      { exportName: 'AprilIconMoreHorizontal', component: AprilIconMoreHorizontal, hint: 'Ещё действия' },
      { exportName: 'AprilIconRotateCcw', component: AprilIconRotateCcw, hint: 'Сброс, отмена изменений' },
      { exportName: 'AprilIconSend', component: AprilIconSend, hint: 'Отправить' },
      { exportName: 'AprilIconCheck', component: AprilIconCheck, hint: 'Подтвердить, готово' },
      { exportName: 'AprilIconClose', component: AprilIconClose, hint: 'Закрыть, отмена' },
    ],
  },
  {
    label: 'Статусы и обратная связь',
    items: [
      { exportName: 'AprilIconInfo', component: AprilIconInfo, hint: 'Информация' },
      { exportName: 'AprilIconSuccess', component: AprilIconSuccess, hint: 'Успех' },
      { exportName: 'AprilIconWarning', component: AprilIconWarning, hint: 'Предупреждение' },
      { exportName: 'AprilIconError', component: AprilIconError, hint: 'Ошибка' },
      { exportName: 'AprilIconBell', component: AprilIconBell, hint: 'Уведомления' },
      { exportName: 'AprilIconHelp', component: AprilIconHelp, hint: 'Справка' },
      { exportName: 'AprilIconMessage', component: AprilIconMessage, hint: 'Сообщения, чат' },
    ],
  },
  {
    label: 'Формы и данные',
    items: [
      { exportName: 'AprilIconMail', component: AprilIconMail, hint: 'Почта' },
      { exportName: 'AprilIconLock', component: AprilIconLock, hint: 'Пароль, доступ' },
      { exportName: 'AprilIconClipboardList', component: AprilIconClipboardList, hint: 'Список, буфер' },
      { exportName: 'AprilIconBraces', component: AprilIconBraces, hint: 'JSON, структура' },
      { exportName: 'AprilIconCalendar', component: AprilIconCalendar, hint: 'Дата, срок' },
    ],
  },
  {
    label: 'Пользователь и тема',
    items: [
      { exportName: 'AprilIconUser', component: AprilIconUser, hint: 'Профиль' },
      { exportName: 'AprilIconLogOut', component: AprilIconLogOut, hint: 'Выход' },
      { exportName: 'AprilIconSun', component: AprilIconSun, hint: 'Светлая тема' },
      { exportName: 'AprilIconMoon', component: AprilIconMoon, hint: 'Тёмная тема' },
    ],
  },
];
