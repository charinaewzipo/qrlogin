import React, { memo, useEffect, useRef } from 'react';
import usePrevious from './hooks/usePrevious'; export interface SingleOTPInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  focus?: boolean;
}

export function SingleOTPInputComponent({
  focus,
  autoFocus,
  ...props
}: SingleOTPInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const prevFocus = usePrevious(!!focus);

  useEffect(() => {
    if (inputRef.current) {
      if (focus && autoFocus) {
        inputRef.current.focus();
      }
      if (focus && autoFocus && focus !== prevFocus) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }
  }, [autoFocus, focus, prevFocus]);

  return <input ref={inputRef} {...props} placeholder="-" onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = "-"}
  />;
}

const SingleOTPInput = memo(SingleOTPInputComponent);
export default SingleOTPInput;
