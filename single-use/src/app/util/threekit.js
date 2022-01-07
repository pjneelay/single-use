import { logError } from "./logger";
import axios from "axios";

const threekitAPINamespace = "roomBuilder";

const getParentConfigurator = async () => {
    let parentConfigurator = null;
    try {
        const player = await window[threekitAPINamespace]?.api?.enableApi(
            "player"
        );
        parentConfigurator = await player.getConfigurator();
    } catch (e) {
        logError(e);
    }

    return parentConfigurator;
};

const getChildConfigurator = async (
    attributeName,
    parentConfigurator = null
) => {
    let configurator = null;

    try {
        if (!parentConfigurator) {
            parentConfigurator = await getParentConfigurator();
        }

        let itemId = await parentConfigurator.getAppliedConfiguration(
            attributeName
        );
        
        configurator = await window[threekitAPINamespace]?.api?.scene?.get({
            id: itemId,
            evalNode: true,
        }).configurator;
    } catch (e) {
        logError(e);
    }

    return configurator;
};

const getDisplayAttributes = async (attributeName, configurator = null) => {
    let displayAttributes = null;

    try {
        if (!configurator) {
            configurator = await getParentConfigurator();
        }

        displayAttributes = configurator
            .getDisplayAttributes()
            .filter((e) => e.name === attributeName);

        if (displayAttributes && displayAttributes.length > 0) {
            displayAttributes = displayAttributes[0].values
        } else {
            console.log("Configurator was: ", configurator);
            throw `No '${attributeName}' attribute was found for provided configurator.`;
        }
    } catch (e) {
        logError(e);
    }

    return displayAttributes;
};

const getDisplayAttribute = async (
    searchValue,
    attributeName,
    configurator = null,
    by = "name",
) => {
    let value = null;

    try {
        const values = await getDisplayAttributes(attributeName, configurator);
        value = values.filter((e) => e[by] === searchValue)[0];
    } catch (e) {
        logError(e);
    }

    return value;
};

const fetchThumbnail = async (
    environment,
    productId,
    orgId,
    failOnEmpty = true,
    cacheMaxAge = 300,
    cacheScope = "thumbnail",
    bearerToken
) => {
    let response = null;

    try {
        response = await axios.get(
            `https://preview.threekit.com/api/assets/thumbnail/${productId}`,
            {
                params: {
                    orgId,
                    failOnEmpty,
                    cacheMaxAge,
                    cacheScope,
                    bearer_token: bearerToken,
                },
            }
        );
    } catch (e) {
        logError(e);
    }

    return response;
};

const fetchProducts = async (
    environment,
    bearerToken,
    orgId,
    tags = "",
    keywords = ""
) => {
    let response = [];

    try {
        response = await axios.get(
            `https://preview.threekit.com/api/catalog/products`,
            {
                params: {
                    bearer_token: "31755654-4081-45d7-88e1-ee46a673b350",
                    orgId : "0db40a8d-a8fd-4900-8258-963ab37d7eb9",
                    tags,
                    keywords,
                },
            }
        );

        //  Something went wrong with the request
        if (!response || response.status != 200) {
            throw "An error occurred while fetching models.";
        }

        if (response.data && response.data.products) {
            response = response.data.products;
        } else {
            throw "Response has an unexpected structure.";
        }
    } catch (e) {
        logError(e);
    }

    return response;
};

const setConfiguration = async (configurator, configuration) => {
    try {
        void await configurator.setConfiguration(configuration);
    } catch (e) {
        logError(e);
    }
};

const threekitHelper = {
    getParentConfigurator,
    getChildConfigurator,
    getDisplayAttributes,
    getDisplayAttribute,
    fetchProducts,
    fetchThumbnail,
    setConfiguration,
};

export default threekitHelper;
