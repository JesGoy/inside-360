import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import animationData from "../../../public/icons/Vi2Vxsz0lL.json"

const LoadAnimation = () => {
  const container = useRef(null);

  useEffect(() => {
    if(!container.current)return
    const anim = lottie.loadAnimation({
      container: container.current, // El contenedor donde se renderiza la animación
      animationData, // Datos de animación en JSON
      renderer: 'svg', // Tipo de renderizador
      loop: true, // Si quieres que la animación se repita
      autoplay: true, // Si la animación debe iniciar automáticamente
    });

    return () => anim.destroy(); // Limpia la animación al desmontar el componente
  }, [animationData]);

  return <div ref={container} style={{ width: '100%', height: '100%' }} />;
};

export default LoadAnimation;