import "expo-dev-client";
import React, { useState } from "react";
import { router } from "expo-router";
import AgoraUIKit, { AgoraUIKitProps } from "agora-rn-uikit";

const App = () => {
  const [videoCall, setVideoCall] = useState(true);
  const props: AgoraUIKitProps = {
    connectionData: {
      appId: "5174a666a50f45619981c7138b57e017",
      channel: "exercise",
    },
    rtcCallbacks: {
      EndCall: () => {
        setVideoCall(false);
        router.replace("/trainerHome")
      },
    },
  };

  return videoCall ? (
    <AgoraUIKit
      connectionData={props.connectionData}
      rtcCallbacks={props.rtcCallbacks}
    />
  ) : null;
};

export default App;
