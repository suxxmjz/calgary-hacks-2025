import { JSX } from "react";
import { Container } from "@/components/container";
import { Form } from "@/components/form";
import { Input } from "@/components/ui/input";

export function LoginPage(): JSX.Element {
  return (
    <div className="h-full flex items-center justify-center bg-slate-50">
      <Container>
        <Form
          header={{
            header: "Welcome Back!",
            subtext: "Enter your details to continue",
          }}
          customClass="w-300"
          onSubmit={(e) => e.preventDefault()}
        >
          <Input />
        </Form>
      </Container>
    </div>
  );
}
