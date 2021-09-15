import React from 'react'
import 'antd/dist/antd.css'
import "../public/css/global.scss"
import "../public/css/ant-custom.scss"
import Router from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {store} from '../redux/store'
import {Provider} from 'react-redux'
import AuthProvider from '../graphql/Connection'


Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());


const App = ({Component,pageProps})=>{
    return <Provider store={store}><AuthProvider><Component {...pageProps}/></AuthProvider></Provider>
}

export default App