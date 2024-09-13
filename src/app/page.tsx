"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import Image from "next/image";
import LoadAnimation from "./components/load-animation";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const isUserInteractingRef = useRef(false);
  const onPointerDownMouseXRef = useRef(0);
  const onPointerDownMouseYRef = useRef(0);
  const lonRef = useRef(0);
  const latRef = useRef(0);
  const onPointerDownLonRef = useRef(0);
  const onPointerDownLatRef = useRef(0);
  const phiRef = useRef(0);
  const thetaRef = useRef(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showGyroscopeButton, setShowGyroscopeButton] = useState(false);

  const onWindowResize = useCallback(() => {
    if (cameraRef.current && rendererRef.current) {
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    }
  }, []);

  const updateCameraRotation = useCallback(() => {
    if (cameraRef.current) {
      phiRef.current = THREE.MathUtils.degToRad(90 - latRef.current);
      thetaRef.current = THREE.MathUtils.degToRad(lonRef.current);

      const x = Math.sin(phiRef.current) * Math.cos(thetaRef.current);
      const y = Math.cos(phiRef.current);
      const z = Math.sin(phiRef.current) * Math.sin(thetaRef.current);

      cameraRef.current.lookAt(x, y, z);
    }
  }, []);

  const animate = useCallback(() => {
    if (isUserInteractingRef.current) {
      updateCameraRotation();
    }
    if (rendererRef.current && sceneRef.current && cameraRef.current) {
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }
    requestAnimationFrame(animate);
  }, [updateCameraRotation]);

  const onPointerDown = useCallback((event: PointerEvent) => {
    if (event.isPrimary === false) return;

    isUserInteractingRef.current = true;

    onPointerDownMouseXRef.current = event.clientX;
    onPointerDownMouseYRef.current = event.clientY;

    onPointerDownLonRef.current = lonRef.current;
    onPointerDownLatRef.current = latRef.current;

    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", onPointerUp);
  }, []);

  const onPointerMove = useCallback((event: PointerEvent) => {
    if (event.isPrimary === false) return;

    lonRef.current =
      (onPointerDownMouseXRef.current - event.clientX) * 0.1 +
      onPointerDownLonRef.current;
    latRef.current =
      (event.clientY - onPointerDownMouseYRef.current) * 0.1 +
      onPointerDownLatRef.current;

    latRef.current = Math.max(-85, Math.min(85, latRef.current));
  }, []);

  const onPointerUp = useCallback(
    (event: PointerEvent) => {
      if (event.isPrimary === false) return;

      isUserInteractingRef.current = false;

      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", onPointerUp);
    },
    [onPointerMove]
  );

  const onTouchStart = useCallback((event: TouchEvent) => {
    if (event.touches.length === 1) {
      event.preventDefault();
      isUserInteractingRef.current = true;
      onPointerDownMouseXRef.current = event.touches[0].pageX;
      onPointerDownMouseYRef.current = event.touches[0].pageY;
      onPointerDownLonRef.current = lonRef.current;
      onPointerDownLatRef.current = latRef.current;
    }
  }, []);

  const onTouchMove = useCallback((event: TouchEvent) => {
    if (event.touches.length === 1) {
      event.preventDefault();
      lonRef.current =
        (onPointerDownMouseXRef.current - event.touches[0].pageX) * 0.1 +
        onPointerDownLonRef.current;
      latRef.current =
        (event.touches[0].pageY - onPointerDownMouseYRef.current) * 0.1 +
        onPointerDownLatRef.current;
      latRef.current = Math.max(-85, Math.min(85, latRef.current));
    }
  }, []);

  const onDeviceOrientation = useCallback((event: DeviceOrientationEvent) => {
    if (event.alpha !== null && event.beta !== null && event.gamma !== null) {
      const alpha = THREE.MathUtils.degToRad(event.alpha);
      const beta = THREE.MathUtils.degToRad(event.beta);
      const gamma = THREE.MathUtils.degToRad(event.gamma);
      const orient = window.orientation
        ? THREE.MathUtils.degToRad(window.orientation as number)
        : 0;

      const quaternion = new THREE.Quaternion();
      const euler = new THREE.Euler();
      const q0 = new THREE.Quaternion();
      const q1 = new THREE.Quaternion(-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5));

      euler.set(beta, alpha, -gamma, "YXZ");
      quaternion.setFromEuler(euler);
      quaternion.multiply(q1);
      quaternion.multiply(
        q0.setFromAxisAngle(new THREE.Vector3(0, 0, 1), -orient)
      );

      if (cameraRef.current) {
        cameraRef.current.quaternion.copy(quaternion);
      }
    }
  }, []);

  const requestGyroscopePermission = useCallback(() => {
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof (DeviceOrientationEvent as any).requestPermission === "function"
    ) {
      (DeviceOrientationEvent as any)
        .requestPermission()
        .then((permissionState: string) => {
          if (permissionState === "granted") {
            window.addEventListener("deviceorientation", onDeviceOrientation);
            setShowGyroscopeButton(false);
          }
        })
        .catch(console.error);
    } else {
      window.addEventListener("deviceorientation", onDeviceOrientation);
    }
  }, [onDeviceOrientation]);

  useEffect(() => {
    if (canvasRef.current) {
      sceneRef.current = new THREE.Scene();
      cameraRef.current = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        1,
        1100
      );
      cameraRef.current.position.set(0, 0, 0);

      rendererRef.current = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
      });
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);

      if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        rendererRef.current.setPixelRatio(1);
      } else {
        rendererRef.current.setPixelRatio(window.devicePixelRatio);
      }

      const geometry = new THREE.SphereGeometry(500, 60, 40);
      geometry.scale(-1, 1, 1);

      const loader = new THREE.TextureLoader();
      loader.load(
        "/images/outdoor_umbrellas_4k.jpg",
        (texture) => {
          const material = new THREE.MeshBasicMaterial({ map: texture });
          const mesh = new THREE.Mesh(geometry, material);
          sceneRef.current?.add(mesh);
          setIsLoading(false);
          animate();
        },
        undefined,
        (error) => console.error("Error loading texture", error)
      );

      window.addEventListener("resize", onWindowResize);
      canvasRef.current.addEventListener("pointerdown", onPointerDown);
      canvasRef.current.addEventListener("touchstart", onTouchStart, {
        passive: false,
      });
      canvasRef.current.addEventListener("touchmove", onTouchMove, {
        passive: false,
      });

      if (
        typeof DeviceOrientationEvent !== "undefined" &&
        typeof (DeviceOrientationEvent as any).requestPermission === "function"
      ) {
        setShowGyroscopeButton(true);
      } else {
        window.addEventListener("deviceorientation", onDeviceOrientation);
      }
    }

    return () => {
      window.removeEventListener("resize", onWindowResize);
      canvasRef.current?.removeEventListener("pointerdown", onPointerDown);
      canvasRef.current?.removeEventListener("touchstart", onTouchStart);
      canvasRef.current?.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("deviceorientation", onDeviceOrientation);
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [
    animate,
    onWindowResize,
    onPointerDown,
    onDeviceOrientation,
    onTouchStart,
    onTouchMove,
  ]);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", touchAction: "none" }}
      />
      {isLoading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <LoadAnimation></LoadAnimation>
        </div>
      )}
      <Image
        src="/images/logo.svg"
        alt="Logo"
        width={100}
        height={100}
        style={{ position: "absolute", top: 10, left: 10 }}
      />
      {showGyroscopeButton && (
        <button
          onClick={requestGyroscopePermission}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Activar giroscopio
        </button>
      )}
    </div>
  );
}
