import React from 'react';
import DataRTC from './DataRTC';
import PeerConnection from './PeerConnection';
import Websocket from './Websocket';
interface containerProps {
  URL: string;
}
const RTCContainer: React.FC<containerProps> = ({ URL }) => {
  console.log('RTCContainer loading...')
  return (
    <>
    <Websocket 
      socket={this.socket}
      setSendMethod={this.setSendMethod}
      handleSocketConnection={this.handleSocketConnection}
      handleConnectionReady={this.handleConnectionReady}
      handleOffer={this.handleOffer}
      handleAnswer={this.handleAnswer}
      handleIceCandidate={this.handleIceCandidate}
    />
    <DataRTC url={URL} />
    <PeerConnection iceServers='{iceServers}' />
    </>
  );
}

export default RTCContainer;