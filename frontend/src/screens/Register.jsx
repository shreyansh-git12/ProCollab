import { RegisterForm } from "@/components/register-form";

export default function RegisterPage() {
  return (
    <div className="dotted-bg flex min-h-screen flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-[600px] h-[560px] flex flex-col justify-center items-center gap-8 bg-[#f8fafc] dark:bg-[#020617] rounded-xl shadow-md transition-colors duration-300">
        <div className="w-full max-w-sm">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
