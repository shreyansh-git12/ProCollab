import { LoginForm } from "@/components/login-form";
import { ModeToggle } from "@/components/mode-toggle";

export default function LoginPage() {
  return (
    <div className="dotted-bg flex min-h-screen flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-[600px] h-[560px] flex flex-col justify-center items-center gap-10 bg-[#f8fafc] dark:bg-[#020617]  transition-colors duration-300">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
