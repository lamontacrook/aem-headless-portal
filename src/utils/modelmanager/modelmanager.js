import React from 'react';
import Teaser from '../../components/teaser';
import Card from '../../components/card';
import Article from '../../components/article';
import PageRef from '../../components/pageref';
import ImageList from '../../components/imagelist';
import PropTypes from 'prop-types';

export const componentMapping = {
  Teaser,
  Card,
  PageRef,
  Article,
  ImageList
};

const ModelManager = ({ content, config }) => {
  if(!content.__typename) return;
  let type = content.__typename.replace(/Model/g, '');
  if(type.includes('Card'))  type = 'Card';
  const Component = componentMapping[type];
 
  if (typeof Component !== 'undefined')
    return <Component content={content} config={config} />;
  else return <p>Neet to add {type} to ModelManager.</p>;
};

ModelManager.propTypes = {
  type: PropTypes.string,
  content: PropTypes.object,
  references: PropTypes.string,
  config: PropTypes.object,
  context: PropTypes.object
};

export default ModelManager;
