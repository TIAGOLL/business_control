const LoadingIcon = ({ color = 'white', widht = 30, height = widht, strokeWidht = 12 }) => {
    return (
        <svg
            width={widht}
            height={height}
            viewBox="0 0 200 200"
            color={color}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient id="spinner-secondHalf">
                    <stop offset="0%" stopOpacity="0" stopColor="currentColor" />
                    <stop offset="100%" stopOpacity="0.5" stopColor="currentColor" />
                </linearGradient>
                <linearGradient id="spinner-firstHalf">
                    <stop offset="0%" stopOpacity="1" stopColor="currentColor" />
                    <stop offset="100%" stopOpacity="0.5" stopColor="currentColor" />
                </linearGradient>
            </defs>

            <g strokeWidth={strokeWidht}>
                <path stroke="url(#spinner-secondHalf)" d="M 4 100 A 96 96 0 0 1 196 100" />
                <path stroke="url(#spinner-firstHalf)" d="M 196 100 A 96 96 0 0 1 4 100" />


                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    d="M 4 100 A 96 96 0 0 1 4 98"
                />
            </g>


        </svg>
    )

}

export default LoadingIcon;
