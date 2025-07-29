// components/artwork-form/BasicInfoSection.tsx
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function BasicInfoSection({ form }: { form: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full" />
          <span>Thông tin cơ bản</span>
        </CardTitle>
        <CardDescription>
          Thông tin chính về tác phẩm nghệ thuật
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên tranh *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nhập tên tranh"
                  {...field}
                  className="text-lg"
                />
              </FormControl>
              <FormDescription>Tên sẽ hiển thị cho khách hàng</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô tả chi tiết</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Mô tả về nguồn gốc, kỹ thuật, ý nghĩa của tác phẩm..."
                  className="min-h-[120px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Mô tả chi tiết giúp khách hàng hiểu rõ hơn về tác phẩm
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
