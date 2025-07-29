import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ImageUpload } from "../ui/image-upload";

export default function ImageUploadSection({
  form,
  isSubmitting,
}: {
  form: any;
  isSubmitting: boolean;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <span>Hình ảnh</span>
        </CardTitle>
        <CardDescription>
          Tải lên hình ảnh chất lượng cao của tác phẩm
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ImageUpload
                  value={field.value}
                  onChange={field.onChange}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
