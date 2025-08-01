import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { UseFormReturn } from "react-hook-form";
import { AddPaintingsResponse } from "src/types/response/AddPaintingsResponse";
import { FormAddPaintings } from "src/types/ui/FormAddPaintings";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { CurrencyInput } from "../ui/currency-input";
import { Input } from "../ui/input";

interface PaintingBasicInfoProps {
  painting: AddPaintingsResponse;
  form: UseFormReturn<FormAddPaintings>;
  isSubmitting: boolean;
}
export function PaintingBasicInfo({
  painting,
  form,
  isSubmitting,
}: PaintingBasicInfoProps) {
  return (
    <Card className="border-0 shadow-none pb-0 mb-0">
      <CardContent className="space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full" />
          <h3 className="font-medium text-lg">Thông tin tranh</h3>
        </div>

        {/* Info fields */}
        <div className="space-y-4">
          <div>
            <Label className="text-sm text-muted-foreground">Mã tranh</Label>
            <p className="text-sm font-mono bg-muted px-2 py-1 rounded mt-1 inline-block">
              {painting.paintingId}
            </p>
          </div>

          <div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-muted-foreground">
                    Tên tranh:
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value}
                      onChange={field.onChange}
                      disabled={isSubmitting}
                      placeholder="Nhập tên tranh"
                    />
                  </FormControl>
                      <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-muted-foreground">
                    Mô tả chi tiết:
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value}
                      onChange={field.onChange}
                      disabled={isSubmitting}
                      placeholder="Nhập mô tả chi tiết"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
