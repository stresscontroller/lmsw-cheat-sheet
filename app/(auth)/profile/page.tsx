"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button, Input } from "@heroui/react";

import Loading from "@/components/loading";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/components/icons";
import { ShowAlert } from "@/components/alert";
import { useProfile } from '@/hooks/useProfile'

export default function Page() {
  const { loggedInUserInfo, loadingLoggedInUser } = useProfile()

  const errors: string[] = [];

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const [password, setPassword] = useState<string>("");
  const [saving, setSaving] = useState<boolean>(false);
  const [changing, setChanging] = useState<boolean>(false);
  if (password.length < 4) {
    errors.push("Password must be 4 characters or more.");
  }
  if ((password.match(/[A-Z]/g) || []).length < 1) {
    errors.push("Password must include at least 1 upper case letter");
  }
  if ((password.match(/[^a-z0-9]/gi) || []).length < 1) {
    errors.push("Password must include at least 1 symbol.");
  }

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    const formEntries = new FormData(e.currentTarget as HTMLFormElement);
    try {
      const data = {
        email: loggedInUserInfo?.email,
        firstName: formEntries.get("firstName") as string,
        lastName: formEntries.get("lastName") as string,
      };
      const res = await fetch("/api/auth/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch profile");
      }
      ShowAlert({
        message: "Updated your Profile.",
        type: "success",
      })
    } catch (err) {
      ShowAlert({
        message: "Failed to update profile.",
        type: "warning",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setChanging(true);
    const formEntries = new FormData(e.currentTarget as HTMLFormElement);

    try {
      const data = {
        email: loggedInUserInfo?.email,
        newPassword: formEntries.get("newPassword") as string,
      };
      const res = await fetch("/api/auth/set-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch profile");
      }
      ShowAlert({
        message: "Set your password.",
        type: "success",
      });
    } catch (err) {
      ShowAlert({
        message: "Failed to set password.",
        type: "warning",
      });
    } finally {
      setChanging(false);
    }
  };
  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setChanging(true);
    const formEntries = new FormData(e.currentTarget as HTMLFormElement);
    try {
      const data = {
        email: loggedInUserInfo?.email,
        newPassword: formEntries.get("newPassword") as string,
        oldPassword: formEntries.get("oldPassword") as string,
      };
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch profile");
      }
      ShowAlert({
        message: "Updated your password.",
        type: "success",
      });
    } catch (err) {
      ShowAlert({
        message: "Failed to change password.",
        type: "warning",
      });
    } finally {
      setChanging(false);
    }
  };

  if (loadingLoggedInUser) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-5 container-padding items-center min-h-full px-4 py-10">
      <div className="flex flex-col gap-10 max-w-[500px]">
        <div className="flex flex-col flex-wrap gap-8">
          <form className="flex flex-wrap gap-4" onSubmit={handleSave}>
            <h4 className="text-xl font-bold">Personal Info</h4>
            <div className="w-full">
              <Input
                isDisabled
                defaultValue={loggedInUserInfo?.email}
                label="Business Email Address"
                type="email"
              />
            </div>
            <div className="flex gap-3 w-full">
              <div className="w-6/12">
                <Input
                  name="firstName"
                  isRequired
                  defaultValue={loggedInUserInfo?.firstName}
                  label="First name"
                  type="text"
                />
              </div>
              <div className="w-6/12">
                <Input
                  name="lastName"
                  isRequired
                  defaultValue={loggedInUserInfo?.lastName}
                  label="Last name"
                  type="text"
                />
              </div>
            </div>
            <div className="flex justify-end w-full mt-5">
              <Button
                type="submit"
                radius="full"
                color="secondary"
                className="font-semibold"
              >
                {saving ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
          {loggedInUserInfo?.password === "" ? (
            <form className="flex flex-col gap-4" onSubmit={handleSetPassword}>
              <h4 className="text-xl font-bold">Set Password</h4>
              <div className="w-full">
                <Input
                  errorMessage={() => (
                    <ul>
                      {errors.map((error, i) => (
                        <li key={i}>{error}</li>
                      ))}
                    </ul>
                  )}
                  isInvalid={errors.length > 0}
                  onValueChange={setPassword}
                  endContent={
                    <button
                      aria-label="toggle password visibility"
                      className="focus:outline-none relative -top-[4px]"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  name="newPassword" size="sm" isRequired label="New Password" type={isVisible ? "text" : "password"}
                />
              </div>
              <div className="flex justify-end w-full mt-5">
                <Button
                  type="submit"
                  radius="full"
                  color="secondary"
                  className="font-semibold"
                >
                  {changing ? "Setting..." : "Set"}
                </Button>
              </div>
            </form>
          ) : (
            <form className="flex flex-col gap-4" onSubmit={handleChangePassword}>
              <h4 className="text-xl font-bold">Change Password</h4>
              <div className="w-full">
                <Input label="Old Password" type="password" name="oldPassword" size="sm" isRequired />
              </div>
              <div className="w-full">
                <Input
                  errorMessage={() => (
                    <ul>
                      {errors.map((error, i) => (
                        <li key={i}>{error}</li>
                      ))}
                    </ul>
                  )}
                  isInvalid={errors.length > 0}
                  onValueChange={setPassword}
                  endContent={
                    <button
                      aria-label="toggle password visibility"
                      className="focus:outline-none relative -top-[4px]"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  name="newPassword" size="sm" isRequired label="New Password" type={isVisible ? "text" : "password"}
                />
              </div>
              <div className="flex justify-end w-full mt-5">
                <Button
                  type="submit"
                  radius="full"
                  color="secondary"
                  className="font-semibold"
                >
                  {changing ? "Changing..." : "Change"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
