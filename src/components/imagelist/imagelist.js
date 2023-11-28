/*
Copyright 2023 Adobe
All Rights Reserved.
NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { LinkManager } from '../../utils';
import Image from '../image';
import './imagelist.css';
import { AppContext } from '../../utils/context';
import { sizes } from '../../utils/responsive-image';

export const ImageListGQL = `
...on ImageListModel {
  _model {
    title
    _path
  }
  _metadata {
    stringMetadata {
      value
    }
  }
  imageListItems {
    ...on PageRef {
      _authorUrl
      _publishUrl
    }
  }
}`;

const imageSizes = [
  {
    imageWidth: '500px',
    renditionName: 'web-optimized-large.webp',
    size: '(min-width: 1000px) 500px',
  },
  {
    imageWidth: '331px',
    renditionName: 'web-optimized-medium.webp',
    size: '331px'
  }
];

const ImageList = ({ content, config }) => {
  const [position, setPosition] = useState(0);

  const title = content._metadata.stringMetadata.map(item => {
    if (item.name === 'title') return item.value;
    else return '';
  });

  const scrollLeft = (e, num) => {
    const element = e.target.nextElementSibling;
    element.scrollTo({
      left: position - num,
      behavior: 'smooth'
    });

    setPosition(position - num);

  };

  const scrollRight = (e, num) => {
    const element = e.target.previousElementSibling;
    element.scrollTo({
      left: position + num,
      behavior: 'smooth'
    });

    setPosition(position + num);

  };

  const containerChange = (e) => {

    if ((e.target.scrollWidth - e.target.clientWidth - .5) <= e.target.scrollLeft) {
      e.target.nextElementSibling.style.visibility = 'hidden';
    } else {
      e.target.nextElementSibling.style.visibility = 'visible';
    }

    if (e.target.scrollLeft === 0)
      e.target.previousElementSibling.style.display = 'none';
    else
      e.target.previousElementSibling.style.display = 'unset';
  };

  return (
    <React.Fragment>
      <section className={`${content.style} list-container`}>
        {title && <h4>{title.join('')}</h4>}
        <i className='arrow left' onClick={e => scrollLeft(e, 300)}></i>
        <div className='list' id='list-container-body' onScroll={e => containerChange(e)}>

          {content && content.imageListItems.map((item) => (
            <ArticleCard key={item._path} item={item} config={config} />
          ))}

        </div>
        <i className='arrow right' onClick={e => scrollRight(e, 300)}></i>
      </section>
    </React.Fragment>
  );
};

ImageList.propTypes = {
  content: PropTypes.object,
  config: PropTypes.object,
  context: PropTypes.object
};

const Card = ({ item, config }) => {
  const context = useContext(AppContext);
  const itemProps = {
    itemID: `urn:aemconnection:${item.path}/jcr:content/root/container`,
    itemType: 'container',
    'data-editor-itemlabel': 'Experience Fragment'
  };
  return (
    <div className='list-item' key={item.title.id} {...itemProps}>
      <picture>
        <img src={item?.image?.src} loading='lazy'
          alt={item?.image?.alt || 'list image'}
          srcSet={item?.image?.srcset}
          width="500"
          height="333"
          sizes={sizes(imageSizes)} />
      </picture>

      <Link key={item.path} to={LinkManager(item.path, config, context)} name={item.title.text || item.name}>
        <span className='title' {...item.title.props}>{item.title.text || item.name}</span>
        {item.style === 'image-grid' && (
          <div className='details'>
            <ul>
              <li {...item.profession?.props}>{item.profession?.text}</li>
            </ul>
          </div>
        )}
      </Link>
    </div>
  );
};

Card.propTypes = {
  item: PropTypes.object,
  config: PropTypes.object,
  context: PropTypes.object,
};

// const XFImage = ({ item }) => {
//   let pic = document.createElement('picture');

//   pic.innerHTML = item.image;

//   pic.querySelector('img');

//   return (
//     <React.Fragment >
//       {new XMLSerializer().serializeToString(pic)}
//     </React.Fragment>

//   );
// };

// XFImage.propTypes = {
//   item: PropTypes.string
// };

const ArticleCard = ({ item, config }) => {
  const context = useContext(AppContext);

  const articleCardImageSizes = [
    {
      imageWidth: '350px',
      renditionName: 'web-optimized-small.webp',
      size: '350px'
    }
  ];

  let width = 500;
  let height = 360;

  if (item.style === 'image-grid') {
    width = 350;
    height = 320;
  }

  const date = new Date(item.publishDate);
  const categories = {
    'about-trane': 'About Trane',
    'press-release': 'Press Release'
  };


  return (
    <div className='list-item' key={item._path} itemID={`urn:aemconnection:${item._path}/jcr:content/data/master`}
      itemfilter='cf' itemType='reference' data-editor-itemlabel='Related Article' itemScope>
      <Image asset={item.thumbnail} config={config} alt={item.title} itemProp='thumbnail' width={width} height={height} imageSizes={articleCardImageSizes} />
      <Link key={item.path} name='test' to={LinkManager(item._path, config, context)}>
        <div className='details'>
          <ul>
            <li itemProp='category' itemType='text'>{`${categories[item.category]} ${item.timeToRead} min read`}</li>
            <li itemProp='activityLength' itemType='text'><strong>{item.title}</strong></li>
            <li itemProp='publishDate' itemType='text'>{`${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`}</li>
          </ul>
        </div>
      </Link>
    </div>
  );
};

ArticleCard.propTypes = {
  item: PropTypes.object,
  config: PropTypes.object,
  context: PropTypes.object,
};

export default ImageList;
