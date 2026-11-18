interface PageHeaderProps {
    label: string;
    title: string;
    description: string;
}

export default function PageHeader({ label, title, description }: PageHeaderProps) {
    return (
        <section className="cn-page-header" aria-labelledby="page-title">
            <div className="container-custom">
                <p className="cn-kicker">{label}</p>
                <h1 id="page-title">{title}</h1>
                <p className="cn-page-description">{description}</p>
            </div>
        </section>
    );
}
