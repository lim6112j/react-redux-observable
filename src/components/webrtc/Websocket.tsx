import React from 'react';
import * as io from 'socket.io-client';

interface WSProps {
  socket: string,
  setSendMethod: Function,
  handleConnectionReady: Function,
  handleSocketConnection: Function,
  handleOffer: Function,
  handleAnswer: Function,
  handleIceCandidate: Function
}
const UUID = 'uuid';
const ICE_SERVERS: RTCIceServer[] = [
  {urls: 'stun:stun.l.google.com:19302'},
  // {urls: ['stun:stun.example.com', 'stun:stun-1.example.com']}
];
const PEER_CONNECTION_CONFIG: RTCConfiguration = {
  bundlePolicy: 'max-compat',
  rtcpMuxPolicy: 'negotiate',
  iceServers: ICE_SERVERS
};
let signalingSocketConnection: SocketIOClient.Socket;
let peerConnection: RTCPeerConnection;
const errorHandler = (error:any) => {
  console.log(error);
}
const errorHandler2 = (val: string, error:any) => {
  console.log(val, error);
}
const setupSignalServer = () => {
  signalingSocketConnection = io.connect('wss://localhost', {
    query: {
      token: 'uuid'
    }
  });
  signalingSocketConnection.on('message', getSignalMessageCallback());
}
const setupPeerServer = () => {
  peerConnection = new RTCPeerConnection(PEER_CONNECTION_CONFIG);
  peerConnection.onicecandidate = getIceCandidateCallback();
}
const setDescription = (string:any) => {
  return (description:any) => {
    peerConnection.setLocalDescription(description)
      .then(() => {
        signalingSocketConnection
        .emit('message', JSON.stringify({ 'sdp': peerConnection.localDescription, 'uuid': this.uuid }));
      })
      .catch(e => errorHandler2('error while setDescription', e));
  };
}
const getIceCandidateCallback = () => (val:any) => {
  return (event:any) => {
    // console.log(`got ice candidate:`);
    // console.log(event);

    if (event.candidate != null) {
      console.log(JSON.stringify({ 'ice': event.candidate, 'uuid': this.uuid }));
      signalingSocketConnection.emit('message', JSON.stringify({ 'ice': event.candidate, 'uuid': this.uuid }));
    }
  };
}
  /**
   * signal server callback
   */
  function getSignalMessageCallback(): (string:any) => void {
    return (message:any) => {
      // console.log('message !!!! => ');
      // console.log(message);
      const signal = JSON.parse(message);
      if (signal.uuid === UUID) {
        return;
      }

      // console.log('Received signal');
      // console.log(signal);

      if (signal.sdp) {
        peerConnection.setRemoteDescription(new RTCSessionDescription(signal.sdp))
          .then(() => {
            if (signal.sdp.type === 'offer') {
              peerConnection.createAnswer()
                .then(this.setDescription())
                .catch(this.errorHandler);
            }
          })
          .catch(e => this.errorHandler2('set remote description failed', e));
      } else if (signal.ice) {
        console.log('adding ice candidate!!!');
        peerConnection.addIceCandidate(new RTCIceCandidate(signal.ice)).catch(this.errorHandler);
      }
    };
  }

const Websocket:React.FC<WSProps> = ({ socket }) => {
  return <></>;
}

export default Websocket;