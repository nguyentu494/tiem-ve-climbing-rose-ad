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
import { ImageUpload } from "../ui/image-upload";

interface PaintingInfoProps {
  painting: AddPaintingsResponse;
  form: UseFormReturn<FormAddPaintings>;
  isSubmitting: boolean;
}
export function ImageUploadDetail({
  painting,
  form,
  isSubmitting,
}: PaintingInfoProps) {
  const imageUrl = form.watch("imageUrl");

  return (
    <Card className="border-0 shadow-none">
      <CardContent className="space-y-4">
        <Label className="text-sm text-muted-foreground">
          Hình ảnh tranh:
        </Label>

        <div className="space-y-4">
          <div>
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <ImageUpload
                        value={imageUrl}
                        onChange={field.onChange}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
