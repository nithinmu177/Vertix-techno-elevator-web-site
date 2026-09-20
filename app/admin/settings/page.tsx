"use client";

import { useEffect, useState } from "react";
import { Loader2, Save, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const fields = [
  "companyName",
  "tagline",
  "description",
  "phone",
  "email",
  "address",
  "businessHours",
  "siteTitle",
  "metaDescription",
  "heroTitle",
  "heroSubtitle",
  "heroButton",
  "quoteButton",
  "footerDescription",
  "copyright",
];

const wideFields = new Set(["description", "address", "metaDescription", "footerDescription"]);

const fieldGroups = [
  { title: "Company Info", fields: ["companyName", "tagline", "description"] },
  { title: "Contact Details", fields: ["phone", "email", "address", "businessHours"] },
  { title: "SEO", fields: ["siteTitle", "metaDescription"] },
  { title: "Homepage", fields: ["heroTitle", "heroSubtitle", "heroButton", "quoteButton"] },
  { title: "Footer", fields: ["footerDescription", "copyright"] },
];

function flattenSettings(rows: Array<{ key: string; value: any }>) {
  const settings = Object.fromEntries(rows.map((row) => [row.key, row.value]));
  return {
    companyName: settings.general?.companyName ?? "Vertix Techno Elevators",
    tagline: settings.general?.tagline ?? "Engineering the way up.",
    description: settings.general?.description ?? "",
    phone: settings.contact?.phone ?? "",
    email: settings.contact?.email ?? "",
    address: settings.contact?.address ?? "",
    businessHours: settings.contact?.businessHours ?? "",
    siteTitle: settings.seo?.siteTitle ?? "Vertix Techno Elevators",
    metaDescription: settings.seo?.metaDescription ?? "",
    heroTitle: settings.homepage?.heroTitle ?? "ENGINEERING THE WAY UP.",
    heroSubtitle: settings.homepage?.heroSubtitle ?? "",
    heroButton: settings.homepage?.heroButton ?? "EXPLORE SOLUTIONS",
    quoteButton: settings.homepage?.quoteButton ?? "REQUEST A QUOTE",
    footerDescription: settings.footer?.description ?? "",
    copyright: settings.footer?.copyright ?? "",
  };
}

const fieldClass =
  "w-full rounded-xl border border-white/[0.08] bg-[#080c14] px-4 py-2.5 text-sm text-white placeholder:text-slate-600 outline-none transition focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/20";

export default function SettingsPage() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<{ text: string; ok: boolean } | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      setBusy(true);
      const response = await fetch("/api/settings");
      const rows = response.ok ? await response.json() : [];
      setValues(flattenSettings(rows));
      setBusy(false);
    }
    loadSettings();
  }, []);

  function update(name: string, value: string) {
    setValues((current) => ({ ...current, [name]: value }));
  }

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const payload = {
      general: { companyName: data.companyName, tagline: data.tagline, description: data.description },
      homepage: { heroTitle: data.heroTitle, heroSubtitle: data.heroSubtitle, heroButton: data.heroButton, quoteButton: data.quoteButton },
      contact: { phone: data.phone, email: data.email, address: data.address, businessHours: data.businessHours },
      seo: { siteTitle: data.siteTitle, metaDescription: data.metaDescription },
      footer: { description: data.footerDescription, copyright: data.copyright },
    };
    const response = await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json().catch(() => ({}));
    setStatus({
      text: response.ok ? "Settings saved successfully." : result.error || "Save failed. Please login again and try.",
      ok: response.ok,
    });
    setBusy(false);
  }

  return (
    <section className="grid gap-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#d4af37]">Website Control</p>
          <h1 className="mt-1 text-3xl font-black tracking-tight text-white">Site Settings</h1>
        </div>
        {busy && <Loader2 className="size-5 animate-spin text-[#d4af37]" />}
      </div>

      {/* Status */}
      {status && (
        <div className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-bold ${status.ok ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400" : "border-red-500/20 bg-red-500/10 text-red-400"}`}>
          {status.ok ? <CheckCircle2 className="size-4" /> : <AlertCircle className="size-4" />}
          {status.text}
        </div>
      )}

      <form onSubmit={save} className="grid gap-6">
        {fieldGroups.map((group) => (
          <div key={group.title} className="rounded-2xl border border-white/[0.06] bg-[#0c121e] p-6">
            <h2 className="mb-5 border-b border-white/[0.06] pb-4 text-xs font-black uppercase tracking-[0.2em] text-[#d4af37]">
              {group.title}
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {group.fields.map((name) => (
                <label
                  key={name}
                  className={`grid gap-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 ${wideFields.has(name) ? "md:col-span-2" : ""}`}
                >
                  <span>{name.replace(/([A-Z])/g, " $1").trim()}</span>
                  {wideFields.has(name) ? (
                    <textarea
                      className={`${fieldClass} min-h-20`}
                      name={name}
                      onChange={(event) => update(name, event.target.value)}
                      placeholder={name}
                      value={values[name] ?? ""}
                    />
                  ) : (
                    <input
                      className={fieldClass}
                      name={name}
                      onChange={(event) => update(name, event.target.value)}
                      placeholder={name}
                      value={values[name] ?? ""}
                    />
                  )}
                </label>
              ))}
            </div>
          </div>
        ))}

        <div className="flex items-center gap-4">
          <Button variant="gold" disabled={busy}>
            <Save className="size-4" /> Save All Settings
          </Button>
          {busy && <span className="text-xs text-slate-500">Saving…</span>}
        </div>
      </form>
    </section>
  );
}
