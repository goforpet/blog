export { wrapPageElement, wrapRootElement } from './gatsby-browser';

export const onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({
    itemScope: true,
    itemType: 'http://schema.org/WebPage'
  });
};
