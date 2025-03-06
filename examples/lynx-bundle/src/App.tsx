import { useCallback, useEffect, useState,useLynxGlobalEventListener, useMemo } from '@lynx-js/react';

import type { TouchEvent } from "@lynx-js/types";

import './App.css'
import arrow from './assets/arrow.png'
import lynxLogo from './assets/lynx-logo.png'
import reactLynxLogo from './assets/react-logo.png'
import { i18n } from './i18n.js';

export function App() {
  const [alterLogo, setAlterLogo] = useState(false)
  const [locale, setLocale] = useState('zh-CN');

  useEffect(() => {
    console.info('Hello, ReactLynx i18nnext')
  }, []);

  useMemo(() => {
    "background-only";
    lynx.beforePublishEvent.add("tap",()=>{
      console.warn('before publish ----');
    })
  }, []);


  useLynxGlobalEventListener("tapitem", (e) => {
    console.info('tapitem',e);
    lynx.getTextInfo
  });

  useLynxGlobalEventListener("onWindowResize", (e) => {
    console.info('onWindowResize',e);
  });

  const emitterTapitem = async (e: TouchEvent) => {
    lynx.getJSModule("GlobalEventEmitter").toggle("tapitem", e);
  }
  
  const globalTap = async (e: TouchEvent) => {
    console.log('globalTap');
    await changeLngTap();
    await emitterTapitem(e);
  }

  const getNextLocale = (locale: string) => {
    const locales = ['zh-CN', 'en'];
    const index = locales.indexOf(locale);
    return locales[(index + 1) % locales.length];
  }

  const changeLngTap = async () => {
    try {
      const response = await fetch("http://httpbin.org/get");
      const text = await response.text();
      console.log(text);
    } catch (error) {
      console.error('http',error);
    }

    const nextLocale = getNextLocale(locale);
    await i18n.changeLanguage(nextLocale);
    setLocale(nextLocale);
  }

  const onTap = useCallback(() => {
    'background only'
    setAlterLogo(!alterLogo)
  }, [alterLogo])

  return (
    <view>
      <view className='Background' />
      <view className='App'>
        <view className='Banner' global-bindtap = {globalTap}>
          <view className='Logo' bindtap={onTap}>
            {alterLogo
              ? <image src={reactLynxLogo} className='Logo--react' />
              : <image src={lynxLogo} className='Logo--lynx' />}
          </view>
          <text className='Title'>React</text>
          <text className='Subtitle'>on Lynx</text>
        </view>

       <view style={{ width: "200px" }}>
       <text style={{ height: "30px", lineHeight: "20px" }} text-maxline="1">
        this is a test text. this is a test text. this is a test text.this is a test text. this is a test text. this is
        a test text. this is a test text. this is a test text. this is a test text. this is a test text.
        <inline-truncation>
          <text>...See More</text>
        </inline-truncation>
        </text>
        </view>        

       <view>

          <text style={{color: 'red'}}>Current locale: {locale}</text>
          <text bindtap = {changeLngTap}>
            Tap to change locale
          </text>
          <text>Hello, {i18n.t('world')}</text>
        </view>       

        <view className='Content'>
          <image src={arrow} className='Arrow' />
          <text className='Description'>Tap the logo and have fun!</text>
          <text className='Hint'>
            Edit<text style={{ fontStyle: 'italic' }}>{' src/App.tsx '}</text>
            to see updates!
          </text>
        </view>
        <view style={{ flex: 1 }}></view>
      </view>
    </view>
  )
}
