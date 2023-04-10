import React, { useState, useCallback, useEffect } from "react";
import ImageBox from '@sentry/components/image/Image';
import { SxProps } from "@mui/material";
import uuidv4 from "@sentry/utils/uuidv4";

const ImageComponent =  ({ src, ...props }: {src:string, sx?: SxProps} ) => {

    const [imgSrc, setSrc] = useState(src);

    const onLoad = useCallback(() => {
        setSrc(src);
    }, [src]);
    
    const onError = useCallback(() => {
        setSrc('/assets/imgErr.png');
    },[]);
    
    useEffect(() => {
        const img = new Image();
        img.src = src as string;
        img.addEventListener("load", onLoad);
        img.addEventListener("error", onError);
        return () => {
            img.removeEventListener("load", onLoad);
            img.removeEventListener("error", onError);
        };
    }, [src, onLoad, onError]);

      return <>
        <ImageBox
            disabledEffect
            alt={src}
            src={`${imgSrc}?${uuidv4()}`}
            sx={props.sx}
        />
      </>;
}

export { ImageComponent }