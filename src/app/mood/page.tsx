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
		<main className="min-h-screen flex flex-col items-center justify-center bg-[#f5f6fa]">
			<h1 className="text-2xl font-bold mb-6 text-[#222]">
				今日の気分を選んでください
			</h1>
			<div className="flex gap-8 mb-8">
				{moods.map((mood) => (
					<button
						key={mood.value}
						onClick={() => handleClick(mood.value)}
						className={`text-3xl w-16 h-16 rounded-full transition-all duration-200 cursor-pointer shadow-md border-2 flex items-center justify-center focus:outline-none aria-label:${mood.label} ${
							selected === mood.value
								? "bg-blue-500 text-white border-blue-500 shadow-lg"
								: "bg-white text-[#222] border-[#eee] hover:bg-blue-100"
						}`}
					>
						{mood.icon}
					</button>
				))}
			</div>
			{selected && (
				<div className="text-base text-[#555] mb-6">
					選択中:{" "}
					<b>{moods.find((m) => m.value === selected)?.label}</b>
				</div>
			)}
			{saved && (
				<div className="text-blue-500 font-bold text-base">保存しました！</div>
			)}
		</main>
	);
}
