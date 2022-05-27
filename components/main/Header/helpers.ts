import { TransportSearchRequestData } from 'api/models/catalog';
import { getBrands, getEngines, getModel } from 'api/routes/transport';

const addItemToLocaleStorage = ({ slug, title }: Record<string, string>) => {
  try {
    localStorage.setItem(slug, title);
  } catch (error) {
    if (error == 'QUOTA_EXCEEDED_ERR') {
      console.warn('Не достаточно места в localStorage');
    }
  }
};

const getTransportTitles = async (
  transportSlugs: TransportSearchRequestData,
) => {
  const { brandSlug, modelSlug, yearSlug, engineSlug } = transportSlugs;

  const brandTitle = localStorage[brandSlug];
  const modelTitle = localStorage[modelSlug];
  const year = localStorage[yearSlug];
  const engineTitle = localStorage[engineSlug];

  const getBrandTitle = async () => {
    const brands = await getBrands();
    const brand = brands.find((brand) => brand.slug === brandSlug);

    if (!brand) {
      return '';
    }

    addItemToLocaleStorage({
      slug: brandSlug,
      title: brand.title,
    });

    return brand.title;
  };

  const getModelTitle = async () => {
    const models = await getModel({ brandSlug });
    const model = models.find((model) => model.slug === modelSlug);

    if (!model) {
      return '';
    }

    addItemToLocaleStorage({
      slug: modelSlug,
      title: model.title,
    });

    return model.title;
  };

  const getEngineTitle = async () => {
    const engines = await getEngines({ brandSlug, modelSlug, yearSlug });
    const engine = engines.find((engine) => engine.slug === engineSlug);

    if (!engine) {
      return '';
    }

    addItemToLocaleStorage({
      slug: engineSlug,
      title: engine.title,
    });

    return engine.title;
  };

  return {
    brand: brandTitle || (await getBrandTitle()),
    model: modelTitle || (await getModelTitle()),
    year: year || yearSlug,
    engine: engineTitle || (await getEngineTitle()),
  };
};

export { addItemToLocaleStorage, getTransportTitles };
