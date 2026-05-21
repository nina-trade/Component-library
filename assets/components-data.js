// Section catalog scraped from /Users/nina/trade-component-library on 2026-05-21.
// Source: assets/list_theme_files output from the Shopify MCP against preview theme 186163495231.
// Refresh this list when sections are added or removed.

window.LIB_COMPONENTS = [
  'account-redirect',
  'active-subscriber-redirect',
  'anchor-cards',
  'announcement',
  'article',
  'banner-two-column',
  'banner-v2',
  'banner',
  'bestseller-anchors',
  'block-50-50',
  'block-hero',
  'blog-category',
  'blog-list',
  'blog-rails-filters',
  'blog-rails',
  'breadcrumb',
  'breakpoint-demo',
  'brew-guide',
  'buy-box-v2',
  'calculating-screen',
  'cards-v2',
  'cards',
  'carousel-block',
  'cart-icon-bubble',
  'coffee-type-selector-v2',
  'coffee-type-selector',
  'collection-cards',
  'collection-default-header',
  'collection-detail',
  'collection-product-list',
  'collection-product-rail',
  'collection-quick-view',
  'condensed-hero',
  'countdown-timer',
  'cta-hero',
  'customer-redirect',
  'dynamic-onboarding-banner',
  'email-preview',
  'embed-klaviyo-form',
  'faq',
  'fifty-fifty',
  'footer',
  'full-banner',
  'gift-benefits',
  'gift-hero-2024',
  'gift-product-checkout',
  'gift-product-info',
  'gift-redeem-v2',
  'gift-redeem',
  'gift-video',
  'gorgias-contact-form',
  'grind-selector-v2',
  'grind-selector',
  'header',
  'hero-login',
  'hero',
  'home-collection',
  'homepage-cro-prototype',
  'image',
  'information-module',
  'instafeed',
  'intro-scrolling',
  'layout-group-end',
  'layout-group-split',
  'layout-group-start',
  'logo-carousel',
  'logos-bar',
  'main-collection-banner',
  'main-collection-product-grid',
  'main-page',
  'marquee',
  'media-partners',
  'media-quote-banner',
  'onboarding-discounts',
  'onboarding-step-progress-rebrand',
  'onboarding-step-progress',
  'onboarding-step',
  'one-click',
  'one-page-quiz-email-capture',
  'one-page-quiz-loading-gif-screen',
  'one-page-quiz-loading-screen',
  'one-page-quiz-preview',
  'one-page-quiz-results-section',
  'one-page-quiz',
  'partner-spotlight',
  'pdp-layout-with-gallery',
  'pdp-layout',
  'product-about',
  'product-accordion',
  'product-brand',
  'product-callouts-v2',
  'product-checkout-v2',
  'product-checkout-v3',
  'product-checkout',
  'product-coffee-making-steps',
  'product-collection',
  'product-comparison-table',
  'product-get-started',
  'product-gift-details',
  'product-hero',
  'product-how-to-trade',
  'product-image',
  'product-info-v2',
  'product-info',
  'product-main',
  'product-plan-interval-selector',
  'product-plan-selector-v2',
  'product-plan-selector',
  'product-price-info',
  'product-rail-v2',
  'product-size-selector',
  'product-variant-selector',
  'product-why-we-picked',
  'quiz-app',
  'quiz-header',
  'quiz-product-hero',
  'quiz-product-plan',
  'quiz-redirect',
  'quiz-results-padding',
  'quiz-results-v2-add-ons',
  'quiz-results-v2-benefits',
  'quiz-results-v2-footer',
  'quiz-results-v2-header',
  'quiz-results-v2-hero-card',
  'quiz-results-v2-order-summary',
  'quiz-results-v2-queue',
  'quiz-results-v2-subscription-details',
  'quiz-results-v2-timeline',
  'quiz-results-version',
  'quiz-results',
  'quote-block',
  'ratings-and-reviews',
  'react-quiz',
  'recent-delivery',
  'recent-dilivery',
  'related-products',
  'reviews',
  'rich-text',
  'roaster-header',
  'starter-pack-product-card',
  'sub-cards',
  'subscribe',
  'testimonials-v3',
  'tiles',
  'trade-50-50-offset',
  'trade-bullet-points',
  'trade-coffee-highlight',
  'trade-header',
  'trade-hero-2',
  'trade-hero-3',
  'trade-hero-bg-image',
  'trade-hero-redeem',
  'trade-hero',
  'trade-merch-50-50',
  'trade-merch-announcement',
  'trade-merch-bookend',
  'trade-merch-curated-set',
  'trade-merch-split-column',
  'trade-mission-statement',
  'trade-nav-minimal',
  'trade-plans',
  'trade-product-rail',
  'trade-pull-quote',
  'trade-roaster-split-column',
  'trade-stacked-bullets-with-intro',
  'trade-sticky-cta',
  'trade-sticky-scroll',
  'trade-swipeable-cards',
  'trade-testimonials',
  'trade-text-showcase',
  'trade-text-ticker',
  'trade-ticker',
  'trade-ugc-carousel-testimonials',
  'trade-value-props',
  'trigger-klaviyo-form',
  'two-column-blocks',
  'ugc-carousel',
  'upsell-banner',
  'upsell-list',
  'upsell-prepaid',
  'upsell-products',
  'upsell-reactivate',
  'upsell-tiles',
  'yotpo-rewards'
];

// Categorize each section by name pattern. Tweak this function to recategorize.
window.LIB_CATEGORIZE = function (name) {
  if (name === 'trade-sticky-cta') return 'Layout / Nav';
  if (name.startsWith('trade-hero') || name === 'hero' || name === 'hero-login' ||
      name === 'condensed-hero' || name === 'cta-hero' || name === 'gift-hero-2024' ||
      name === 'block-hero') return 'Hero';
  if (name.startsWith('trade-')) return 'Brand sections';
  if (name.startsWith('quiz-') || name === 'quiz-app' || name === 'react-quiz' ||
      name.startsWith('one-page-quiz')) return 'Quiz / Find My Match';
  if (name.startsWith('onboarding-') || name === 'dynamic-onboarding-banner' ||
      name === 'calculating-screen') return 'Onboarding';
  if (name.startsWith('product-') || name.startsWith('pdp-') ||
      name === 'buy-box-v2' || name === 'subscribe' ||
      name === 'starter-pack-product-card' || name === 'roaster-header' ||
      name.startsWith('coffee-type-selector') || name.startsWith('grind-selector')) return 'Product / PDP';
  if (name.startsWith('collection-') || name.startsWith('main-collection-') ||
      name === 'home-collection' || name === 'related-products' ||
      name === 'bestseller-anchors' || name === 'partner-spotlight') return 'Collection / PLP';
  if (name.startsWith('account-') || name === 'customer-redirect' ||
      name === 'active-subscriber-redirect' || name === 'recent-delivery' ||
      name === 'recent-dilivery' || name === 'yotpo-rewards') return 'Account / Subscriber';
  if (name.startsWith('gift-')) return 'Gift';
  if (name === 'header' || name === 'footer' || name === 'breadcrumb' ||
      name === 'announcement' || name === 'cart-icon-bubble' ||
      name.startsWith('layout-group-')) return 'Layout / Nav';
  if (name.startsWith('blog-') || name === 'article') return 'Blog';
  if (name.startsWith('upsell-')) return 'Upsell';
  if (name === 'email-preview' || name === 'breakpoint-demo' ||
      name.startsWith('gorgias-') || name === 'homepage-cro-prototype') return 'Utility / Dev';
  if (name.startsWith('embed-klaviyo') || name.startsWith('trigger-klaviyo') ||
      name.startsWith('countdown-') || name === 'instafeed') return 'Integrations';
  return 'Marketing blocks';
};

// Flag legacy / versioned / typo'd sections for audit.
window.LIB_FLAGS = function (name, all) {
  var flags = [];
  // If a -v2 or -v3 sibling exists, the unsuffixed version is legacy
  if (all.indexOf(name + '-v2') !== -1) flags.push('superseded by ' + name + '-v2');
  if (all.indexOf(name + '-v3') !== -1) flags.push('superseded by ' + name + '-v3');
  // If a -rebrand sibling exists, the original is legacy
  if (all.indexOf(name + '-rebrand') !== -1) flags.push('superseded by ' + name + '-rebrand');
  // Specific known issues
  if (name === 'recent-dilivery') flags.push('typo of recent-delivery — likely orphaned');
  if (name === 'trade-hero-2' || name === 'trade-hero-3') flags.push('numbered variant of trade-hero');
  if (name === 'cards' && all.indexOf('cards-v2') !== -1) flags.push('superseded by cards-v2');
  if (name === 'banner' && all.indexOf('banner-v2') !== -1) flags.push('superseded by banner-v2');
  if (name === 'homepage-cro-prototype') flags.push('prototype only — preview theme');
  return flags;
};
