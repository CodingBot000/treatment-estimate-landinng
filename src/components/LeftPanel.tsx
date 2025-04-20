import Image from "next/image";

export default function LeftPanel() {
  return (
    <div className="pc-left-section flex flex-col items-center pt-20">
      <div className="max-w-[400px] flex flex-col items-center">
        <div className="w-full flex justify-center mb-6">
          <Image
            src="https://ext.same-assets.com/3640353240/849522504.png"
            alt="BeautyLink Logo"
            width={320}
            height={65}
            priority
          />
        </div>

        <h1 className="text-4xl font-bold text-beauty-darkPurple mb-8">Beauty Link</h1>

        <p className="text-center text-xl text-beauty-darkPurple mb-6">
          A premium anti-aging<br />
          aesthetic quote app for adults
        </p>

        <p className="text-center text-beauty-darkPurple mb-16">
          Receive personalized treatment quotes<br />
          directly from clinics with a single request!
        </p>

        <div className="flex flex-col items-center space-y-6">
          <div className="flex flex-col items-center">
            <span className="text-sm text-beauty-darkPurple mb-2">Download the app now</span>
            <div className="flex space-x-2">
              <a href="https://play.google.com/store/apps/details?id=com.nhn.android.search" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/google-play-button.png"
                  alt="Google Play"
                  width={225}
                  height={68}
                  className="h-[68px] w-auto"
                />
              </a>
              <a href="https://apps.apple.com/app/id6741161687" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/app-store-button.png"
                  alt="App Store"
                  width={225}
                  height={68}
                  className="h-[68px] w-auto"
                />
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-sm text-beauty-darkPurple mb-2">Download via QR Code</span>
            <Image
              src="/qr-code.png"
              alt="QR Code"
              width={150}
              height={150}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
