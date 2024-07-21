"use client"
import GoogleMapSection from "@/components/Home/GoogleMapSection";
import SearchSection from "@/components/Home/SearchSection";
import { DestinationContext } from "@/context/DestinationContext";
import { SourceContext } from "@/context/SourceContext";
import { useUser } from "@clerk/nextjs";
import { LoadScript } from "@react-google-maps/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
	const [source, setSource] = useState([]);
	const [destination, setDestination] = useState([]);
	const { isLoaded, isSignedIn } = useUser();
	const router = useRouter();

	useEffect(() => {
		if (isLoaded && !isSignedIn) {
		router.push('/sign-in');
		}
	}, [isLoaded, isSignedIn, router]);
	return (
		<SourceContext.Provider value={{source,setSource}}>
			<DestinationContext.Provider value={{destination,setDestination}}>
			<LoadScript libraries={['places']} googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
				<div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
					<div className="block md:hidden">
						<GoogleMapSection />
					</div>
					<div>
						<SearchSection />
					</div>
					<div className="hidden md:block md:col-span-2">
						<GoogleMapSection />
					</div>
				</div>
			</LoadScript>
			</DestinationContext.Provider>
		</SourceContext.Provider>
	);
}
