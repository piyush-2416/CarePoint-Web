  
 import { FaPhone, FaPhoneSlash, FaAmbulance, FaMicrophoneSlash, FaVolumeUp, FaPause } from "react-icons/fa";
import "./FakeCall.css";
 import React, { useState, useEffect, useRef } from "react";
const RINGTONE_URL = "/ringtone.mp3";
 function Login() {
 const [delaySeconds, setDelaySeconds] = useState(5);
  const [countdown, setCountdown] = useState(0);
  const [callState, setCallState] = useState("idle"); // idle | scheduled | ringing | connected | ended
  const [callDuration, setCallDuration] = useState(0);
  const audioRef = useRef(null);
  const timerRef = useRef(null);
  const countdownIntervalRef = useRef(null);
  const durationRef = useRef(null);
 
  const callerInfo = {
    name: "Emergency Helpline",
    number: "+91 108",
    subtitle: "Ambulance Service",
  };
 
  // Trigger the fake call after the chosen delay
  const startFakeCall = () => {
    setCallState("scheduled");
    setCountdown(delaySeconds);
 
    clearInterval(countdownIntervalRef.current);
    countdownIntervalRef.current = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
 
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      clearInterval(countdownIntervalRef.current);
      setCallState("ringing");
    }, delaySeconds * 1000);
  };
 
  const cancelScheduledCall = () => {
    clearTimeout(timerRef.current);
    clearInterval(countdownIntervalRef.current);
    setCallState("idle");
  };
 
  // Handle ringtone + vibration when call starts ringing
  useEffect(() => {
    if (callState === "ringing") {
      if (audioRef.current) {
        audioRef.current.loop = true;
        audioRef.current.play().catch(() => {
          // Autoplay might be blocked until user interacts; that's fine.
        });
      }
      if (navigator.vibrate) {
        navigator.vibrate([500, 300, 500, 300, 500]);
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      if (navigator.vibrate) {
        navigator.vibrate(0);
      }
    }
  }, [callState]);
 
  // Handle the "connected" call duration timer
  useEffect(() => {
    if (callState === "connected") {
      setCallDuration(0);
      durationRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(durationRef.current);
    }
    return () => clearInterval(durationRef.current);
  }, [callState]);
 
  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
      clearInterval(durationRef.current);
      clearInterval(countdownIntervalRef.current);
    };
  }, []);
 
  const formatDuration = (secs) => {
    const m = String(Math.floor(secs / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    return `${m}:${s}`;
  };
 
  const handleAccept = () => setCallState("connected");
  const handleDecline = () => setCallState("ended");
  const handleEndCall = () => setCallState("ended");
   return (
     <div>
         <div className="fc-wrapper">
      <audio ref={audioRef} src={RINGTONE_URL} preload="auto" />
 
      {/* ============ Trigger Panel (normal page UI) ============ */}
      {callState === "idle" && (
        <div className="fc-trigger-panel">
          <h3>Fake Emergency Call</h3>
          <p>Ek scheduled samay baad screen par fake incoming call dikhayi degi.</p>
 
          <label className="fc-delay-label">
            Delay (seconds):
            <input
              type="number"
              min="1"
              max="120"
              value={delaySeconds}
              onChange={(e) => setDelaySeconds(Number(e.target.value))}
            />
          </label>
 
          <button className="fc-trigger-btn" onClick={startFakeCall}>
            <FaAmbulance /> Schedule Fake Call
          </button>
        </div>
      )}
 
      {/* ============ Scheduled / Countdown Panel ============ */}
      {callState === "scheduled" && (
        <div className="fc-trigger-panel">
          <h3>Fake Call Scheduled</h3>
          <p className="fc-countdown-text">
            Call {countdown} second{countdown !== 1 ? "s" : ""} mein aayegi...
          </p>
          <button className="fc-cancel-btn" onClick={cancelScheduledCall}>
            Cancel Scheduled Call
          </button>
        </div>
      )}
 
      {/* ============ Ringing Screen ============ */}
      {callState === "ringing" && (
        <div className="fc-overlay">
          <div className="fc-call-screen">
            <p className="fc-status">Incoming Call...</p>
            <div className="fc-avatar">
              <FaAmbulance />
            </div>
            <h2 className="fc-caller-name">{callerInfo.name}</h2>
            <p className="fc-caller-number">{callerInfo.number}</p>
            <p className="fc-caller-subtitle">{callerInfo.subtitle}</p>
 
            <div className="fc-actions">
              <button className="fc-btn fc-decline" onClick={handleDecline}>
                <FaPhoneSlash />
              </button>
              <button className="fc-btn fc-accept" onClick={handleAccept}>
                <FaPhone />
              </button>
            </div>
            <div className="fc-actions-label">
              <span>Decline</span>
              <span>Accept</span>
            </div>
          </div>
        </div>
      )}
 
      {/* ============ Connected Call Screen ============ */}
      {callState === "connected" && (
        <div className="fc-overlay fc-overlay-connected">
          <div className="fc-call-screen">
            <div className="fc-avatar fc-avatar-small">
              <FaAmbulance />
            </div>
            <h2 className="fc-caller-name">{callerInfo.name}</h2>
            <p className="fc-call-timer">{formatDuration(callDuration)}</p>
 
            <div className="fc-mid-actions">
              <div className="fc-mini-btn">
                <FaMicrophoneSlash />
                <span>Mute</span>
              </div>
              <div className="fc-mini-btn">
                <FaVolumeUp />
                <span>Speaker</span>
              </div>
              <div className="fc-mini-btn">
                <FaPause />
                <span>Hold</span>
              </div>
            </div>
 
            <button className="fc-btn fc-end" onClick={handleEndCall}>
              <FaPhoneSlash />
            </button>
            <span className="fc-end-label">End Call</span>
          </div>
        </div>
      )}
 
      {/* ============ Ended Screen ============ */}
      {callState === "ended" && (
        <div className="fc-ended-panel">
          <p>Call ended.</p>
          <button className="fc-trigger-btn" onClick={() => setCallState("idle")}>
            Reset
          </button>
        </div>
      )}
    </div>
     </div>
   )
 }
 
 export default Login
 