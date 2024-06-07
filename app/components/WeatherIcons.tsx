import { WiDaySunny, WiMoonAltFull, WiDayCloudy, WiNightAltCloudy, WiCloud, WiCloudy, WiShowers, WiDayRain, WiNightAltRainMix, WiDayThunderstorm, WiNightAltThunderstorm } from "react-icons/wi";
import { IoIosSnow } from "react-icons/io";
import { TbMist } from "react-icons/tb";

export default function WeatherIcons({ icon }: { icon: string }) {

    if (icon === '01d') {
        return <WiDaySunny size={150} color="white" />
    }
    else if (icon === '01n') {
        return <WiMoonAltFull size={150} color="white" />
    }
    else if (icon === '02d') {
        return <WiDayCloudy size={150} color="white" />
    }
    else if (icon === '02n') {
        return <WiNightAltCloudy size={150} color="white" />
    }
    else if (icon === '03d' || icon === '03n') {
        return <WiCloud size={150} color="white" />
    }
    else if (icon === '04d' || icon === '04n') {
        return <WiCloudy size={150} color="white" />
    }
    else if (icon === '09d' || icon === '09n') {
        return <WiShowers size={150} color="white" />
    }
    else if (icon === '10d') {
        return <WiDayRain size={150} color="white" />
    }
    else if (icon === '10n') {
        return <WiNightAltRainMix size={150} color="white" />
    }
    else if (icon === '11d') {
        return <WiDayThunderstorm size={150} color="white" />
    }
    else if (icon === '11n') {
        return <WiNightAltThunderstorm size={150} color="white" />
    }
    else if (icon === '13d' || icon === '13n') {
        return <IoIosSnow size={150} color="white" />
    }
    else {
        return <TbMist size={150} color="white" />
    }
}
