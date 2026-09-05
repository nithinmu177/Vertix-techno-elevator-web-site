"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const [status,setStatus]=useState("");
  async function save(e:React.FormEvent<HTMLFormElement>){e.preventDefault();const data=Object.fromEntries(new FormData(e.currentTarget));const payload={general:{companyName:data.companyName,tagline:data.tagline,description:data.description},homepage:{heroTitle:data.heroTitle,heroSubtitle:data.heroSubtitle,heroButton:data.heroButton,quoteButton:data.quoteButton},contact:{phone:data.phone,email:data.email,address:data.address,businessHours:data.businessHours},seo:{siteTitle:data.siteTitle,metaDescription:data.metaDescription},footer:{description:data.footerDescription,copyright:data.copyright}};const r=await fetch("/api/settings",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});setStatus(r.ok?"Settings saved.":"Save failed.");}
  return <section><h1 className="text-3xl font-black">Site Settings</h1><form onSubmit={save} className="mt-6 grid gap-4 rounded-lg bg-white p-5 md:grid-cols-2">{["companyName","tagline","description","phone","email","address","businessHours","siteTitle","metaDescription","heroTitle","heroSubtitle","heroButton","quoteButton","footerDescription","copyright"].map(n=><input className="rounded-lg border p-3" name={n} placeholder={n} key={n} />)}<Button>Save Settings</Button><p className="font-bold text-[#063f31]">{status}</p></form></section>
}
