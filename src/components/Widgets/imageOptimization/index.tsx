// import profileFallback from '../../../public/images/user_avatar.webp'
import profileFallback from "../../../../public/images/user_avatar.webp";
import Image from "next/image";
import { useState, Fragment } from "react";

function OptimizedProfileImageWithFallback({
  src,
  alt,
  width,
  height,
  className = "",
  fallBackSrc = profileFallback.src,
}) {
  const [imageError, setImageError] = useState(false);
  return (
    <Fragment>
      {src && (
        <Image
          src={
            !imageError && (src !== "undefined" || src)
              ? `${src}`
              : `${fallBackSrc}`
          }
          alt={alt}
          width={width}
          height={height}
          className={className}
          objectFit={"cover"}
          unoptimized
          onError={() => setImageError(true)}
        />
      )}
      {!src && (
        <Image
          src={`${fallBackSrc}`}
          alt={alt}
          width={width}
          height={height}
          className={className}
          objectFit={"cover"}
          unoptimized
          onError={() => setImageError(true)}
        />
      )}
    </Fragment>
  );
}

export default OptimizedProfileImageWithFallback;
