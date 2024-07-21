import { Montserrat } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import { AmountProvider } from "@/context/AmountContext";
// import { useState } from "react";

const inter = Montserrat({ subsets: ["latin"] });

export const metadata = {
	title: "Uber Clone",
	description: "Taxi booking application",
};

export default function RootLayout({ children }) {
	
	return (
		<ClerkProvider>
			<AmountProvider>
				<html lang="en">
					<head>
						<link rel="icon" href="/favicon.png" sizes="any" />
					</head>
					<body className={inter.className}>
						<Header />
						{children}
					</body>
				</html>
			</AmountProvider>
		</ClerkProvider>
	);
}
