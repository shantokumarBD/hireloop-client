import Link from "next/link";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center space-y-4 max-w-md">
        <div className="w-14 h-14 rounded-2xl bg-rose-500/10 text-rose-500 border border-rose-500/20 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-7 h-7" />
        </div>
        <h1 className="text-2xl font-bold text-zinc-900">Access Denied</h1>
        <p className="text-sm text-zinc-500">
          You do not have the required permissions to view this page.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <Link href="/">
            <Button className="bg-[#5C53FE] hover:bg-[#4E45E8] text-white rounded-xl text-xs sm:text-sm px-4 py-2 cursor-pointer">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
