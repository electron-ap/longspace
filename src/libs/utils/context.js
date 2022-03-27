import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  Dispatch,
  useMemo
} from "react";


const ParamsProvider = createContext();

// 配置信息

ParamsProvider.displayName = "langContext";


const ParamsContextProvider = ({children}) => {
  const [lang, setLang] = useState('zh-cn');
  const langConfig = useMemo(() => {
    const obj = {
      'zh-cn': {
        name: '标题'
      },
      'en-us': {
        name: 'Title'
      }
    }
    return obj[lang]
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
