"use client";

import { useState } from "react";
import clsx from "clsx";
import CustomSelect from "./CustomSelect";
import DatePicker from "./DatePicker";
import MagneticButton from "@/components/MagneticButton";

const SERVICES = [
  "Web Experience",
  "Product & UI Design",
  "Creative Development",
  "Motion & Direction",
  "Something else entirely",
];

const BUDGETS = ["< $2k", "$2k – $5k", "$5k – $10k", "$10k+", "Let's discuss"];

type Status = "idle" | "sending" | "sent";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState<string | null>(null);
  const [budget, setBudget] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const inputClass =
    "w-full rounded-xl border border-paper/15 bg-paper/5 px-4 py-3.5 text-sm text-paper placeholder:text-mist outline-none transition-colors duration-300 hover:border-paper/30 focus:border-paper/50 focus:bg-paper/10";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("sending");
    // demo submission — wire to an API route / Composio later
    setTimeout(() => {
      setStatus("sent");
      setTimeout(() => {
        setStatus("idle");
        setName("");
        setEmail("");
        setService(null);
        setBudget(null);
        setDate(null);
        setMessage("");
      }, 3500);
    }, 1400);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="glass grain grain-static relative overflow-hidden rounded-3xl p-6 md:p-9"
    >
      <div className="relative z-10 flex flex-col gap-6">
        <div className="grid gap-6 md:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-[10px] tracking-[0.3em] text-mist uppercase">
              Your name
            </span>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-[10px] tracking-[0.3em] text-mist uppercase">
              Email
            </span>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@studio.com"
              className={inputClass}
            />
          </label>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <CustomSelect
            label="Service"
            placeholder="What do you need?"
            options={SERVICES}
            value={service}
            onChange={setService}
          />
          <CustomSelect
            label="Budget"
            placeholder="Rough budget"
            options={BUDGETS}
            value={budget}
            onChange={setBudget}
          />
        </div>

        <DatePicker
          label="Ideal start date"
          placeholder="Pick a date"
          value={date}
          onChange={setDate}
        />

        <label className="flex flex-col gap-2">
          <span className="text-[10px] tracking-[0.3em] text-mist uppercase">
            Project details
          </span>
          <textarea
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell me about your project, goals, timeline…"
            rows={5}
            className={clsx(inputClass, "resize-none")}
          />
        </label>

        <MagneticButton className="self-start">
          <button
            type="submit"
            disabled={status !== "idle"}
            className={clsx(
              "inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm tracking-wide transition-all duration-300",
              status === "sent"
                ? "bg-paper text-ink"
                : "glass-strong hover:bg-paper hover:text-ink",
            )}
          >
            {status === "idle" && (
              <>
                Send message <span aria-hidden>→</span>
              </>
            )}
            {status === "sending" && (
              <>
                Sending
                <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border border-current border-t-transparent" />
              </>
            )}
            {status === "sent" && (
              <>
                Message sent — talk soon <span aria-hidden>✓</span>
              </>
            )}
          </button>
        </MagneticButton>
      </div>
    </form>
  );
}
