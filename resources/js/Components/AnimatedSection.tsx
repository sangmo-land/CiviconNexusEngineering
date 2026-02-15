import { ReactNode, CSSProperties, ElementType } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

type AnimationVariant = 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale' | 'fade-down';

interface AnimatedSectionProps {
    children: ReactNode;
    className?: string;
    variant?: AnimationVariant;
    delay?: number;
    duration?: number;
    as?: ElementType;
}

const variantStyles: Record<AnimationVariant, { hidden: CSSProperties; visible: CSSProperties }> = {
    'fade-up': {
        hidden: { opacity: 0, transform: 'translateY(40px)' },
        visible: { opacity: 1, transform: 'translateY(0)' },
    },
    'fade-down': {
        hidden: { opacity: 0, transform: 'translateY(-40px)' },
        visible: { opacity: 1, transform: 'translateY(0)' },
    },
    'fade-in': {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    },
    'slide-left': {
        hidden: { opacity: 0, transform: 'translateX(-60px)' },
        visible: { opacity: 1, transform: 'translateX(0)' },
    },
    'slide-right': {
        hidden: { opacity: 0, transform: 'translateX(60px)' },
        visible: { opacity: 1, transform: 'translateX(0)' },
    },
    'scale': {
        hidden: { opacity: 0, transform: 'scale(0.9)' },
        visible: { opacity: 1, transform: 'scale(1)' },
    },
};

export default function AnimatedSection({
    children,
    className = '',
    variant = 'fade-up',
    delay = 0,
    duration = 700,
    as: Component = 'div',
}: AnimatedSectionProps) {
    const [ref, isVisible] = useScrollAnimation<HTMLDivElement>();
    const styles = variantStyles[variant];

    return (
        <Component
            ref={ref as any}
            className={className}
            style={{
                ...(isVisible ? styles.visible : styles.hidden),
                transition: `all ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
                willChange: 'opacity, transform',
            }}
        >
            {children}
        </Component>
    );
}
