"use client";

import { useEffect, useState } from "react";

const statuses = ["NEW","CONTACTED","IN_PROGRESS","QUOTED","WON","CLOSED"];

export default function QuotesPage() {
  const [items, setItems] = useState<any[]>([]);
  async function load(){const r=await fetch("/api/quotes"); setItems(r.ok?await r.json():[])}
  useEffect(()=>{load()},[]);
  async function setStatus(id:string,status:string){await fetch("/api/quotes",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({id,status})}); load();}
  return <section><h1 className="text-3xl font-black">Quote Requests</h1><div className="mt-6 overflow-auto rounded-lg bg-white"><table className="w-full min-w-[900px] text-left text-sm"><thead className="bg-[#102019] text-white"><tr>{["Customer","Company","Phone","Email","Project","Location","Elevator","Date","Status"].map(h=><th className="p-3" key={h}>{h}</th>)}</tr></thead><tbody>{items.map(q=><tr className="border-t" key={q.id}><td className="p-3 font-bold">{q.name}</td><td>{q.company}</td><td>{q.phone}</td><td>{q.email}</td><td>{q.projectType}</td><td>{q.location}</td><td>{q.elevatorType}</td><td>{new Date(q.createdAt).toLocaleDateString()}</td><td><select value={q.status} onChange={(e)=>setStatus(q.id,e.target.value)} className="rounded border p-2">{statuses.map(s=><option key={s}>{s}</option>)}</select></td></tr>)}</tbody></table></div></section>
}
