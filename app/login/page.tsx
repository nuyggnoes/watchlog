import { LoginForm } from "@/components/login-form"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SignupForm } from "@/components/signup-form"
import Link from "next/link"

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

      <div className="flex items-center my-8">
        <div className="flex-grow h-px bg-border"></div>
        <span className="px-3 text-muted-foreground text-sm">OR</span>
        <div className="flex-grow h-px bg-border"></div>
      </div>

      <div className="space-y-3">
        <Button variant="outline" className="w-full">
          Continue with Google
        </Button>
        <Button variant="outline" className="w-full">
          Continue with GitHub
        </Button>
      </div>

      <p className="text-center text-sm text-muted-foreground mt-8">
        By continuing, you agree to our{" "}
        <Link href="#" className="underline underline-offset-4 hover:text-primary">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="#" className="underline underline-offset-4 hover:text-primary">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  )
}
