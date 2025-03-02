import { LayoutProps } from "~/types/LayoutProps";

export default function AuthLayout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      {children}
    </div>
  );
}
