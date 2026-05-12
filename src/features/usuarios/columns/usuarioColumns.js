export const usuarioColumns = (onRefresh, onToggleEstado) => [

    {
        accessorKey: "nombre",
        header: "Nombre"
    },

    {
        accessorKey: "apellido",
        header: "Apellido"
    },

    {
        accessorKey: "email",
        header: "Email"
    },

    {
        accessorKey: "cedula",
        header: "Cédula"
    },

    {
        accessorKey: "estado",
        header: "Estado",
        cell: ({ row }) => {

            const usuario = row.original

            const handleToggle = async (estado) => {
                await onToggleEstado(usuario, estado)
                await onRefresh()
            }

            return (
                <StatusBadge
                    estado={usuario.estado}
                    onToggle={handleToggle}
                />
            )
        }
    }
]