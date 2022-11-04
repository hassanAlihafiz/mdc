import React, { useState } from "react";
import SettingSection from './setting/SettingSection'
import UpcomingSection from "./upcoming/UpcomingSection";
import FailedSection from "./failed/FailedSection";
import CurrentSection from "./current/CurrentSection";

export default function CurrentSubscriptionSubPage() {
  const [shouldLoad, setShouldLoad] = useState(true)

  return (
    <div>
      <SettingSection />
      <UpcomingSection 
        shouldLoad={shouldLoad}
        setShouldLoad={setShouldLoad}
      />
      <FailedSection 
        shouldLoad={shouldLoad}
        setShouldLoad={setShouldLoad}
      />
      <CurrentSection 
        shouldLoad={shouldLoad}
        setShouldLoad={setShouldLoad}
      />
    </div>
  );
}
