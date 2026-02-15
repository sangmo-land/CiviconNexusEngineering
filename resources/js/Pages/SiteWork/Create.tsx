import { Link, useForm, router } from "@inertiajs/react";
import SEOHead from '@/Components/SEOHead';
import Layout from "@/Layouts/Layout";
import AnimatedSection from "@/Components/AnimatedSection";
import { Meta } from "@/types";
import { FormEvent, useState, useRef, ChangeEvent } from "react";

interface Project {
    id: number;
    title: string;
    location: string;
}

interface Worker {
    worker_name: string;
    role: string;
    hours_worked: string;
    tasks_performed: string;
}

interface Material {
    material_name: string;
    quantity: string;
    unit: string;
    unit_cost: string;
    supplier: string;
    notes: string;
}

interface ImagePreview {
    file: File;
    preview: string;
    caption: string;
}

interface CreateProps {
    meta: Meta;
    project: Project;
}

const weatherOptions = [
    "Sunny",
    "Partly Cloudy",
    "Cloudy",
    "Light Rain",
    "Heavy Rain",
    "Windy",
    "Hot",
    "Cold",
];

const roleOptions = [
    "Mason",
    "Carpenter",
    "Electrician",
    "Plumber",
    "Laborer",
    "Foreman",
    "Engineer",
    "Welder",
    "Painter",
    "Other",
];

const unitOptions = [
    "bags",
    "tons",
    "kg",
    "cubic meters",
    "cubic feet",
    "pieces",
    "liters",
    "gallons",
    "meters",
    "feet",
    "sheets",
    "bundles",
    "rolls",
];

export default function Create({ meta, project }: CreateProps) {
    const [workers, setWorkers] = useState<Worker[]>([
        { worker_name: "", role: "", hours_worked: "", tasks_performed: "" },
    ]);
    const [materials, setMaterials] = useState<Material[]>([
        {
            material_name: "",
            quantity: "",
            unit: "bags",
            unit_cost: "",
            supplier: "",
            notes: "",
        },
    ]);
    const [images, setImages] = useState<ImagePreview[]>([]);
    const [processing, setProcessing] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, errors } = useForm({
        work_date: new Date().toISOString().split("T")[0],
        start_time: "08:00",
        end_time: "17:00",
        work_description: "",
        difficulties: "",
        weather_conditions: "",
        safety_notes: "",
        additional_notes: "",
        workers: [] as Worker[],
        materials: [] as Material[],
    });

    const addWorker = () => {
        setWorkers([
            ...workers,
            {
                worker_name: "",
                role: "",
                hours_worked: "",
                tasks_performed: "",
            },
        ]);
    };

    const removeWorker = (index: number) => {
        setWorkers(workers.filter((_, i) => i !== index));
    };

    const updateWorker = (
        index: number,
        field: keyof Worker,
        value: string,
    ) => {
        const updated = [...workers];
        updated[index][field] = value;
        setWorkers(updated);
    };

    const addMaterial = () => {
        setMaterials([
            ...materials,
            {
                material_name: "",
                quantity: "",
                unit: "bags",
                unit_cost: "",
                supplier: "",
                notes: "",
            },
        ]);
    };

    const removeMaterial = (index: number) => {
        setMaterials(materials.filter((_, i) => i !== index));
    };

    const updateMaterial = (
        index: number,
        field: keyof Material,
        value: string,
    ) => {
        const updated = [...materials];
        updated[index][field] = value;
        setMaterials(updated);
    };

    const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const newImages: ImagePreview[] = [];
        Array.from(files).forEach((file) => {
            if (file.type.startsWith("image/")) {
                newImages.push({
                    file,
                    preview: URL.createObjectURL(file),
                    caption: "",
                });
            }
        });
        setImages([...images, ...newImages]);

        // Reset input
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const removeImage = (index: number) => {
        const updated = [...images];
        URL.revokeObjectURL(updated[index].preview);
        updated.splice(index, 1);
        setImages(updated);
    };

    const updateImageCaption = (index: number, caption: string) => {
        const updated = [...images];
        updated[index].caption = caption;
        setImages(updated);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const filteredWorkers = workers.filter((w) => w.worker_name.trim());
        const filteredMaterials = materials.filter(
            (m) => m.material_name.trim(),
        );

        const formData = new FormData();
        formData.append("work_date", data.work_date);
        formData.append("start_time", data.start_time);
        formData.append("end_time", data.end_time);
        formData.append("work_description", data.work_description);
        formData.append("difficulties", data.difficulties);
        formData.append("weather_conditions", data.weather_conditions);
        formData.append("safety_notes", data.safety_notes);
        formData.append("additional_notes", data.additional_notes);

        // Add workers
        filteredWorkers.forEach((worker, index) => {
            formData.append(`workers[${index}][worker_name]`, worker.worker_name);
            formData.append(`workers[${index}][role]`, worker.role);
            formData.append(`workers[${index}][hours_worked]`, worker.hours_worked);
            formData.append(`workers[${index}][tasks_performed]`, worker.tasks_performed);
        });

        // Add materials
        filteredMaterials.forEach((material, index) => {
            formData.append(`materials[${index}][material_name]`, material.material_name);
            formData.append(`materials[${index}][quantity]`, material.quantity);
            formData.append(`materials[${index}][unit]`, material.unit);
            formData.append(`materials[${index}][unit_cost]`, material.unit_cost);
            formData.append(`materials[${index}][supplier]`, material.supplier);
            formData.append(`materials[${index}][notes]`, material.notes);
        });

        // Add images
        images.forEach((image, index) => {
            formData.append(`images[${index}]`, image.file);
            formData.append(`captions[${index}]`, image.caption);
        });

        setProcessing(true);
        router.post(`/site-work/project/${project.id}`, formData, {
            onFinish: () => setProcessing(false),
        });
    };

    return (
        <Layout>
            <SEOHead meta={meta} />

            {/* Hero Section */}
            <section className="relative pt-36 pb-12 md:pt-44 md:pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-brand-950" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.08),transparent_60%)]" />
                <div className="relative container-custom">
                    <AnimatedSection variant="fade-up">
                        <Link
                            href={`/site-work/project/${project.id}`}
                            className="inline-flex items-center gap-2 text-gray-400 hover:text-accent transition-colors mb-6"
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                            Back to {project.title}
                        </Link>
                        <h1 className="text-3xl sm:text-4xl font-display font-bold text-white">
                            New Work Log
                        </h1>
                        <p className="text-gray-400 mt-2">
                            Record today's site work activities
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Form */}
            <section className="py-12 md:py-16 bg-brand-950">
                <div className="container-custom max-w-4xl">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Basic Info */}
                        <AnimatedSection variant="fade-up">
                            <div className="card-modern rounded-2xl p-6 md:p-8">
                                <h2 className="text-xl font-display font-semibold text-white mb-6">
                                    Basic Information
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="label-modern">
                                            Date *
                                        </label>
                                        <input
                                            type="date"
                                            value={data.work_date}
                                            onChange={(e) =>
                                                setData(
                                                    "work_date",
                                                    e.target.value,
                                                )
                                            }
                                            className="input-modern w-full"
                                            required
                                        />
                                        {errors.work_date && (
                                            <p className="text-red-400 text-sm mt-1">
                                                {errors.work_date}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="label-modern">
                                            Weather
                                        </label>
                                        <select
                                            value={data.weather_conditions}
                                            onChange={(e) =>
                                                setData(
                                                    "weather_conditions",
                                                    e.target.value,
                                                )
                                            }
                                            className="input-modern w-full"
                                        >
                                            <option value="">
                                                Select weather...
                                            </option>
                                            {weatherOptions.map((weather) => (
                                                <option
                                                    key={weather}
                                                    value={weather}
                                                >
                                                    {weather}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="label-modern">
                                            Start Time
                                        </label>
                                        <input
                                            type="time"
                                            value={data.start_time}
                                            onChange={(e) =>
                                                setData(
                                                    "start_time",
                                                    e.target.value,
                                                )
                                            }
                                            className="input-modern w-full"
                                        />
                                    </div>
                                    <div>
                                        <label className="label-modern">
                                            End Time
                                        </label>
                                        <input
                                            type="time"
                                            value={data.end_time}
                                            onChange={(e) =>
                                                setData(
                                                    "end_time",
                                                    e.target.value,
                                                )
                                            }
                                            className="input-modern w-full"
                                        />
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>

                        {/* Work Description */}
                        <AnimatedSection variant="fade-up" delay={100}>
                            <div className="card-modern rounded-2xl p-6 md:p-8">
                                <h2 className="text-xl font-display font-semibold text-white mb-6">
                                    Work Description *
                                </h2>
                                <textarea
                                    value={data.work_description}
                                    onChange={(e) =>
                                        setData(
                                            "work_description",
                                            e.target.value,
                                        )
                                    }
                                    rows={5}
                                    className="input-modern w-full"
                                    placeholder="Describe what was done today..."
                                    required
                                />
                                {errors.work_description && (
                                    <p className="text-red-400 text-sm mt-1">
                                        {errors.work_description}
                                    </p>
                                )}
                            </div>
                        </AnimatedSection>

                        {/* Workers */}
                        <AnimatedSection variant="fade-up" delay={150}>
                            <div className="card-modern rounded-2xl p-6 md:p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-display font-semibold text-white">
                                        Workers
                                    </h2>
                                    <button
                                        type="button"
                                        onClick={addWorker}
                                        className="btn-secondary text-sm"
                                    >
                                        + Add Worker
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {workers.map((worker, index) => (
                                        <div
                                            key={index}
                                            className="p-4 bg-brand-900/50 rounded-xl border border-white/5"
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="text-sm font-medium text-gray-400">
                                                    Worker {index + 1}
                                                </span>
                                                {workers.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeWorker(index)
                                                        }
                                                        className="text-red-400 hover:text-red-300 text-sm"
                                                    >
                                                        Remove
                                                    </button>
                                                )}
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                                <div>
                                                    <label className="label-modern text-xs">
                                                        Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={
                                                            worker.worker_name
                                                        }
                                                        onChange={(e) =>
                                                            updateWorker(
                                                                index,
                                                                "worker_name",
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="input-modern w-full text-sm"
                                                        placeholder="Worker name"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="label-modern text-xs">
                                                        Role
                                                    </label>
                                                    <select
                                                        value={worker.role}
                                                        onChange={(e) =>
                                                            updateWorker(
                                                                index,
                                                                "role",
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="input-modern w-full text-sm"
                                                    >
                                                        <option value="">
                                                            Select role...
                                                        </option>
                                                        {roleOptions.map(
                                                            (role) => (
                                                                <option
                                                                    key={role}
                                                                    value={role}
                                                                >
                                                                    {role}
                                                                </option>
                                                            ),
                                                        )}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="label-modern text-xs">
                                                        Hours
                                                    </label>
                                                    <input
                                                        type="number"
                                                        step="0.5"
                                                        min="0"
                                                        value={
                                                            worker.hours_worked
                                                        }
                                                        onChange={(e) =>
                                                            updateWorker(
                                                                index,
                                                                "hours_worked",
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="input-modern w-full text-sm"
                                                        placeholder="8"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="label-modern text-xs">
                                                        Tasks
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={
                                                            worker.tasks_performed
                                                        }
                                                        onChange={(e) =>
                                                            updateWorker(
                                                                index,
                                                                "tasks_performed",
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="input-modern w-full text-sm"
                                                        placeholder="Tasks performed"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </AnimatedSection>

                        {/* Materials */}
                        <AnimatedSection variant="fade-up" delay={200}>
                            <div className="card-modern rounded-2xl p-6 md:p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-display font-semibold text-white">
                                        Materials Used
                                    </h2>
                                    <button
                                        type="button"
                                        onClick={addMaterial}
                                        className="btn-secondary text-sm"
                                    >
                                        + Add Material
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {materials.map((material, index) => (
                                        <div
                                            key={index}
                                            className="p-4 bg-brand-900/50 rounded-xl border border-white/5"
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="text-sm font-medium text-gray-400">
                                                    Material {index + 1}
                                                </span>
                                                {materials.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeMaterial(
                                                                index,
                                                            )
                                                        }
                                                        className="text-red-400 hover:text-red-300 text-sm"
                                                    >
                                                        Remove
                                                    </button>
                                                )}
                                            </div>
                                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                                <div className="col-span-2">
                                                    <label className="label-modern text-xs">
                                                        Material
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={
                                                            material.material_name
                                                        }
                                                        onChange={(e) =>
                                                            updateMaterial(
                                                                index,
                                                                "material_name",
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="input-modern w-full text-sm"
                                                        placeholder="e.g., Cement"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="label-modern text-xs">
                                                        Quantity
                                                    </label>
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        min="0"
                                                        value={
                                                            material.quantity
                                                        }
                                                        onChange={(e) =>
                                                            updateMaterial(
                                                                index,
                                                                "quantity",
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="input-modern w-full text-sm"
                                                        placeholder="10"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="label-modern text-xs">
                                                        Unit
                                                    </label>
                                                    <select
                                                        value={material.unit}
                                                        onChange={(e) =>
                                                            updateMaterial(
                                                                index,
                                                                "unit",
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="input-modern w-full text-sm"
                                                    >
                                                        {unitOptions.map(
                                                            (unit) => (
                                                                <option
                                                                    key={unit}
                                                                    value={unit}
                                                                >
                                                                    {unit}
                                                                </option>
                                                            ),
                                                        )}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="label-modern text-xs">
                                                        Unit Cost
                                                    </label>
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        min="0"
                                                        value={
                                                            material.unit_cost
                                                        }
                                                        onChange={(e) =>
                                                            updateMaterial(
                                                                index,
                                                                "unit_cost",
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="input-modern w-full text-sm"
                                                        placeholder="0.00"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="label-modern text-xs">
                                                        Supplier
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={
                                                            material.supplier
                                                        }
                                                        onChange={(e) =>
                                                            updateMaterial(
                                                                index,
                                                                "supplier",
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="input-modern w-full text-sm"
                                                        placeholder="Supplier"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </AnimatedSection>

                        {/* Difficulties & Notes */}
                        <AnimatedSection variant="fade-up" delay={250}>
                            <div className="card-modern rounded-2xl p-6 md:p-8">
                                <h2 className="text-xl font-display font-semibold text-white mb-6">
                                    Additional Information
                                </h2>
                                <div className="space-y-6">
                                    <div>
                                        <label className="label-modern">
                                            Difficulties Encountered
                                        </label>
                                        <textarea
                                            value={data.difficulties}
                                            onChange={(e) =>
                                                setData(
                                                    "difficulties",
                                                    e.target.value,
                                                )
                                            }
                                            rows={3}
                                            className="input-modern w-full"
                                            placeholder="Any challenges or problems faced..."
                                        />
                                    </div>
                                    <div>
                                        <label className="label-modern">
                                            Safety Notes
                                        </label>
                                        <textarea
                                            value={data.safety_notes}
                                            onChange={(e) =>
                                                setData(
                                                    "safety_notes",
                                                    e.target.value,
                                                )
                                            }
                                            rows={2}
                                            className="input-modern w-full"
                                            placeholder="Any safety concerns or incidents..."
                                        />
                                    </div>
                                    <div>
                                        <label className="label-modern">
                                            Additional Notes
                                        </label>
                                        <textarea
                                            value={data.additional_notes}
                                            onChange={(e) =>
                                                setData(
                                                    "additional_notes",
                                                    e.target.value,
                                                )
                                            }
                                            rows={2}
                                            className="input-modern w-full"
                                            placeholder="Any other relevant information..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>

                        {/* Work Images */}
                        <AnimatedSection variant="fade-up" delay={275}>
                            <div className="card-modern rounded-2xl p-6 md:p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-display font-semibold text-white">
                                        Work Images
                                    </h2>
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="btn-secondary text-sm"
                                    >
                                        <svg
                                            className="w-4 h-4 mr-2"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                        Add Images
                                    </button>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleImageSelect}
                                        className="hidden"
                                    />
                                </div>

                                {images.length === 0 ? (
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="border-2 border-dashed border-brand-700/50 rounded-xl p-8 text-center cursor-pointer hover:border-accent/50 transition-colors"
                                    >
                                        <svg
                                            className="w-12 h-12 mx-auto text-gray-500 mb-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                        <p className="text-gray-400 mb-2">
                                            Click to upload images of work done
                                        </p>
                                        <p className="text-gray-500 text-sm">
                                            Supports JPEG, PNG, GIF, WebP (max 5MB each)
                                        </p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {images.map((image, index) => (
                                            <div
                                                key={index}
                                                className="relative group"
                                            >
                                                <div className="aspect-square rounded-lg overflow-hidden bg-brand-800">
                                                    <img
                                                        src={image.preview}
                                                        alt={`Preview ${index + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute top-2 right-2 p-1.5 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <svg
                                                        className="w-4 h-4"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M6 18L18 6M6 6l12 12"
                                                        />
                                                    </svg>
                                                </button>
                                                <input
                                                    type="text"
                                                    value={image.caption}
                                                    onChange={(e) =>
                                                        updateImageCaption(index, e.target.value)
                                                    }
                                                    className="input-modern w-full text-sm mt-2"
                                                    placeholder="Caption (optional)"
                                                />
                                            </div>
                                        ))}
                                        <div
                                            onClick={() => fileInputRef.current?.click()}
                                            className="aspect-square border-2 border-dashed border-brand-700/50 rounded-lg flex items-center justify-center cursor-pointer hover:border-accent/50 transition-colors"
                                        >
                                            <div className="text-center">
                                                <svg
                                                    className="w-8 h-8 mx-auto text-gray-500 mb-2"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M12 4v16m8-8H4"
                                                    />
                                                </svg>
                                                <span className="text-gray-500 text-sm">Add More</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </AnimatedSection>

                        {/* Submit */}
                        <AnimatedSection variant="fade-up" delay={300}>
                            <div className="flex items-center justify-end gap-4">
                                <Link
                                    href={`/site-work/project/${project.id}`}
                                    className="btn-secondary"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="btn-primary"
                                >
                                    {processing
                                        ? "Saving..."
                                        : "Save Work Log"}
                                </button>
                            </div>
                        </AnimatedSection>
                    </form>
                </div>
            </section>
        </Layout>
    );
}
