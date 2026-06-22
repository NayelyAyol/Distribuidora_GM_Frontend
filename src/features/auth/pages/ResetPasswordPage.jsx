import ResetPasswordUI from "../components/ResetPasswordForm"
import {
    pageClass,
    containerClass,
    formContainerClass,
    imageWrapperClass,
} from "@/utils/styles"

export default function ResetPasswordPage() {
    return (
        <div className={pageClass}>
            <div className={containerClass}>

                <div className={formContainerClass}>
                    <ResetPasswordUI />
                </div>

                <div className={imageWrapperClass}>
                    <img
                        src="/images/login/ImgResetPassword.webp"
                        alt="Restablecimiento de contraseña"
                        onError={(e) => {
                            e.currentTarget.src = "/images/categories/default.webp"
                        }}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>

            </div>
        </div>
    )
}