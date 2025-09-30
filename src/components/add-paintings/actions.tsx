// src/components/add-paintings/FormActions.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";

interface FormActionsProps {
  isSubmitting: boolean;
  onSubmit: () => void;
}

export function FormActions({
  isSubmitting,
  onSubmit,
}: FormActionsProps) {
  const router = useRouter();

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-3">
          <Button
            type="submit"
            onClick={() => onSubmit()}
            disabled={isSubmitting}
            className="w-full"
            size="lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Đang lưu...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Lưu tranh
              </>
            )}
          </Button>

          {/* <Button
            type="button"
            variant="outline"
            onClick={saveDraft}
            disabled={isDraft}
            className="w-full bg-transparent"
          >
            {isDraft ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Đang lưu nháp...
              </>
            ) : (
              "Lưu nháp"
            )}
          </Button> */}

          <Separator />

          <Button
            type="button"
            variant="ghost"
            onClick={() => router.push("/paintings")}
            className="w-full"
          >
            Hủy bỏ
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
