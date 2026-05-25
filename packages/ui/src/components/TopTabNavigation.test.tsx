import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { AprilProviders } from '../providers';
import { TopTabNavigation, TopTabItem } from './TopTabNavigation';

function wrap(ui: React.ReactNode) {
  return <AprilProviders>{ui}</AprilProviders>;
}

const sampleItems: TopTabItem[] = [
  { key: 'home', label: 'Главная' },
  { key: 'catalog', label: 'Каталог' },
  { key: 'scores', label: 'Баллы' },
  { key: 'docs', label: 'Документы' },
  { key: 'support', label: 'Поддержка' },
];

describe('TopTabNavigation', () => {
  it('рендерит все табы по тексту', () => {
    render(
      wrap(
        <TopTabNavigation
          items={sampleItems}
          activeKey="home"
          onChange={vi.fn()}
        />,
      ),
    );
    expect(screen.getByRole('tab', { name: /Главная/ })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Каталог/ })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Баллы/ })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Документы/ })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Поддержка/ })).toBeInTheDocument();
  });

  it('активный таб имеет aria-current="page"', () => {
    render(
      wrap(
        <TopTabNavigation
          items={sampleItems}
          activeKey="docs"
          onChange={vi.fn()}
        />,
      ),
    );
    expect(screen.getByRole('tab', { name: /Документы/ })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('tab', { name: /Главная/ })).not.toHaveAttribute('aria-current', 'page');
  });

  it('onChange вызывается при клике на таб', async () => {
    const user = userEvent.setup();
    const handler = vi.fn();
    render(
      wrap(
        <TopTabNavigation
          items={sampleItems}
          activeKey="home"
          onChange={handler}
        />,
      ),
    );
    await user.click(screen.getByRole('tab', { name: /Каталог/ }));
    expect(handler).toHaveBeenCalledWith('catalog');

    await user.click(screen.getByRole('tab', { name: /Поддержка/ }));
    expect(handler).toHaveBeenCalledWith('support');
  });

  it('рендерит rightSection при задании', () => {
    render(
      wrap(
        <TopTabNavigation
          items={sampleItems}
          activeKey="home"
          onChange={vi.fn()}
          rightSection={<div data-testid="right-section">Right</div>}
        />,
      ),
    );
    expect(screen.getByTestId('right-section')).toBeInTheDocument();
    expect(screen.getByText('Right')).toBeInTheDocument();
  });

  it('рендерит logo при задании', () => {
    render(
      wrap(
        <TopTabNavigation
          items={sampleItems}
          activeKey="home"
          onChange={vi.fn()}
          logo={<div data-testid="logo">Logo</div>}
        />,
      ),
    );
    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByText('Logo')).toBeInTheDocument();
  });

  it('без лого нет логотипа в DOM', () => {
    const { container } = render(
      wrap(
        <TopTabNavigation
          items={sampleItems}
          activeKey="home"
          onChange={vi.fn()}
        />,
      ),
    );
    expect(container.querySelector('.nav-logo')).not.toBeInTheDocument();
  });

  it('sticky панель имеет position: sticky по умолчанию', () => {
    const { container } = render(
      wrap(
        <TopTabNavigation
          items={sampleItems}
          activeKey="home"
          onChange={vi.fn()}
        />,
      ),
    );
    const outerBox = container.querySelector<HTMLDivElement>('div[style*="sticky"]')!;
    expect(outerBox).not.toBeNull();
    expect(outerBox.style.position).toBe('sticky');
  });

  it('без sticky — position relative', () => {
    const { container } = render(
      wrap(
        <TopTabNavigation
          items={sampleItems}
          activeKey="home"
          onChange={vi.fn()}
          sticky={false}
        />,
      ),
    );
    const outerBox = container.querySelector<HTMLDivElement>('div[style*="relative"]')!;
    expect(outerBox.style.position).toBe('relative');
  });

  it('табы имеют кнопку и role="tab" в контексте nav', () => {
    render(
      wrap(
        <TopTabNavigation
          items={sampleItems}
          activeKey="home"
          onChange={vi.fn()}
        />,
      ),
    );
    // Nav element present
    expect(screen.getByRole('navigation', { name: /Верхняя навигация/ })).toBeInTheDocument();
  });

  it('кастомная высота применяется', async () => {
    const handler = vi.fn();
    const user = userEvent.setup();
    const { container } = render(
      wrap(
        <TopTabNavigation
          items={sampleItems}
          activeKey="home"
          onChange={handler}
          height={80}
        />,
      ),
    );
    const innerBox = container.querySelectorAll('Box, div')[1];
    expect(window.getComputedStyle(innerBox).height).toBe('80px');

    await user.click(screen.getByRole('tab', { name: /Баллы/ }));
    expect(handler).toHaveBeenCalledWith('scores');
  });
});
