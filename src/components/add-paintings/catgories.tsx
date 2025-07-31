import { CategoryResponse } from "src/types/response/CategoryResponse";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";




export default function CategoriesSection({
  form,
  categories,
}: {
  form: any;
  categories: CategoryResponse[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full" />
          <span>Phân loại</span>
        </CardTitle>
        <CardDescription>
          Chọn danh mục phù hợp để khách hàng dễ tìm kiếm
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormField
          control={form.control}
          name="categoryIds"
          render={() => (
            <FormItem>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map((category) => (
                  <FormField
                    key={category.categoryId}
                    control={form.control}
                    name="categoryIds"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-accent/50 transition-colors">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(category.categoryId)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, category.categoryId])
                                : field.onChange(
                                    field.value?.filter(
                                      (value:string) => value !== category.categoryId
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-normal cursor-pointer">
                            {category.name}
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
