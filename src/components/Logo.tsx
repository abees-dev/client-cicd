import { Box, BoxProps } from '@mui/material';
import NextLink from 'next/link';
import React from 'react';

type LogoType = { link?: string } & BoxProps;
export default function Logo({ link, sx, ...other }: LogoType) {
  if (link) {
    return (
      <NextLink href={link} passHref>
        <Box sx={{ cursor: 'pointer', ...sx }} {...other}>
          <SVGLogo />
        </Box>
      </NextLink>
    );
  }
  return (
    <Box {...other}>
      <SVGLogo />
    </Box>
  );
}

function SVGLogo() {
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 679.2315 761.1535"
    >
      <defs>
        <linearGradient
          id="linear-gradient"
          x1="-626.2644"
          y1="2547.6773"
          x2="658.9738"
          y2="1079.8408"
          gradientTransform="translate(195.4106 -364.5575)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" />
        </linearGradient>
        <linearGradient
          id="linear-gradient-2"
          x1="-707.5292"
          y1="2476.2468"
          x2="577.5147"
          y2="1008.4098"
          gradientTransform="translate(195.2694 -364.5575)"
          xlinkHref="#linear-gradient"
        />
        <linearGradient
          id="linear-gradient-3"
          x1="2256.4454"
          y1="-194.8486"
          x2="53.9062"
          y2="1421.261"
          gradientTransform="translate(200.6626 -372.0626)"
          xlinkHref="#linear-gradient"
        />
        <linearGradient
          id="linear-gradient-4"
          x1="2188.6115"
          y1="-284.993"
          x2="-13.7322"
          y2="1331.1211"
          gradientTransform="translate(195.2694 -381.6856)"
          xlinkHref="#linear-gradient"
        />
        <linearGradient
          id="linear-gradient-5"
          x1="774.0829"
          y1="147.7463"
          x2="647.3831"
          y2="1292.5575"
          gradientTransform="translate(205.8454 -385.0648)"
          xlinkHref="#linear-gradient"
        />
        <linearGradient
          id="linear-gradient-6"
          x1="857.7801"
          y1="153.681"
          x2="731.0801"
          y2="1298.4931"
          gradientTransform="translate(214.4024 -380.8797)"
          xlinkHref="#linear-gradient"
        />
        <linearGradient
          id="linear-gradient-7"
          x1="1530.683"
          y1="4901.4612"
          x2="532.5786"
          y2="734.285"
          gradientTransform="translate(207.5831 -357.1209)"
          xlinkHref="#linear-gradient"
        />
        <linearGradient
          id="linear-gradient-8"
          x1="1597.2617"
          y1="4884.1408"
          x2="599.1576"
          y2="716.9662"
          gradientTransform="translate(213.7816 -357.2515)"
          xlinkHref="#linear-gradient"
        />
        <linearGradient
          id="linear-gradient-9"
          x1="454.6861"
          y1="728.1515"
          x2="632.9679"
          y2="1492.6636"
          gradientTransform="translate(203.0859 -359.1306)"
          xlinkHref="#linear-gradient"
        />
        <linearGradient
          id="linear-gradient-10"
          x1="684.4947"
          y1="800.2777"
          x2="462.6717"
          y2="1014.0592"
          gradientTransform="translate(205.848 -389.8052)"
          xlinkHref="#linear-gradient"
        />
        <clipPath id="clip-path" transform="translate(-448.9042 -489.9671)">
          <path
            d="M505.9505,641.1167c-36.7938,21.2428-57.0463,57.1685-57.0463,99.6326v260.4055c0,41.8973,20.7643,77.8613,57.0463,98.81,0,0,191.3663,10.53,237.3567-245.2666H616.8641L788.5231,590.08c-12.8761-37.8781-45.7061-85.7123-136.1044-33.5243Z"
            fill="none"
            clipRule="evenodd"
          />
        </clipPath>
        <linearGradient
          id="linear-gradient-11"
          x1="303.6322"
          y1="38.6667"
          x2="-32.9261"
          y2="739.83"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#60c" />
          <stop offset="0.46" stopColor="#d500f9" />
          <stop offset="1" stopColor="#ff80ab" />
        </linearGradient>
        <mask id="mask" x="2.7694" y="475.5392" width="249.4421" height="134.5216" maskUnits="userSpaceOnUse">
          <g transform="translate(-448.9042 -489.9671)">
            <rect x="451.6736" y="965.5081" width="249.4421" height="134.5198" fill="url(#linear-gradient)" />
          </g>
        </mask>
        <mask id="mask-2" x="0" y="278.5635" width="139.2407" height="331.4973" maskUnits="userSpaceOnUse">
          <g transform="translate(-448.9042 -489.9671)">
            <rect x="448.9042" y="768.5312" width="139.2404" height="331.4967" fill="url(#linear-gradient-2)" />
          </g>
        </mask>
        <mask id="mask-3" x="105.7769" y="43.6043" width="233.842" height="419.259" maskUnits="userSpaceOnUse">
          <g transform="translate(-448.9042 -489.9671)">
            <rect x="554.6811" y="533.5714" width="233.842" height="419.259" fill="url(#linear-gradient-3)" />
          </g>
        </mask>
        <mask id="mask-4" x="0" y="43.6097" width="284.5456" height="230.5174" maskUnits="userSpaceOnUse">
          <g transform="translate(-448.9042 -489.9671)">
            <rect x="448.9042" y="533.5768" width="284.5453" height="230.5174" fill="url(#linear-gradient-4)" />
          </g>
        </mask>
        <clipPath id="clip-path-2" transform="translate(-448.9042 -489.9671)">
          <path
            d="M652.4187,556.5554C742.817,504.3674,788.5231,590.08,788.5231,590.08L960.176,854.6984H838.3753s16.0238,248.0205-147.9624,351.7669l41.0578,23.7064c36.2821,20.9489,77.8167,20.9489,114.0987,0l225.52-130.2067c36.7921-21.2428,57.0464-57.1679,57.0464-99.632V739.9275c0-41.8973-20.764-77.8619-57.0464-98.8108L845.5694,510.91c-36.282-20.9429-77.8166-20.9429-114.0987,0Z"
            fill="none"
            clipRule="evenodd"
          />
        </clipPath>
        <linearGradient
          id="linear-gradient-12"
          x1="543.89"
          y1="846.4707"
          x2="325.989"
          y2="-143.792"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#304ffe" />
          <stop offset="1" stopColor="#18ffff" />
        </linearGradient>
        <mask id="mask-5" x="207.4271" y="5.2312" width="462.6315" height="202.62" maskUnits="userSpaceOnUse">
          <g transform="translate(-448.9042 -489.9671)">
            <rect x="656.3313" y="495.1983" width="462.6297" height="202.62" fill="url(#linear-gradient-5)" />
          </g>
        </mask>
        <mask id="mask-6" x="375.2557" y="11.1975" width="303.9761" height="278.7359" maskUnits="userSpaceOnUse">
          <g transform="translate(-448.9042 -489.9671)">
            <rect x="824.1599" y="501.1646" width="303.9761" height="278.7359" fill="url(#linear-gradient-6)" />
          </g>
        </mask>
        <mask id="mask-7" x="241.5087" y="245.4157" width="393.3682" height="510.5006" maskUnits="userSpaceOnUse">
          <g transform="translate(-448.9042 -489.9671)">
            <rect x="690.4129" y="735.3828" width="393.3682" height="510.4988" fill="url(#linear-gradient-7)" />
          </g>
        </mask>
        <mask id="mask-8" x="363.0799" y="298.1274" width="316.1516" height="455.2259" maskUnits="userSpaceOnUse">
          <g transform="translate(-448.9042 -489.9671)">
            <rect x="811.9841" y="788.0951" width="316.1516" height="455.2253" fill="url(#linear-gradient-8)" />
          </g>
        </mask>
        <mask id="mask-9" x="153.3052" y="100.1126" width="357.9666" height="616.3856" maskUnits="userSpaceOnUse">
          <g transform="translate(-448.9042 -489.9671)">
            <rect x="602.2094" y="590.0797" width="357.9648" height="616.3856" fill="url(#linear-gradient-9)" />
          </g>
        </mask>
        <mask id="mask-10" x="207.4783" y="49.7405" width="132.1406" height="65.1369" maskUnits="userSpaceOnUse">
          <g transform="translate(-448.9042 -489.9671)">
            <rect x="656.3825" y="539.7076" width="132.1406" height="65.1369" fill="url(#linear-gradient-10)" />
          </g>
        </mask>
      </defs>
      <g clipPath="url(#clip-path)">
        <rect y="14.4003" width="339.6189" height="606.1278" fill="url(#linear-gradient-11)" />
      </g>
      <g mask="url(#mask)">
        <path
          d="M451.6736,1026.9633c6.7587,30.6884,25.7068,56.5011,54.2769,73.0017,0,0,122.6441,6.7216,195.1652-121.85a263.0373,263.0373,0,0,0-249.4421,48.8481"
          transform="translate(-448.9042 -489.9671)"
          fill="#f3e5f5"
          fillRule="evenodd"
        />
      </g>
      <g mask="url(#mask-2)">
        <path
          d="M448.9042,768.5306v232.6242c0,41.8973,20.7643,77.8613,57.0463,98.81,0,0,28.9763,1.59,67.0884-11.5363A262.9827,262.9827,0,0,0,448.9042,768.5306"
          transform="translate(-448.9042 -489.9671)"
          fill="#f3e5f5"
          fillRule="evenodd"
        />
      </g>
      <g mask="url(#mask-3)">
        <path
          d="M713.8682,952.83c12.3267-27.3408,22.5273-59.7141,29.439-98.132H616.8641L788.5231,590.08c-12.8761-37.8781-45.7061-85.7123-136.1044-33.5243l-72.2308,41.7009a261.6382,261.6382,0,0,0-25.5068,113.0495c0,108.3348,65.5741,201.3415,159.1871,241.5246"
          transform="translate(-448.9042 -489.9671)"
          fill="#60c"
          fillRule="evenodd"
        />
      </g>
      <g mask="url(#mask-4)">
        <path
          d="M505.9505,641.1167c-36.7938,21.2428-57.0463,57.1685-57.0463,99.6326v22.2543c7.8729.7063,15.8338,1.0906,23.8886,1.0906,133.8764,0,244.3623-100.1342,260.657-229.5939-19.8934-3.3081-46.1846,1.9339-81.0311,22.0551Z"
          transform="translate(-448.9042 -489.9671)"
          fill="#60c"
          fillRule="evenodd"
        />
      </g>
      <g clipPath="url(#clip-path-2)">
        <rect x="203.5145" width="475.717" height="761.1535" fill="url(#linear-gradient-12)" />
      </g>
      <g mask="url(#mask-5)">
        <path
          d="M656.3825,554.3414c87.77-47.462,132.1406,35.7383,132.1406,35.7383l43.8153,67.5472a614.1831,614.1831,0,0,0,219.1909,40.1914,622.688,622.688,0,0,0,67.4335-3.6912c-9.3965-21.8767-25.7517-40.2345-47.8735-53.01L845.5694,510.91c-36.282-20.9429-77.8166-20.9429-114.0987,0l-75.1394,43.3883Z"
          transform="translate(-448.9042 -489.9671)"
          fill="#84ffff"
          fillRule="evenodd"
        />
      </g>
      <g mask="url(#mask-6)">
        <path
          d="M1128.1357,779.9005v-39.973c0-41.8973-20.764-77.8619-57.0464-98.8108L845.5694,510.91a120.8628,120.8628,0,0,0-21.4095-9.7454,618.3141,618.3141,0,0,0,303.9758,278.7359"
          transform="translate(-448.9042 -489.9671)"
          fill="#84ffff"
          fillRule="evenodd"
        />
      </g>
      <g mask="url(#mask-7)">
        <path
          d="M882.7793,735.3845,960.176,854.6984H838.3753s16.0238,248.0205-147.9624,351.7669l41.0578,23.7064c36.2821,20.9489,77.8167,20.9489,114.0987,0l225.52-130.2067a124.1207,124.1207,0,0,0,12.6918-8.3945c-24.8006-141.1019-97.6257-265.6482-201.0018-356.186"
          transform="translate(-448.9042 -489.9671)"
          fill="#021b8d"
          fillRule="evenodd"
        />
      </g>
      <g mask="url(#mask-8)">
        <path
          d="M811.9841,1243.32a117.6287,117.6287,0,0,0,33.5853-13.1487l225.52-130.2067c36.7921-21.2428,57.0464-57.1679,57.0464-99.632V788.0945C960.27,879.3559,839.5993,1046.4159,811.9841,1243.32"
          transform="translate(-448.9042 -489.9671)"
          fill="#021b8d"
          fillRule="evenodd"
        />
      </g>
      <g mask="url(#mask-9)">
        <path
          d="M788.5231,590.08s77.1005,512.5823-186.3137,570.019l88.2035,46.3666c163.9862-103.7464,147.9624-351.7669,147.9624-351.7669H960.176L882.7793,735.3845l-50.4409-77.7576Z"
          transform="translate(-448.9042 -489.9671)"
          fill="#c5d3e2"
          fillRule="evenodd"
        />
      </g>
      <g mask="url(#mask-10)">
        <path
          d="M656.3825,554.3414s84.4006-35.8467,122.5615,50.5031l9.5791-14.7648s-44.37-83.2-132.1406-35.7383"
          transform="translate(-448.9042 -489.9671)"
          fill="#309"
          fillRule="evenodd"
        />
      </g>
    </svg>
  );
}
