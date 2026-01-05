import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignInForm from "./components/sign-in-form";
import SignUpForm from "./components/sign-up-form";
import Header from "@/components/common/header";

const Authentication = async () => {
  return (
    <>
      <Header />

      <div className="flex w-full flex-col gap-6 p-5 md:p-8 lg:p-12">
        <div className="max-w-md mx-auto w-full md:max-w-lg lg:max-w-xl">
          <Tabs defaultValue="sign-in">
            <TabsList className="w-full md:grid md:grid-cols-2">
              <TabsTrigger value="sign-in" className="md:text-base">Entrar</TabsTrigger>
              <TabsTrigger value="sign-up" className="md:text-base">Criar conta</TabsTrigger>
            </TabsList>
            <TabsContent value="sign-in" className="mt-6">
              <SignInForm />
            </TabsContent>
            <TabsContent value="sign-up" className="mt-6">
              <SignUpForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Authentication;
