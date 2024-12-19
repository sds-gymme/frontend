import {
    StreamCall,
    StreamVideo,
    StreamVideoClient,
    User,
} from "@stream-io/video-react-native-sdk";
import { useEffect, useState } from "react";

const apiKey = "your-api-key";
const userId = "user-id";
const token = "authentication-token";
const callId = "my-call-id";
const user: User = { id: userId };

const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call("default", callId);
call.join({ create: true });

export default function App() {
    return (
        <StreamVideo client={client}>
            <StreamCall call={call}>{/* Your UI */}</StreamCall>
        </StreamVideo>
    );
}