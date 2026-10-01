"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { NormalizedItem } from "@/lib/sections";
import {
  COUNTRY_CODE_MAP,
  itemMatchesCountry,
  itemMatchesAnyCountry,
} from "@/lib/countryFilter";

function formatDate(d: string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function HomepageCountryPreview({
  pool,
  folder,
  badgeLabel,
  fallbackCountries,
  limit = 6,
}: {
  pool: NormalizedItem[];
  folder: string;
  badgeLabel: string;
  fallbackCountries?: string[];
  limit?: number;
}) {
  // Same default-to-Pakistan-then-geo-detect pattern as the /jobs/, /market/,
  // /workshop/ filter dropdowns (SectionHub), so a visitor's homepage
  // preview matches what they'd see if they clicked through to the full list.
  const [country, setCountry] = useState<string>("pakistan");
  const [fallbackActive, setFallbackActive] = useState<string[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("https://ipapi.co/json/")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled || !data?.country_code) return;
        const key = COUNTRY_CODE_MAP[data.country_code];
        if (key) {
          setCountry(key);
        } else if (fallbackCountries && fallbackCountries.length) {
          setFallbackActive(fallbackCountries);
        } else {
          setCountry("other");
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [fallbackCountries]);

  const items = useMemo(() => {
    const matched = fallbackActive
      ? pool.filter((item) => itemMatchesAnyCountry(item, fallbackActive))
      : pool.filter((item) => itemMatchesCountry(item, country));

    // If fewer than 3 match the visitor's country (small country, quiet
    // week, etc.), fill the rest with the newest unmatched items rather
    // than showing a near-empty homepage section.
    if (matched.length >= 3) return matched.slice(0, limit);
    const matchedIds = new Set(matched.map((i) => i.id));
    const filler = pool.filter((i) => !matchedIds.has(i.id));
    return [...matched, ...filler].slice(0, limit);
  }, [pool, country, fallbackActive, limit]);

  if (items.length === 0) {
    return <p className="text-sm text-slate-400">No listings yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => {
        const isWhatsApp = item.ctaHref?.includes("wa.me");
        const isMailto = item.ctaHref?.startsWith("mailto:");
        return (
          <div
            key={item.id}
            className="bg-white border border-slate-200/80 rounded-xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col"
          >
            <Link href={`/${folder}/${item.slug}/`} className="block p-5 pb-3 flex-1">
              <span className="px-2.5 py-1 bg-blue-50 text-adaBlue text-[9px] font-extrabold uppercase rounded-full tracking-wider">
                {badgeLabel}
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-2">
                {item.title}
              </h3>
              {item.subtitle && (
                <p className="text-xs text-slate-500 font-semibold mt-1">
                  {item.subtitle}
                </p>
              )}
              <p className="text-xs text-slate-400 mt-2 line-clamp-3">
                {item.summary}
              </p>
              <p className="text-[10px] text-slate-400 font-semibold mt-3">
                {formatDate(item.createdAt)}
              </p>
            </Link>
            {item.ctaHref && item.ctaLabel && (
              <div className="px-5 pb-5">
                <a
                  href={item.ctaHref}
                  {...(!isMailto && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-bold transition ${
                    isWhatsApp
                      ? "bg-emerald-50 hover:bg-emerald-100 text-emerald-600"
                      : "bg-adaBlue/10 hover:bg-adaBlue/20 text-adaBlue"
                  }`}
                >
                  {isWhatsApp && <i className="fa-brands fa-whatsapp" />}
                  {item.ctaLabel}
                </a>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
