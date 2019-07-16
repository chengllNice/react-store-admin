
import React from 'react'
import ReactDOM from 'react-dom'
import MarkerContent from './markerContent'
let componentInfoContent = null;
let getRef = (self) => {
  componentInfoContent = self.refs.markerContent;
};

export const markerContentInit = (data, map, el) => {
  ReactDOM.render(<MarkerContent data={data} map={map} el={el} onRef={getRef} />, document.createElement('div'));
  return new Promise((resolve, reject) => {
    resolve(componentInfoContent);
  })
};
