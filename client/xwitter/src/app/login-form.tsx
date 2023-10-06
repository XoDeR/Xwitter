"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

import type { Session } from "@supabase/auth-helpers-nextjs";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "sonner";

export default function LoginForm({ session }: { session: Session | null }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    router.refresh();

    console.log("sign up pressed");
  };

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
    router.refresh();

    console.log("sign in pressed");
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  // for the `session` to be available on first SSR render, it must be
  // fetched in a Server Component and passed down as a prop
  return session ? (
    <button onClick={handleSignOut}>Sign out</button>
  ) : (
    <>
      <Toaster />
      <Dialog open={true}>
        <DialogContent className="bg-black p-6">
          <h3 className="text-lg my-1 text-white">
            Please sign in to continue
          </h3>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setIsLoading(true);
              const { data, error } = await supabase
                .from("profiles")
                .select()
                .eq("username", username.trim());
              if (data && data?.length > 0) {
                console.log(data);
                return toast.error(
                  "username already exists, please use another"
                );
              }
              await supabase.auth.signInWithOtp({
                email: email.trim(),
                options: {
                  data: {
                    username,
                  },
                },
              });
              setIsLoading(false);
            }}
          >
            <Input
              type="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="text"
              placeholder="user name"
              min={3}
              onChange={(e) => setUsername(e.target.value)}
              className="my-2"
            />
            <p className="text-sm text-gray-200 my-2">
              you will receive a login magic link here!
            </p>
            <div className="flex w-full justify-end">
              <Button
                disabled={!isLoading}
                className="bg-white text-black hover:text-white hover:border-white"
              >
                Login
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <input
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        type="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button onClick={handleSignUp}>Sign up</button>
      <button onClick={handleSignIn}>Sign in</button>
    </>
  );
}
