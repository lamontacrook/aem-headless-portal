import React from 'react';
import PropTypes from 'prop-types';
import Image from '../image';
import { mapJsonRichText } from '../../utils/renderRichText';
import './card.css';

const Card = ({ content, config }) => {
  const cardType = content.__typename;
  const Element = `${content.titleTag}`;
  const editorProps = {
    itemID: `urn:aemconnection:${content._path}/jcr:content/data/master`,
    itemType: 'reference',
    itemfilter: 'cf',
    'data-editor-itemlabel': 'Card'
  };

  return (
    <div {...editorProps} className={`card ${cardType?.toLowerCase()}`} itemScope>
      <div className='card-content'>
        <Element itemProp='title' itemType='text' data-editor-itemlabel='Title'>{content.title}</Element>
        <div className='content' itemProp='description' itemType='richtext' data-editor-itemlabel='Description'>{mapJsonRichText(content.description.json)}</div>
        <div className='cta button'><a href={content.callToAttentionRef['_path']}>{content.callToAttention}</a></div>
      </div>
      <Image asset={content.asset} itemProp='backgroundAsset' alt={content.title} config={config} />
    </div>
  );
};

Card.propTypes = {
  content: PropTypes.object,
  config: PropTypes.object
};

// function customRenderOptions(references) {

//   const renderReference = {
//     // node contains merged properties of the in-line reference and _references object
//     'ImageRef': (node) => {
//       // when __typename === ImageRef
//       return <img src={node._path} alt={'in-line reference'} />;
//     },
//     'AdventureModel': (node) => {
//       // when __typename === AdventureModel
//       return <Link to={`/adventure:${node.slug}`}>{`${node.title}: ${node.price}`}</Link>;
//     }
//   };

//   return {
//     nodeMap: {
//       'reference': (node, children) => {

//         // variable for reference in _references object
//         let reference;

//         // asset reference
//         if (node.data.path) {
//           // find reference based on path
//           reference = references.find(ref => ref._path === node.data.path);
//         }
//         // Fragment Reference
//         if (node.data.href) {
//           // find in-line reference within _references array based on href and _path properties
//           reference = references.find(ref => ref._path === node.data.href);
//         }

//         // if reference found return render method of it
//         return reference ? renderReference[reference.__typename]({ ...reference, ...node }) : null;
//       }
//     },
//   };
// }

export default Card;
