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
import { Link, useNavigate } from "react-router-dom";
import { useSignIn } from "../api/useSignIn";
import { Toaster, toast } from "react-hot-toast";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email has to be filled." })
    .email("This is not a valid email."),
  password: z
    .string()
    .min(8, { message: "Password has to be at least 8 characters." }),
});
export default function SignIn() {
  const navigate = useNavigate();
  const { t } = useTranslation("auth");
  const handleSignIn = useSignIn();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await handleSignIn({ ...data })
        .then((data) => {
          toast.success("Succesfully Logged!");
          document.cookie = `user=${data.authentication.sessionToken}; Secure`;
          navigate("/", { replace: true });
        })
        .catch((error) => {
          toast.error(error.response.data);
        });
    } catch {
      toast.error("Something went wrong!");
    }
  }
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
                {t("signIn")}
              </Button>
            </form>
          </Form>
          <div className="flex items-center gap-1 self-center">
            <p className="text-sm text-secondary-foreground">{t("dontHave")}</p>
            <Link className="text-sm font-medium text-primary" to={"/register"}>
              {t("signUp")}
            </Link>
          </div>
        </div>
      </div>
      <div className="image h-screen flex-1 max-md:hidden"></div>
      <Toaster />
    </div>
  );
}
