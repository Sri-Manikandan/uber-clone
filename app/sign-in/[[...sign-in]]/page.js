import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <>
      <div>
        <Image src='/banner.png' alt="banner" width={1100} height={1000}
				className="object-cover h-screen w-screen"/>
				<div className="absolute top-32 right-10">
					<SignIn />
				</div>
      </div>
    </>
  );
}