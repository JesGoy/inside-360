"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Image from "next/image";
import { Place } from "../interfaces/Place";
import { Compass, Maximize2, Menu, X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import dynamic from "next/dynamic";
import { FormattedMessage } from "react-intl";

const LoadAnimation = dynamic(() => import("@/app/components/load-animation"), {
  ssr: false,
});
const isMobileDevice = (): boolean => {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
};
const View360 = ({ places }: { places: Place[] }) => {
  const elementRef = useRef(null);
  const [giroScopeActive, setgiroScopeActive] = useState<boolean>(false);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
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

  const [quaternion, setQuaternion] = useState<THREE.Quaternion>();

  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [currentPlace, setCurrentPlace] = useState<Place>(places[0]);

  const toggleFullscreen = () => {
    const element = elementRef.current || document.documentElement; // Elemento a poner en fullscreen (puede ser el propio documento)
    if (!document.fullscreenElement) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
        setIsFullScreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

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
    setIsLoading(false);
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

      const euler = new THREE.Euler();
      const q0 = new THREE.Quaternion();
      const q1 = new THREE.Quaternion(-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5));

      euler.set(beta, alpha, -gamma, "YXZ");
      const quar = new THREE.Quaternion();
      quar.setFromEuler(euler);
      quar.multiply(q1);
      quar.multiply(q0.setFromAxisAngle(new THREE.Vector3(0, 0, 1), -orient));
      setQuaternion(quar);
      if (cameraRef.current) {
        cameraRef.current.quaternion.copy(quar);
      }
    }
  }, []);

  const requestGyroscopePermission = () => {
    if (giroScopeActive) {
      window.removeEventListener("deviceorientation", onDeviceOrientation);
      setgiroScopeActive(false);
      setIsOpen(true);
    } else {
      setIsOpen(true);
      setgiroScopeActive(true);
      if (
        typeof DeviceOrientationEvent !== "undefined" &&
        typeof (DeviceOrientationEvent as any).requestPermission === "function"
      ) {
        (DeviceOrientationEvent as any)
          .requestPermission()
          .then((permissionState: string) => {
            if (permissionState === "granted") {
              window.addEventListener("deviceorientation", onDeviceOrientation);
              setIsOpen(true);
              setgiroScopeActive(true);
            }
          })
          .catch(console.error);
      } else {
        window.addEventListener("deviceorientation", onDeviceOrientation);
      }
    }
  };

  useEffect(() => {
    if (!currentPlace) return;
    if (canvasRef.current) {
      sceneRef.current = new THREE.Scene();
      cameraRef.current = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        1,
        1100
      );
      cameraRef.current.position.set(0, 0, 0);
      if (quaternion) {
        cameraRef.current.quaternion.copy(quaternion);
      }

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
        currentPlace?.image360,
        (texture) => {
          const vertexShader = `
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `;

          const fragmentShader = `
            uniform sampler2D tDiffuse;
            uniform float saturation;
            uniform float exposure;
            varying vec2 vUv;
            
            void main() {
              vec4 texel = texture2D(tDiffuse, vUv);
              
              // Aumentamos la saturación
              float luminance = dot(texel.rgb, vec3(0.299, 0.587, 0.114));
              vec3 saturatedColor = mix(vec3(luminance), texel.rgb, saturation);
              
              // Ajustamos la exposición
              vec3 finalColor = saturatedColor * exposure;
              
              gl_FragColor = vec4(finalColor, texel.a);
            }
          `;

          const material = new THREE.ShaderMaterial({
            uniforms: {
              tDiffuse: { value: texture },
              saturation: { value: 1.2 },
              exposure: { value: 0.9 },
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
          });
          const mesh = new THREE.Mesh(geometry, material);
          sceneRef.current?.add(mesh);

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
        if (giroScopeActive) {
          window.addEventListener("deviceorientation", onDeviceOrientation);
        }
      } else {
        setgiroScopeActive(true)
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
    currentPlace,
  ]);

  function changePlace(place: Place) {
    setIsOpenMenu(false);
    setCurrentPlace(place);
  }

  return (
    <body ref={elementRef} className="overflow-hidden bg-white">
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", touchAction: "none" }}
      />
      {isLoading && (
        <div
          className="z-50"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <LoadAnimation></LoadAnimation>
          <p className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center text-xl -mt-38">
            <b><FormattedMessage id="app.loading"/></b>
          </p>
        </div>
      )}
      <Image
        src="/images/logo.svg"
        alt="Logo"
        width={100}
        height={100}
        style={{ position: "absolute", top: 10, left: 10 }}
      />
      <label className="absolute bottom-[10%] bg-white text-xl p-3 px-5 text-center rounded-r-full">
        <b>{currentPlace.name}</b>
      </label>
      <Dialog.Root open={isOpenMenu} onOpenChange={setIsOpenMenu} modal={false}>
        {!isOpenMenu && (
          <Dialog.Trigger
            className="bg-white rounded-r-full text-greenjw min-w-[70px] py-3 flex justify-end pr-5"
            style={{ position: "absolute", top: 100, left: 0 }}
          >
            <Menu />
          </Dialog.Trigger>
        )}

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-50" />
          <div className="fixed inset-0 flex items-center">
            <Dialog.Content
              className={`z-50 h-3/4 w-1/2 p-2 pb-5 rounded-r-xl bg-white shadow-lg
                data-[state=open]:animate-slideInFromLeft
                 data-[state=closed]:animate-slideOutToLeft`}
            >
              <div className="flex justify-end">
                <Dialog.Close asChild className=" right-0 mt-2 text-center">
                  <X className="text-greenjw " />
                </Dialog.Close>
              </div>

              <Dialog.Title className="text-lg p-0 font-semibold"></Dialog.Title>
              <Dialog.Description className="p-0 text-sm text-gray-500"></Dialog.Description>
              <ScrollArea.Root className="h-[95%] rounded pt-2">
                <ScrollArea.Viewport className="h-full pb-5">
                  {places.map((p, key) => (
                    <div
                      key={key}
                      className="flex flex-col justify-center items-center shadow-lg rounded-lg mb-6"
                      onClick={() => {
                        changePlace(p);
                      }}
                    >
                      <img src={p.imageMin} className="rounded-t-lg"></img>
                      <p className="text-center">{p.name}</p>
                    </div>
                  ))}
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar
                  className="flex select-none touch-none p-0.5 transition-colors duration-[160ms] ease-out hover:bg-gray-400"
                  orientation="vertical"
                >
                  <ScrollArea.Thumb className="flex-1 rounded bg-gray-500" />
                </ScrollArea.Scrollbar>
              </ScrollArea.Root>
            </Dialog.Content>
          </div>
        </Dialog.Portal>
      </Dialog.Root>

      <button
        onClick={() => requestGyroscopePermission()}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          padding: "10px",

          cursor: "pointer",
        }}
        className={`rounded-full ${
          giroScopeActive ? "bg-orangejw text-white" : "bg-white text-greenjw"
        }`}
      >
        <Compass />
      </button>
      {!isMobileDevice() && (
        <button
          onClick={() => toggleFullscreen()}
          style={{
            position: "absolute",
            top: "80px",
            right: "20px",
            padding: "10px",

            cursor: "pointer",
          }}
          className={`rounded-full ${
            isFullScreen ? "bg-orangejw text-white" : "bg-white text-greenjw"
          }`}
        >
          <Maximize2 />
        </button>
      )}

      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
          <Dialog.Content
            onClick={() => setIsOpen(false)}
            className={`fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-2/3 h-[200px] max-w-[400px]  flex items-center justify-center rounded-3xl bg-white p-1 z-50 focus:outline-none shadow-lg`}
          >
            <Dialog.DialogTitle></Dialog.DialogTitle>
            <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal text-center"></Dialog.Description>

            {giroScopeActive ? (
              <div className="flex flex-col justify-center items-center gap-4">
                <img
                  src="/images/icon-giroscopeactive-popup.svg"
                  alt="Giroscope"
                />

                <p className="text-center">
                  <FormattedMessage id="app.giroScopeActive.instructions"/>
                </p>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center gap-4">
                <img
                  src="/images/icon-giroscopeinactive-popup.svg"
                  alt="Giroscope"
                />

                <p className="text-center">
                  <FormattedMessage id="app.giroScopeInactive.instructions"/>
                </p>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </body>
  );
};

export default View360;
