import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useFetchProperties } from "../hooks/useFetchProperties";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { SelectCompo } from "./Select";
import { StatusFilter, TypeFilter } from "@/data/PropertyToolbarFilters";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCreateProperty } from "../actions/createProperty";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { TProperty } from "@/types/data";

export const formSchema = z.object({
  name: z.string().min(1, { message: "Name has to be filled." }),
  description: z.string().min(1, { message: "Description has to be filled." }),
  country: z.string().min(1, { message: "Country has to be filled." }),
  city: z.string().min(1, { message: "City has to be filled." }),
  address: z.string().min(1, { message: "Address has to be filled." }),
  Status: z.string().min(1, { message: "Status has to be filled." }),
  type: z.string().min(1, { message: "Type has to be filled." }),
  price: z.string().min(1, { message: "Price has to be filled." }),
  photo: z.any(),
});

export const CreatePropertyModal = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | undefined>();

  const handleClose = () => navigate("/property");
  const { t } = useTranslation("property");
  const { refetch } = useFetchProperties();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const { isLoading, handleCreateProperty } = useCreateProperty();

  const handleImageChange = (file: File | undefined) => {
    setFile(file);
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("file", file as File);
    formData.append("data", JSON.stringify(data));
    try {
      await handleCreateProperty({
        file: formData.get("file") as File,
        data: formData.get("data") as Partial<TProperty>,
      })
        .then(() => {
          toast.success("Succesfully Created!");
          handleClose();
          refetch();
        })
        .catch((error) => {
          toast.error(error.response.data);
        });
    } catch {
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <Dialog open={true} onOpenChange={handleClose}>
        <DialogContent className="h-full overflow-scroll bg-white p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-foreground">
              {t("CreateNewProperty")}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col space-y-8"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about the property"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <CountryDropdown
                        value={field.value}
                        onChange={field.onChange}
                        classes="selectCountry formSelect"
                        defaultOptionLabel={t("AllCountries")}
                        priorityOptions={["CA", "US", "GB"]}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <RegionDropdown
                        value={field.value}
                        onChange={field.onChange}
                        classes="selectCountry formSelect"
                        blankOptionLabel="No country selected"
                        defaultOptionLabel="Select region"
                        country={form.watch("country")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <SelectCompo
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder="Select a Status"
                      items={StatusFilter.slice(1, StatusFilter.length)}
                      form
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <SelectCompo
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder="Select a Type"
                      items={TypeFilter.slice(1, TypeFilter.length)}
                      form
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="photo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Photo</FormLabel>
                    <FormControl>
                      <input
                        name="photo"
                        type="file"
                        accept="image/*"
                        required
                        onChange={(e) => handleImageChange(e.target.files?.[0])}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="bg-primary px-4 py-3 text-white"
                type="submit"
                disabled={isLoading}
              >
                Submit
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <Toaster />
    </>
  );
};
