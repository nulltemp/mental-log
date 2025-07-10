"use client";
import { useState } from "react";

const moods = [
  { label: "とても良い", icon: "😄", value: "very_good" },
  { label: "良い", icon: "🙂", value: "good" },
  { label: "普通", icon: "😐", value: "normal" },
  { label: "悪い", icon: "😕", value: "bad" },
  { label: "とても悪い", icon: "😣", value: "very_bad" },
];

function getTodayKey() {
  const today = new Date();
  return `mood-${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
}

export default function MoodPage() {
  const [selected, setSelected] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(getTodayKey()) || "";
    }
    return "";
  });
  const [saved, setSaved] = useState(false);

  const handleClick = (value: string) => {
    setSelected(value);
    localStorage.setItem(getTodayKey(), value);
    setSaved(true);
    setTimeout(() => setSaved(false), 1200);
  };

  return (
    <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#f5f6fa" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1.5rem", color: "#222" }}>今日の気分を選んでください</h1>
      <div style={{ display: "flex", gap: "2rem", marginBottom: "2rem" }}>
        {moods.map((mood) => (
          <button
            key={mood.value}
            onClick={() => handleClick(mood.value)}
            style={{
              fontSize: "2.5rem",
              background: selected === mood.value ? "#4f8cff" : "#fff",
              color: selected === mood.value ? "#fff" : "#222",
              border: selected === mood.value ? "2px solid #4f8cff" : "2px solid #eee",
              borderRadius: "50%",
              width: 64,
              height: 64,
              cursor: "pointer",
              transition: "all 0.2s",
              boxShadow: selected === mood.value ? "0 4px 16px rgba(79,140,255,0.15)" : "0 2px 8px rgba(0,0,0,0.05)",
            }}
            aria-label={mood.label}
          >
            {mood.icon}
          </button>
        ))}
      </div>
      {selected && (
        <div style={{ fontSize: "1.1rem", color: "#555", marginBottom: "1.5rem" }}>
          選択中: <b>{moods.find((m) => m.value === selected)?.label}</b>
        </div>
      )}
      {saved && (
        <div style={{ color: "#4f8cff", fontWeight: "bold", fontSize: "1.1rem" }}>保存しました！</div>
      )}
    </main>
  );
}
