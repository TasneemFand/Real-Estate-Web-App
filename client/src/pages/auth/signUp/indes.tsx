import { useTranslation } from "react-i18next";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { useSignUp } from "../api/useSignUp";
import { Toaster, toast } from "react-hot-toast";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username has to be filled.",
  }),
  email: z
    .string()
    .min(1, { message: "Email has to be filled." })
    .email("This is not a valid email."),
  password: z
    .string()
    .min(8, { message: "Password has to be at least 8 characters." }),
});
export default function SignUp() {
  const { t } = useTranslation("auth");
  const handleSignUp = useSignUp();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await handleSignUp({ ...data });
      toast.success("Succesfully Registerd!");
    } catch {
      toast.error("Error Occured, please try again!");
    }
  };
  return (
    <div className="flex min-h-screen items-center bg-white">
      <div className="flex flex-1 flex-col items-center justify-center gap-8">
        <h1 className="text-4xl font-bold text-foreground">{t("welcomeTo")}</h1>
        <div className="flex w-[50%] flex-col gap-3">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col space-y-8"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="bg-primary px-4 py-3 text-white" type="submit">
                {t("signUp")}
              </Button>
            </form>
          </Form>
          <div className="flex items-center gap-1 self-center">
            <p className="text-sm text-secondary-foreground">
              {t("haveAccount")}
            </p>
            <Link className="text-sm font-medium text-primary" to={"/login"}>
              {t("signIn")}
            </Link>
          </div>
        </div>
      </div>
      <div className="image h-screen flex-1 max-md:hidden"></div>
      <Toaster />
    </div>
  );
}
