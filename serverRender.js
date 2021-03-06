//fetch data from api and make them available for client (index.js)

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import axios from 'axios';

import config from './config';
import App from './src/components/App';

const getApiUrl = (contestId) => {
  if(contestId){
    return `${config.getServerUrl()}/api/contests/${contestId}`;
  }else{
    return `${config.getServerUrl()}/api/contests`;
  }
};

const getInitialData = (contestId, apiData) =>{
  if(contestId){
    return{
      currentContestId: apiData._id,
      contests:{
        [apiData._id]:apiData
      }
    };
  }

  return {
    contests: apiData.contests
  };
};

const serverRender = (contestId) =>
  axios.get(getApiUrl(contestId))
    .then(resp => {
      const initialData = getInitialData(contestId, resp.data);
      return {
        initialDom: ReactDOMServer.renderToString(
          <App initialData={initialData} />
        ),
        initialData
      };
    });

export default serverRender;