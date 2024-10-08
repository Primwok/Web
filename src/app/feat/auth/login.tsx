import { useMeCustomer, useMedusa } from "medusa-react";
import * as zod from "zod";
import { Form, FormProvider, useForm } from "react-hook-form";
import { CInput, CPasswordInput } from "@/components/ui/custom/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const loginSchema = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});

type LoginInput = zod.infer<typeof loginSchema>;

const LoginCustomerForm = () => {
  const { client } = useMedusa();
  const { refetch: refetchCustomer, error } = useMeCustomer();
  const form = useForm<LoginInput>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async ({ email, password }: LoginInput) => {
    const response = await client.auth.authenticate({
      email,
      password,
    });

    if (response.customer) {
      refetchCustomer();
    }
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Login to your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <CInput name="email" label="Email" type="email" required />
              </div>

              <div className="space-y-1">
                <CPasswordInput name="password" label="Password" required />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit">
                {form.formState.isSubmitting ? "Loading..." : "Login"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </FormProvider>
  );
};

export default LoginCustomerForm;
