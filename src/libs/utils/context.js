import React, {
	createContext,
	useState,
	useContext,
	ReactNode,
	Dispatch,
	useMemo
} from "react";
import { langList } from "./lang";

const ParamsProvider = createContext();

// 配置信息

ParamsProvider.displayName = "langContext";


const ParamsContextProvider = ({ children }) => {
	let _language = localStorage.getItem('language') || 'zh-cn';
	const [lang, setLang] = useState(_language);
	const langConfig = useMemo(() => {
		localStorage.setItem("language", lang)
		return langList[lang]
	}, [lang])

	return (
		<ParamsProvider.Provider
			value={{
				setLang,
				langConfig
			}}
		>
			{children}
		</ParamsProvider.Provider>
	);
};

export default ParamsContextProvider;

export const useLangContext = () => {
	const context = useContext(ParamsProvider);
	if (!context) {
		throw new Error("useParamsContext调用必须在ParamsContextProvider里面");
	}
	return context;
};
