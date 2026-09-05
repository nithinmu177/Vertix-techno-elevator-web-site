"use client";

import { useEffect, useState } from "react";

export default function MessagesPage() {
  const [items, setItems] = useState<any[]>([]);
  async function load(){const r=await fetch("/api/contact"); setItems(r.ok?await r.json():[])}
  useEffect(()=>{load()},[]);
  async function setStatus(id:string,status:string){await fetch("/api/contact",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({id,status})}); load();}
  return <section><h1 className="text-3xl font-black">Messages</h1><div className="mt-6 grid gap-4">{items.map(m=><article className="rounded-lg bg-white p-5" key={m.id}><div className="flex flex-wrap justify-between gap-3"><h2 className="font-black">{m.subject}</h2><select value={m.status} onChange={(e)=>setStatus(m.id,e.target.value)} className="rounded border p-2"><option>NEW</option><option>READ</option><option>REPLIED</option><option>ARCHIVED</option></select></div><p className="mt-2 text-sm font-bold">{m.name} · {m.email} · {m.phone}</p><p className="mt-3 text-[#56635d]">{m.message}</p></article>)}</div></section>
}
