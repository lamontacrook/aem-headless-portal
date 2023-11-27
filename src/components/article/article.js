import React from 'react';
import PropTypes from 'prop-types';
import Image from '../image';
import { mapJsonRichText } from '../../utils/renderRichText';
import './article.css';

const Article = ({ content, config }) => {
  const ArticleType = content.__typename;
  const Element = `${content.titleTag}`;
  const editorProps = {
    itemID: `urn:aemconnection:${content._path}/jcr:content/data/master`,
    itemType: 'reference',
    itemfilter: 'cf',
    'data-editor-itemlabel': 'Article'
  };

  return (
    <div {...editorProps} className='article' itemScope>
      <div className='article-content'>
        <div className='content' itemProp='article' itemType='richtext' data-editor-itemlabel='Body'>{mapJsonRichText(content.article.json)}</div>
      </div>
    </div>
  );
};

Article.propTypes = {
  content: PropTypes.object,
  config: PropTypes.object
};

export default Article;
