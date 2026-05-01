import type { IconReplacements } from 'json-edit-react';
import { Check, ChevronRight, Clipboard, Pencil, Plus, Trash2, X } from 'lucide-react';
import type { AprilJsonEditDensity } from './createAprilJsonEditTheme';

const stroke = 2;

export function createAprilJsonEditIcons(density: AprilJsonEditDensity): IconReplacements {
  const size = density === 'compact' ? 14 : 16;
  const style = { display: 'block' } as const;

  return {
    add: <Plus aria-hidden size={size} strokeWidth={stroke} style={style} />,
    edit: <Pencil aria-hidden size={size} strokeWidth={stroke} style={style} />,
    delete: <Trash2 aria-hidden size={size} strokeWidth={stroke} style={style} />,
    copy: <Clipboard aria-hidden size={size} strokeWidth={stroke} style={style} />,
    ok: <Check aria-hidden size={size} strokeWidth={stroke} style={style} />,
    cancel: <X aria-hidden size={size} strokeWidth={stroke} style={style} />,
    chevron: <ChevronRight aria-hidden size={size} strokeWidth={stroke} style={style} />,
  };
}
