import { JSX } from "react";
import { Container } from "@/components/container";
import { Form } from "@/components/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CustomImage } from "@/components/customImage";
import { Header } from "@/components/header";
import { REGISTER_ROUTE } from "@/utils/routes";

export function LoginPage(): JSX.Element {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <Container>
        <Form customClass="min-w-96" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-5 text-center">
            <div className="flex flex-col items-center justify-between text-center">
              <CustomImage
                src="../../public/logo.png"
                alt="WildDex-Logo"
                className="w-20 h-20"
              />
              <Header
                header="Welcome Back to WildDex"
                subtext="Enter your details to continue"
              />
            </div>
            <Input
              placeholder="Enter your email address"
              type="email"
              label="Email"
              required
            />
            <Input
              placeholder="Enter your password"
              type="password"
              label="Password"
              required
            />
            <Button className="w-full bg-foreground">Sign In</Button>
            <p className="text-sm text-paragraph">
              Don't have an account?{" "}
              <a className="font-semibold" href={REGISTER_ROUTE}>
                Register
              </a>
            </p>
          </div>
        </Form>
      </Container>
    </div>
  );
}
