
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useShiftReportStore } from "@/lib/stores/shiftReportStore";
import { getShiftReportById } from "@/app/actions/shift-reports";
import { toast } from "sonner";

export default function EditReportLoader({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const hydrateDraft = useShiftReportStore((state) => state.hydrateDraft);

  useEffect(() => {
    const loadDraft = async () => {
      if (params.id) {
        const result = await getShiftReportById(params.id);
        if (result.ok && result.data) {
          hydrateDraft(result.data);
          toast.success("Draft loaded successfully.");
          router.push("/shift-reports/create"); // Redirect to the first step
        } else {
          toast.error(`Failed to load draft: ${result.error}`);
          router.push("/shift-reports"); // Redirect back to list on failure
        }
      }
    };
    loadDraft();
  }, [params.id, hydrateDraft, router]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <p className="text-lg animate-pulse">Loading draft...</p>
    </div>
  );
}
