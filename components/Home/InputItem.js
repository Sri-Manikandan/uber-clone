"use client"
import { DestinationContext } from '@/context/DestinationContext';
import { SourceContext } from '@/context/SourceContext';
import Image from 'next/image'
import React, { useContext, useEffect } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'

const InputItem=({type}) => {
	const [value, setValue] = React.useState(null);
	const [placeholder, setPlaceholder] = React.useState(null);
	const {source, setSource} = useContext(SourceContext);
	const {destination, setDestination} = useContext(DestinationContext
		
	);


	useEffect(() => {
		type=='source'?setPlaceholder('Pickup Location'):setPlaceholder('Dropoff Location')
	},[]);

	const getLatAndLng = (place,type) =>{
		const placeId = place?.value.place_id;
		const service = new google.maps.places.PlacesService(document.createElement('div'))
		service.getDetails({placeId},(place,status)=>{
			if(status==='OK' && place.geometry && place.geometry.location){
				const lat = place.geometry.location.lat();
				const lng = place.geometry.location.lng();
				if(type=='source'){
					setSource({lat:lat,lng:lng,name:place.formatted_address,label:place.name})
				}else{
					setDestination({lat:lat,lng:lng,name:place.formatted_address,label:place.name})
				}
					
			}
		})
	}

	return (
		<div className='bg-slate-200 p-3 rounded-lg mt-3 flex items-center gap-4'>
			<Image src='/source.png' width={15} height={15}/>
			<GooglePlacesAutocomplete
				// apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
				selectProps={{
					value,
					onChange: (place)=>{getLatAndLng(place,type);setValue(place)},
					placeholder: placeholder,
					isClearable: true,
				className:'w-full',
				components:{
					DropdownIndicator:false
				},
				styles:{
					control:(provided)=>({
						...provided,
						backgroundColor:"#00ffff00",
						border:"none",
					}),
				}}}
			/>
		</div>
	)
}

export default InputItem