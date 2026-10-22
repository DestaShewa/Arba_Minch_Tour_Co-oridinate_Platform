import React from "react";
import { CloudSun, Banknote, Backpack, ShieldCheck } from "lucide-react";

export const TripPreparationWidget: React.FC<{ packageName: string }> = ({ packageName }) => {
  return (
    <div className="bg-sand-50 border border-sand-300 rounded-2xl p-6 sm:p-8 space-y-6">
      <div className="space-y-1">
        <span className="text-xs font-bold uppercase tracking-wider text-accent">
          Local Knowledge
        </span>
        <h3 className="text-xl font-bold text-primary">
          Practical Preparation for {packageName}
        </h3>
        <p className="text-xs sm:text-sm text-charcoal-muted">
          Essential ground advice from AMX coordinators based in Arba Minch.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">
        {/* 1. Microclimate Warning */}
        <div className="p-4 bg-white rounded-xl border border-sand-200 space-y-2">
          <div className="flex items-center gap-2 font-bold text-charcoal">
            <CloudSun className="w-5 h-5 text-accent shrink-0" />
            <span>Contrasting Microclimates</span>
          </div>
          <p className="text-xs text-charcoal-muted leading-relaxed">
            Lake Chamo is warm, sunny, and humid (~28°C–32°C). In contrast, the Dorze highlands sit at 2,600m altitude and can drop below 14°C with sudden mountain mist. Pack both lightweight sun protection and a warm fleece jacket.
          </p>
        </div>

        {/* 2. Cash & ATM Logistics */}
        <div className="p-4 bg-white rounded-xl border border-sand-200 space-y-2">
          <div className="flex items-center gap-2 font-bold text-charcoal">
            <Banknote className="w-5 h-5 text-primary shrink-0" />
            <span>Cash & ATM Logistics</span>
          </div>
          <p className="text-xs text-charcoal-muted leading-relaxed">
            Reliable CBE, Dashen, and Awash ATMs are in <strong>Sikela</strong> (downtown) and <strong>Secha</strong> (upper town). Remote village artisan stalls and boat association dock checkpoints accept ETB cash only.
          </p>
        </div>

        {/* 3. Footwear & Gear */}
        <div className="p-4 bg-white rounded-xl border border-sand-200 space-y-2">
          <div className="flex items-center gap-2 font-bold text-charcoal">
            <Backpack className="w-5 h-5 text-secondary shrink-0" />
            <span>Footwear & Gear</span>
          </div>
          <p className="text-xs text-charcoal-muted leading-relaxed">
            Wear sturdy walking shoes with grip for unpaved bamboo garden paths. A telephoto zoom camera lens (70-300mm) is strongly recommended for photographing crocodiles and birds at safe distances from the boat.
          </p>
        </div>

        {/* 4. Cultural Etiquette */}
        <div className="p-4 bg-white rounded-xl border border-sand-200 space-y-2">
          <div className="flex items-center gap-2 font-bold text-charcoal">
            <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
            <span>Respectful Interaction</span>
          </div>
          <p className="text-xs text-charcoal-muted leading-relaxed">
            In Dorze and Chencha communities, your AMX guide facilitates genuine cultural exchange. Always ask permission before photographing individuals, particularly elders and active weavers.
          </p>
        </div>
      </div>
    </div>
  );
};