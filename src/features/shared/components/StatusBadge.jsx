export default function StatusBadge({ label, isActivo, onToggle }) {
    const className = `
        px-3 py-1 rounded-full text-xs font-semibold transition
        ${isActivo 
            ? "bg-emerald-100 text-emerald-700" 
            : "bg-gray-200 text-gray-600"
        }
    `;

    if (onToggle) {
        return (
            <button onClick={onToggle} className={className}>
                {label}
            </button>
        );
    }

    return <span className={className}>{label}</span>;
}