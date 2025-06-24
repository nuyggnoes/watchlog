import { LoginForm } from "@/components/login-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignupForm } from "@/components/signup-form";

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto space-y-6 pt-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Welcome to WatchLog</h1>
        <p className="text-muted-foreground mt-2">Track, review, and discover your next favorite movie</p>
      </div>

      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="login" className="mt-6">
          <LoginForm />
        </TabsContent>
        <TabsContent value="signup" className="mt-6">
          <SignupForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
