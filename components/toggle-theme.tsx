'use client';

import React from 'react';
import { MonitorCogIcon, MoonStarIcon, SunIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

const THEME_OPTIONS = [
	{
		icon: MonitorCogIcon,
		value: 'system',
	},
	{
		icon: SunIcon,
		value: 'light',
	},
	{
		icon: MoonStarIcon,
		value: 'dark',
	},
];

export function ToggleTheme() {
	const { theme, setTheme } = useTheme();

	const [isMounted, setIsMounted] = React.useState(false);

	React.useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return <div className="flex h-8 w-24" />;
	}

	return (
		<motion.div
			key={String(isMounted)}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3 }}
			className="bg-transparent inline-flex items-center"
			role="radiogroup"
		>
			{THEME_OPTIONS.map((option) => (
				<button
					key={option.value}
					className={cn(
						'relative flex size-8 cursor-pointer items-center justify-center rounded-md transition-all hover:bg-accent',
						theme === option.value
							? 'text-foreground bg-accent'
							: 'text-muted-foreground',
					)}
					role="radio"
					aria-checked={theme === option.value}
					aria-label={`Switch to ${option.value} theme`}
					onClick={() => setTheme(option.value)}
				>
					<option.icon className="size-4" />
				</button>
			))}
		</motion.div>
	);
}
