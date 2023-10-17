import React from "react";
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt} from "@zegocloud/zego-uikit-prebuilt"

const RoomPage = () => {
    const {roomId} = useParams();
    const myMeeting = async (element) => {
        const appID = 1725068390;
        const serverSecret = "fd9d05e022a229517d6905d818aff694";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID,serverSecret, roomId, Date.now().toString(),
         "UserName" );
        const zc = ZegoUIKitPrebuilt.create(kitToken);
        zc.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: 'Copy Link',
                    url: `https://glopx.netlify.app/room/${roomId}`
                }
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.GroupCall,
            },
            showScreenSharingButton: true,
            showRemoveUserButton: true,
            showRoomTimer: true,
            whiteboardConfig: true,

        });

    }

    return <div>
        <div ref={myMeeting}/>
    </div>;
};

export default RoomPage;
