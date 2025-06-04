import React, { SVGProps } from 'react';

const TwitterIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M17.6126 2H20.8471L13.7806 10.3394L22.0938 21.6875H15.5846L10.4865 14.805L4.653 21.6875H1.41654L8.97481 12.7675L1 2H7.67436L12.2827 8.29091L17.6126 2ZM16.4774 19.6885H18.2696L6.70049 3.89404H4.77718L16.4774 19.6885Z'
        fill='#333438'
      />
    </svg>
  );
};

export default TwitterIcon;
