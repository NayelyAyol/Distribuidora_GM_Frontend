import LoginCard from "../components/LoginCard"
import {
    pageClass,
    containerClass,
    formContainerClass,
    imageWrapperClass,
} from "@/utils/styles"

export default function LoginPage() {

    const handleLogin = (data) => {
        console.log("Login:", data)
    }

    return (
        <div className={pageClass}>

            <div className={containerClass}>

                {/* FORM */}
                <div className={formContainerClass}>
                    <LoginCard onLogin={handleLogin} />
                </div>

                {/* IMAGE */}
                <div className={imageWrapperClass}>
                    <img
                        src="/ImgLogin.jpg"
                        alt="login"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>

            </div>
        </div>
    )
}