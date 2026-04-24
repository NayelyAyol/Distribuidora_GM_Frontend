import ResetPassword from "../components/ResetPasswordForm"
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
                    <ResetPassword />
                </div>

                <div className={imageWrapperClass}>
                    <img
                        src="/images/Login/ImgResetPassword.webp"
                        alt="reset-password"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>

            </div>
        </div>
    )
}