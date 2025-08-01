// components/artwork-form/SpecificationsSection.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AddPaintingsResponse } from "src/types/response/AddPaintingsResponse";
import { CurrencyInput } from "../ui/currency-input";
import { SizeInput } from "../ui/size-input";

export default function SpecificationsDetail({
  form,
  isSubmitting,
}: {
  form: any;
  isSubmitting: boolean;
}) {
  return (
    <Card className="border-0 shadow-none pb-0 mb-0">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-orange-500 rounded-full" />
          <span>Thông số kỹ thuật</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kích thước</FormLabel>
              <FormControl>
                <SizeInput
                  value={field.value}
                  onChange={field.onChange}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormDescription>Kích thước thực tế của tác phẩm</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giá bán *</FormLabel>
                <FormControl>
                  <CurrencyInput
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isSubmitting}
                    placeholder="0"
                  />
                </FormControl>
                <FormDescription>Giá bán cho khách hàng</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số lượng *</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormDescription>Số lượng có sẵn</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
