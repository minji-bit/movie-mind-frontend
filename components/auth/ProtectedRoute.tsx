import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "../common/Loading";
export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, isInitializing } = useAuth();

  useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isInitializing, isAuthenticated, router]);
  if (isInitializing || !isAuthenticated) {
    return <Loading />;
  } //초기화가 완료되었지만 인증되지 않은 경우에는 children을 렌더링하지 않고 <Loading />을 렌더링하여 useEffect에서 로그인 페이지로 이동

  return <>{children}</>;
}
