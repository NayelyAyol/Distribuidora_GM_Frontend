import { FiEdit2 } from "react-icons/fi"
import { MdFileUpload } from "react-icons/md"

export default function PedidoImagenForm({
    preview,
    fileInputRef,
    handleImagenChange
}) {

    return (

        <div className="space-y-4">

            <div>

                <h2 className="
                    text-lg
                    font-semibold
                    text-gray-800
                ">
                    Foto de la lista
                </h2>

                <p className="
                    text-sm
                    text-gray-500
                ">
                    Sube una imagen de la lista
                </p>

            </div>

            <div
                className="
                    relative
                    h-[260px]
                    md:h-[400px]
                    rounded-3xl
                    overflow-hidden
                    border-2
                    border-dashed
                    border-emerald-200
                    bg-emerald-50
                "
            >

                {preview && (

                    <button
                        type="button"
                        onClick={() =>
                            fileInputRef.current?.click()
                        }
                        className="
                            absolute
                            top-4
                            right-4
                            z-10
                            w-11
                            h-11
                            rounded-full
                            bg-white/90
                            backdrop-blur-md
                            shadow-lg
                            border border-gray-200
                            flex items-center
                            justify-center
                            hover:scale-105
                            hover:bg-emerald-50
                            transition
                        "
                    >

                        <FiEdit2
                            className="
                                text-emerald-700
                                text-lg
                            "
                        />

                    </button>

                )}

                <label
                    className="
                        flex
                        h-full
                        w-full
                        cursor-pointer
                        items-center
                        justify-center
                        hover:bg-emerald-100/40
                        transition
                    "
                >

                    {preview ? (

                        <img
                            src={preview}
                            alt="preview"
                            className="
                                w-full
                                h-full
                                object-contain
                                bg-white
                            "
                        />

                    ) : (

                        <div
                            className="
                                flex flex-col
                                items-center
                                justify-center
                            "
                        >

                            <div
                                className="
                                    w-24
                                    h-24
                                    rounded-full
                                    bg-emerald-100
                                    flex
                                    items-center
                                    justify-center
                                "
                            >

                                <MdFileUpload
                                    className="
                                        text-[60px]
                                        text-emerald-600
                                    "
                                />

                            </div>

                            <h3
                                className="
                                    mt-5
                                    text-lg
                                    font-semibold
                                    text-gray-800
                                "
                            >
                                Subir imagen
                            </h3>

                            <p
                                className="
                                    mt-2
                                    text-sm
                                    text-gray-500
                                "
                            >
                                JPG, PNG o JPEG
                            </p>

                        </div>

                    )}

                    <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImagenChange}
                        ref={fileInputRef}
                    />

                </label>

            </div>

        </div>
    )
}