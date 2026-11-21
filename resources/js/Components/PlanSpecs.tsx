import type { HousePlan } from '@/types';

export const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(price);

export function PlanSpecs({ plan, large = false }: { plan: HousePlan; large?: boolean }) {
    const specs = [
        { label: 'Beds', value: plan.bedrooms },
        { label: 'Baths', value: plan.bathrooms },
        { label: plan.floors > 1 ? 'Floors' : 'Floor', value: plan.floors },
        { label: 'Sq ft', value: plan.area },
    ];
    return (
        <dl className={`plan-specs ${large ? 'plan-specs-lg' : ''}`}>
            {specs.map((s) => (
                <div key={s.label}>
                    <dd>{s.value}</dd>
                    <dt className="mono">{s.label}</dt>
                </div>
            ))}
        </dl>
    );
}
