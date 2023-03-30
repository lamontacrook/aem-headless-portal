import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Screen from './components/screen';
import Preview from './components/preview';
import Settings from './utils/settings';
import { ErrorBoundary } from 'react-error-boundary';
import Screendetails from './components/screendetails';
import Error from './components/error';
import { useErrorHandler } from 'react-error-boundary';
import { ThreeDots } from 'react-loader-spinner';
import { accessToken, defaultEndpoint, defaultProject, defaultServiceURL } from './utils';

const App = () => {
  const [authState, setAuthState] = useState({
    auth: sessionStorage.auth || '',
    endpoint: localStorage.endpoint || defaultEndpoint,
    project: localStorage.project || defaultProject,
    loggedin: sessionStorage.loggedin ? JSON.parse(sessionStorage.loggedin) : false,
    serviceURL: localStorage.serviceURL || defaultServiceURL,
    publish: localStorage.publish ? JSON.parse(localStorage.publish) : false,
    rda: localStorage.rda || 'v2',
    useProxy: localStorage.useProxy ? JSON.parse(localStorage.useProxy) : false
  });
  const handleError = useErrorHandler();

  useEffect(() => {

    if (authState.publish || authState.loggedin && authState.auth) return;
    fetch(accessToken)
      .then(response => ({
        res: response.text().then(token => {
          if (token) {
            setAuthState({
              auth: sessionStorage.auth || token,
              endpoint: localStorage.endpoint || defaultEndpoint,
              project: localStorage.project || defaultProject,
              loggedin: sessionStorage.loggedin ? JSON.parse(sessionStorage.loggedin) : true,
              serviceURL: localStorage.serviceURL || defaultServiceURL,
              publish: localStorage.publish ? JSON.parse(localStorage.publish) : false,
              rda: localStorage.rda || 'v2',
              useProxy: localStorage.useProxy ? JSON.parse(localStorage.useProxy) : false
            });
            sessionStorage.setItem('auth', token);
            sessionStorage.setItem('loggedin', true);
          }
        }).catch(error => {
          error.message = `Error fetching token:\n ${error.message}`;
          handleError(error);
        })
      }));

  }), [setAuthState, handleError];

  if (!JSON.parse(authState.publish) && !JSON.parse(authState.loggedin) && authState.auth === '') {
    return (<ThreeDots
      height='120'
      width='120'
      radius='9'
      color='rgba(41,41,41)'
      ariaLabel='three-dots-loading'
      wrapperStyle={{}}
      wrapperClassName='.loading'
      visible={true}
    />);
  } else {
    return (
      <div className='App'>
        <HashRouter>
          <Routes>
            <Route exact={true} path={'/preview/*'} element={
              <ErrorBoundary
                FallbackComponent={Error}
                onReset={() => {
                  sessionStorage.removeItem('loggedin');
                  sessionStorage.removeItem('auth');
                }}
              ><Preview context={authState} /></ErrorBoundary>
            } />

            <Route exact={true} path={'/settings'} element={
              <ErrorBoundary
                FallbackComponent={Error}
                onReset={() => {
                  sessionStorage.removeItem('loggedin');
                  sessionStorage.removeItem('auth');
                }}
              >
                <Settings context={authState} /> </ErrorBoundary>} />
            <Route exact={false} path={'/*'} element={

              <ErrorBoundary
                FallbackComponent={Error}
                onReset={() => {
                  sessionStorage.removeItem('loggedin');
                  sessionStorage.removeItem('auth');
                }}
              ><Screen context={authState} /></ErrorBoundary>

            } />

            <Route exact={true} path={'/aem-pure-headless/*'} element={

              <ErrorBoundary
                FallbackComponent={Error}
                onReset={() => {
                  sessionStorage.removeItem('loggedin');
                  sessionStorage.removeItem('auth');
                }}
              ><Screen context={authState} /></ErrorBoundary>

            } />
            <Route exact={true} path={`/${authState.project}/*`} element={
              <ErrorBoundary
                FallbackComponent={Error}
                onReset={() => {
                  sessionStorage.removeItem('loggedin');
                  sessionStorage.removeItem('auth');
                }}
              ><Screendetails context={authState} /></ErrorBoundary>
            } />

          </Routes>
        </HashRouter>
      </div>
    );
  }
};

export default App;

