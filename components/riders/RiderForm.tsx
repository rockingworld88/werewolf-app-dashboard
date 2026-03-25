"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { RiderProfile } from "@/types/rider";

type FieldErrors = Partial<Record<"full_name" | "username" | "email" | "temporary_password" | "bike_name" | "bike_model" | "role" | "membership_status", string[]>>;

export function RiderForm({
  action,
  rider,
  submitLabel,
  includePassword = false,
}: {
  action: string;
  rider?: Partial<RiderProfile> & { login_email?: string };
  submitLabel: string;
  includePassword?: boolean;
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const defaultValues = useMemo(
    () => ({
      full_name: rider?.full_name ?? "",
      username: rider?.username ?? "",
      email: rider?.login_email ?? "",
      bike_name: rider?.bike_name ?? "",
      bike_model: rider?.bike_model ?? "",
      role: rider?.role ?? "rider",
      membership_status: rider?.membership_status ?? "active",
    }),
    [rider],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setFormError(null);
    setFieldErrors({});

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch(action, {
        method: "POST",
        body: formData,
      });

      const isJson = response.headers.get("content-type")?.includes("application/json");
      const payload = isJson ? await response.json() : null;

      if (!response.ok) {
        if (payload?.error?.fieldErrors) {
          setFieldErrors(payload.error.fieldErrors as FieldErrors);
        }

        setFormError(payload?.error?.message ?? payload?.error ?? "Unable to save the rider right now.");
        return;
      }

      router.push(payload?.redirectTo ?? "/dashboard/riders");
      router.refresh();
    } catch {
      setFormError("Network issue detected. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="grid gap-5" method="post" onSubmit={handleSubmit}>
      {formError ? (
        <div className="rounded-2xl border border-[var(--danger)]/30 bg-[var(--danger)]/10 px-4 py-3 text-sm text-[var(--danger)]">
          {formError}
        </div>
      ) : null}
      <div className="grid gap-5 md:grid-cols-2">
        <Input defaultValue={defaultValues.full_name} error={fieldErrors.full_name?.[0]} label="Full Name" name="full_name" required />
        <Input defaultValue={defaultValues.username} error={fieldErrors.username?.[0]} label="Username" name="username" required />
        <Input defaultValue={defaultValues.email} error={fieldErrors.email?.[0]} label="Email" name="email" required type="email" />
        {includePassword ? (
          <Input
            error={fieldErrors.temporary_password?.[0]}
            label="Temporary Password"
            name="temporary_password"
            required
            type="password"
          />
        ) : null}
        <Input defaultValue={defaultValues.bike_name} error={fieldErrors.bike_name?.[0]} label="Bike Name" name="bike_name" />
        <Input defaultValue={defaultValues.bike_model} error={fieldErrors.bike_model?.[0]} label="Bike Model" name="bike_model" />
        <Select
          defaultValue={defaultValues.role}
          error={fieldErrors.role?.[0]}
          label="Role"
          name="role"
          options={[
            { label: "Rider", value: "rider" },
            { label: "Admin", value: "admin" },
          ]}
        />
        <Select
          defaultValue={defaultValues.membership_status}
          error={fieldErrors.membership_status?.[0]}
          label="Membership Status"
          name="membership_status"
          options={[
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" },
            { label: "Suspended", value: "suspended" },
          ]}
        />
      </div>
      {rider?.id ? <input name="id" type="hidden" value={rider.id} /> : null}
      <div className="flex justify-end">
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
