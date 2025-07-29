// src/components/add-paintings/FormHelp.tsx
import { Alert, AlertDescription } from "@/components/ui/alert";

export function FormHelp() {
  return (
    <Alert>
      <AlertDescription className="text-sm">
        <strong>Mẹo:</strong> Form sẽ tự động lưu nháp khi bạn nhập liệu. Hãy
        tải lên hình ảnh chất lượng cao để thu hút khách hàng.
      </AlertDescription>
    </Alert>
  );
}
