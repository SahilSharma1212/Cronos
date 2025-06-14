import { Suspense } from "react";
import VerifyCodePage from "./verifyCodePage";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <VerifyCodePage />
    </Suspense>
  );
}
