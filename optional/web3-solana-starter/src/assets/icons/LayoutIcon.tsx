import React, { SVGProps } from 'react';

const LayoutIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width='32'
      height='30'
      viewBox='0 0 32 30'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <rect
        x='0.75'
        y='0.75'
        width='10.5'
        height='10.5'
        rx='1.25'
        stroke='#3B3B3D'
        strokeWidth='1.5'
      />
      <rect
        x='0.75'
        y='14.75'
        width='10.5'
        height='14.5'
        rx='1.25'
        stroke='#3B3B3D'
        strokeWidth='1.5'
      />
      <rect
        x='13.75'
        y='0.75'
        width='17.5'
        height='14.5'
        rx='1.25'
        stroke='#3B3B3D'
        strokeWidth='1.5'
      />
      <rect
        x='13.75'
        y='18.75'
        width='17.5'
        height='10.5'
        rx='1.25'
        stroke='#3B3B3D'
        strokeWidth='1.5'
      />
    </svg>
  );
};

export default LayoutIcon;
