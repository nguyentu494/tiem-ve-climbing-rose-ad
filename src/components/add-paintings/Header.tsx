import { ArrowLeft, Palette } from "lucide-react";
import { Button } from "@/components/ui/button"; // Điều chỉnh đường dẫn theo project bạn
import { useRouter } from "next/navigation";

type PageHeaderProps = {
  lastSaved?: Date;
};

export default function PageHeader({ lastSaved }: PageHeaderProps) {
  const router = useRouter();

  return (
    <div className="mb-6">
      <div className="flex items-center mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/paintings")}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay lại
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <Palette className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold text-red-500">Thêm tranh mới</h1>
          </div>

          <p className="text-gray-600 mt-1">
            Tạo tác phẩm nghệ thuật mới trong bộ sưu tập
          </p>
        </div>

        {lastSaved && (
          <div className="text-sm text-muted-foreground">
            Đã lưu lúc {lastSaved.toLocaleTimeString("vi-VN")}
          </div>
        )}
      </div>
    </div>
  );
}
