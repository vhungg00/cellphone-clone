// export const logoAppCellPhone = ({width: '', height: '', classNameName: ''}) => {

// }
export const UploadIcon = ({
  width = "3.2rem",
  height = "3.2rem",
  className,
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 32 32"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22.1571 13.8359L21.9247 12.3786C21.4686 9.51917 18.9876 7.3335 16 7.3335C12.6863 7.3335 10 10.0197 9.99996 13.3334L10.0011 15.2304L8.11578 15.3398C6.19293 15.4513 4.66663 17.0482 4.66663 19.0002C4.66663 21.0252 6.30825 22.6668 8.33329 22.6668H15.3333V17.0813L14.1785 18.236C13.9182 18.4964 13.4961 18.4964 13.2357 18.236L12.7643 17.7646C12.504 17.5043 12.504 17.0822 12.7643 16.8218L15.862 13.7242C16.1223 13.4638 16.5444 13.4638 16.8048 13.7242L19.9024 16.8218C20.1628 17.0822 20.1628 17.5043 19.9024 17.7646L19.431 18.236C19.1706 18.4964 18.7485 18.4964 18.4882 18.236L17.3333 17.0811V22.6668H23C25.3932 22.6668 27.3333 20.7267 27.3333 18.3335C27.3333 16.151 25.7179 14.3423 23.6181 14.0437L22.1571 13.8359ZM8.33329 24.6668H15.3333H17.3333H23C26.4978 24.6668 29.3333 21.8313 29.3333 18.3335C29.3333 15.1411 26.9714 12.5005 23.8997 12.0636C23.2913 8.24881 19.9861 5.3335 16 5.3335C11.5817 5.3335 7.99996 8.91522 7.99996 13.3335L7.99996 13.3431C5.0255 13.5157 2.66663 15.9824 2.66663 19.0002C2.66663 22.1298 5.20368 24.6668 8.33329 24.6668Z"
    ></path>
  </svg>
);
export const LocationIcon = ({
  width = "2.5rem",
  height = "2.5rem",
  className,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 23.22 30.36"
    className={className}
    width={width}
    height={height}
  >
    <defs></defs>
    <g id="Layer_2" data-name="Layer 2">
      <g id="Layer_1-2" data-name="Layer 1">
        <path
          d="M11.61.9A10.77,10.77,0,0,0,.9,11.69C.9,20.14,10.6,28.87,11,29.23a.87.87,0,0,0,1.18,0c.42-.36,10.12-9.09,10.12-17.54A10.77,10.77,0,0,0,11.61.9Z"
          className="cls-1"
        ></path>
        <path
          d="M11.61,16.35a4.74,4.74,0,1,1,4.74-4.74,4.75,4.75,0,0,1-4.74,4.74Z"
          className="cls-1"
        ></path>
      </g>
    </g>
  </svg>
);
export const CategoryIcon = ({
  width = "2.5rem",
  height = "2.5rem",
  className,
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 26.99 26.99"
  >
    <defs>
      <style>{`.cls-1 {
                    fill: none;
                    stroke: #fff;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    stroke-width: 1.8px;
                }`}</style>
    </defs>
    <g id="Layer_2" data-name="Layer 2">
      <g id="Layer_1-2" data-name="Layer 1">
        <line x1="7.06" y1="7.52" x2="19.92" y2="7.52" className="cls-1"></line>
        <line
          x1="7.06"
          y1="13.49"
          x2="19.92"
          y2="13.49"
          className="cls-1"
        ></line>
        <line
          x1="7.06"
          y1="19.47"
          x2="11.95"
          y2="19.47"
          className="cls-1"
        ></line>
        <rect
          x="0.9"
          y="0.9"
          width="25.19"
          height="25.19"
          rx="4.71"
          className="cls-1"
        ></rect>
      </g>
    </g>
  </svg>
);
export const SearchIcon = ({
  width = "2.4rem",
  height = "2.4rem",
  className,
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 48 48"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22 10C15.3726 10 10 15.3726 10 22C10 28.6274 15.3726 34 22 34C28.6274 34 34 28.6274 34 22C34 15.3726 28.6274 10 22 10ZM6 22C6 13.1634 13.1634 6 22 6C30.8366 6 38 13.1634 38 22C38 25.6974 36.7458 29.1019 34.6397 31.8113L43.3809 40.5565C43.7712 40.947 43.7712 41.5801 43.3807 41.9705L41.9665 43.3847C41.5759 43.7753 40.9426 43.7752 40.5521 43.3846L31.8113 34.6397C29.1019 36.7458 25.6974 38 22 38C13.1634 38 6 30.8366 6 22Z"
    ></path>
  </svg>
);

export const CartEmpty = ({ width = "7rem", height = "7rem", className }) => (
  <svg
    width={width}
    height={height}
    data-v-f0878112=""
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="frown"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 496 512"
    className=" fa-frown fa-w-16"
  >
    <path
      data-v-f0878112=""
      fill="currentColor"
      d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm80 168c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zm-160 0c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zm170.2 218.2C315.8 367.4 282.9 352 248 352s-67.8 15.4-90.2 42.2c-13.5 16.3-38.1-4.2-24.6-20.5C161.7 339.6 203.6 320 248 320s86.3 19.6 114.7 53.8c13.6 16.2-11 36.7-24.5 20.4z"
      className=""
    ></path>
  </svg>
);

export const IconHome = ({width = '1rem', height = '1.2rem', className = '' }) => (
  <svg
    width={width}
    height={height}
    className = {className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 10.633"
  >
    <path
      id="home"
      d="M13.2,9.061H12.1v3.965a.6.6,0,0,1-.661.661H8.793V9.721H6.15v3.965H3.507a.6.6,0,0,1-.661-.661V9.061h-1.1c-.4,0-.311-.214-.04-.494L7,3.259a.634.634,0,0,1,.936,0l5.3,5.307c.272.281.356.495-.039.495Z"
      transform="translate(-1.471 -3.053)"
      fill="#d70018"
    />
  </svg>
);

export const IconUp = ({width = '1.33rem', height = '1.5rem', className = '' }) => (
  <svg 
    height={height} 
    width={width} 
    className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
    <path d="M416 352c-8.188 0-16.38-3.125-22.62-9.375L224 173.3l-169.4 169.4c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25C432.4 348.9 424.2 352 416 352z">
    </path>
  </svg>
  );