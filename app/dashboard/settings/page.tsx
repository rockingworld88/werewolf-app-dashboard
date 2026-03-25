import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

export default function SettingsPage() {
  return (
    <div className="grid gap-6">
      <Card className="bg-[var(--bg-soft)]">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">Settings</p>
        <h1 className="mt-2 text-3xl font-black text-[var(--text)]">Business placeholders</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--text-soft)]">
          This section is ready for future business settings such as support channels, brand data, and controlled messaging defaults.
        </p>
      </Card>

      <Card className="grid gap-5">
        <Input defaultValue="+1 (000) 000-0000" label="WhatsApp Number" />
        <Input defaultValue="support@werewolfalpha.com" label="Support Email" />
        <Textarea defaultValue="WEREWOLF ALPHA private rider operations." label="Branding Notes" />
      </Card>
    </div>
  );
}
