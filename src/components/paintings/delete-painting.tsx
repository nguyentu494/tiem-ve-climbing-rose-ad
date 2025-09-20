"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface DeletePaintingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  paintingName: string;
}

export function DeletePaintingDialog({
  isOpen,
  onClose,
  onConfirm,
  paintingName,
}: DeletePaintingDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <DialogTitle className="text-left">
                Xác nhận xóa tranh
              </DialogTitle>
              <DialogDescription className="text-left">
                Hành động này không thể hoàn tác
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            Bạn có chắc chắn muốn xóa danh mục{" "}
            <span className="font-semibold text-foreground">
              "{paintingName}"
            </span>{" "}
            không? Tất cả dữ liệu liên quan sẽ bị xóa vĩnh viễn.
          </p>
        </div>

        <DialogFooter className="flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="mt-3 sm:mt-0 bg-transparent"
          >
            Hủy bỏ
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Xóa tranh
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
