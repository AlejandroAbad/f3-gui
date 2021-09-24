import { useCallback, useState } from "react";
import useInterval from "./useInterval";



export default function useTickTack(detener, callback, intervalo, numeroTicks) {


	let [ticks, setTicks] = useState(100);

	let ejecutarTick = useCallback(() => {
		if (detener) return;
		if (ticks <= 0) {
			callback();
			setTicks(100)
		} else {
			setTicks(v => v - (100 / numeroTicks));
		}

	}, [detener, numeroTicks, ticks, setTicks, callback])

	useInterval(ejecutarTick, intervalo);

	return ticks


}