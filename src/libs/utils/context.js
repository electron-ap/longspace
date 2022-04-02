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
		// const obj = {
		// 	'zh-cn': {
		// 		sys_title: '欢迎登录代理商学习平台',
		// 		login_email_text:'请输入邮箱',
		// 		login_pwd_text:'请输入密码',
		// 		login_yzm_text: '请输入验证码',
		// 		login_btn_text :'立即登录',
		// 		forget_pwd:'忘记密码'
		// 	},
		// 	'en-us': {
		// 		sys_title: 'welcome to agent study platform',
		// 		login_email_text:'please enter your email',
		// 		login_pwd_text:'please enter your password',
		// 		login_yzm_text: 'validate code',
		// 		login_btn_text :'sign in',
		// 		forget_pwd:'forget password'
		// 	}
		// }
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
