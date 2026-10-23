"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { PrimaryButton } from "@/components/ui/Button";
import { CalendarDays, CheckCircle2, Plus, Trash2 } from "lucide-react";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function ProviderAvailabilityPage() {
  const [activeDays, setActiveDays] = useState<string[]>(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]);
  const [blackoutDates, setBlackoutDates] = useState<string[]>(["2026-11-20", "2026-11-21"]);
  const [newBlackout, setNewBlackout] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const toggleDay = (day: string) => {
    setActiveDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);
  };

  const addBlackout = () => {
    if (newBlackout && !blackoutDates.includes(newBlackout)) {
      setBlackoutDates([...blackoutDates, newBlackout]);
      setNewBlackout("");
    }
  };

  const removeBlackout = (date: string) => {
    setBlackoutDates(blackoutDates.filter(d => d !== date));
  };

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-charcoal">Availability & Schedule Rules</h1>
        <p className="text-xs text-charcoal-muted mt-0.5">Control which days AMX coordinators can assign travelers to your service.</p>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-900 rounded-xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
          <span>Availability schedule updated and synchronized with coordinator desk.</span>
        </div>
      )}

      <Card className="p-6 bg-white border border-sand-300 space-y-6">
        <div className="space-y-3">
          <h2 className="text-base font-bold text-charcoal flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-primary" /> Regular Weekly Service Days
          </h2>
          <p className="text-xs text-charcoal-muted">Click to enable or disable days you are actively working in Arba Minch:</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {DAYS.map((day) => {
              const isEnabled = activeDays.includes(day);
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`tap-target p-3.5 rounded-xl border text-center transition-colors ${
                    isEnabled
                      ? "bg-primary-50 border-primary text-primary font-bold shadow-xs"
                      : "bg-sand-50 border-sand-300 text-charcoal-muted hover:bg-sand-100"
                  }`}
                >
                  <span className="text-sm block">{day}</span>
                  <span className="text-[10px] uppercase font-semibold">
                    {isEnabled ? "Available" : "Off Duty"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-4 pt-6 border-t border-sand-200">
          <h3 className="text-base font-bold text-charcoal">Blackout Dates / Scheduled Days Off</h3>
          <p className="text-xs text-charcoal-muted">Dates when your vehicle, boat, or service is unavailable for bookings:</p>

          <div className="flex gap-3 max-w-sm">
            <input
              type="date"
              value={newBlackout}
              onChange={(e) => setNewBlackout(e.target.value)}
              className="min-h-[44px] px-3.5 py-2 bg-white border border-sand-300 rounded-md text-xs text-charcoal flex-1"
            />
            <button
              type="button"
              onClick={addBlackout}
              className="tap-target px-4 bg-primary text-white rounded-md text-xs font-bold hover:bg-primary-700"
            >
              Add Date
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {blackoutDates.map((date) => (
              <span key={date} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-800 border border-red-200 text-xs font-semibold">
                <span>{date}</span>
                <button type="button" onClick={() => removeBlackout(date)} className="tap-target p-1 text-red-600 hover:text-red-900">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-sand-200">
          <PrimaryButton onClick={handleSave} className="font-bold">
            Save Schedule Rules
          </PrimaryButton>
        </div>
      </Card>
    </div>
  );
}