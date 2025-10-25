import React, { createContext, useState, useEffect } from "react";
 
export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [model, setModel] = useState("");
  const [imageModel, setImageModel] = useState("");
  const [realtimeModel, setRealtimeModel] = useState("");
  const [models, setModels] = useState([]);
  const [imageModels, setImageModels] = useState([]);
  const [realtimeModels, setRealtimeModels] = useState([]);
  const [isModelReady, setIsModelReady] = useState(false);
  const [alias, setAlias] = useState("");
  const [temperature, setTemperature] = useState(1);
  const [reason, setReason] = useState(0.5);
  const [verbosity, setVerbosity] = useState(0.5);
  const [systemMessage, setSystemMessage] = useState("");
  const [isInference, setIsInference] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isDeepResearch, setIsDeepResearch] = useState(false);
  const [isDAN, setIsDAN] = useState(false);
  const [hasImage, setHasImage] = useState(false); // Has Image in Chat
  const [mcpList, setMCPList] = useState([]);
  const [canControlTemp, setCanControlTemp] = useState(false);
  const [canControlReason, setCanControlReason] = useState(false);
  const [canControlVerbosity, setCanControlVerbosity] = useState(false);
  const [canControlSystemMessage, setCanControlSystemMessage] = useState(false);
  const [canReadImage, setCanReadImage] = useState(false); // Can Read Image (Chat Mode)
  const [canEditImage, setCanEditImage] = useState(false); // Can Edit Image (Image Mode)
  const [canToggleInference, setCanToggleInference] = useState(false);
  const [canToggleSearch, setCanToggleSearch] = useState(false);
  const [canToggleDeepResearch, setCanToggleDeepResearch] = useState(false);
  const [canToggleMCP, setCanToggleMCP] = useState(false);
  const [maxImageInput, setMaxImageInput] = useState(1);
  
  // Azure AI settings
  const [azureApiKey, setAzureApiKey] = useState(localStorage.getItem('azureApiKey') || '');
  const [useAzureAI, setUseAzureAI] = useState(localStorage.getItem('useAzureAI') === 'true');

  const fetchModels = async () => {
    try {
      // Use static Azure AI models since we're working directly with Azure
      const azureModels = [
        {
          model_name: "gpt-4o-mini",
          model_alias: "GPT-4o Mini (Azure)",
          capabilities: {
            image: true,
            inference: false,
            search: false,
            deep_research: false,
            mcp: false
          },
          controls: {
            temperature: true,
            reason: false,
            verbosity: false,
            system_message: true
          }
        }
      ];

      setModels(azureModels);
      setImageModels(azureModels);
      setRealtimeModels([]);

      updateModel("gpt-4o-mini", null, azureModels);
      updateImageModel("gpt-4o-mini", azureModels);
      updateRealtimeModel(null, []);

    } catch (error) {
      console.error('Failed to set up Azure models:', error);
      setModels([]);
      setImageModels([]);
      setRealtimeModels([]);
    } finally {
      setIsModelReady(true);
    }
  };

  useEffect(() => {
    fetchModels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateModel = (newModel, modelConfig, initialModelsList) => {
    const modelsArray = initialModelsList || models;
    const selectedModel = modelsArray.find(m => m.model_name === newModel);
    setModel(newModel);
    
    const temperature = selectedModel?.controls?.temperature;
    const reason = selectedModel?.controls?.reason;
    const verbosity = selectedModel?.controls?.verbosity;
    const system_message = selectedModel?.controls?.system_message;
    const inference = selectedModel?.capabilities?.inference;
    const search = selectedModel?.capabilities?.search;
    const deep_research = selectedModel?.capabilities?.deep_research;
    const image = selectedModel?.capabilities?.image;
    const mcp = selectedModel?.capabilities?.mcp;

    let nextIsInference;

    if (inference === "toggle" || inference === "switch") {
      setCanToggleInference(true);
      if (modelConfig) {
        setIsInference(modelConfig.isInference);
        nextIsInference = modelConfig.isInference;
      } else {
        nextIsInference = isInference;
      }
    } else {
      setCanToggleInference(false);
      setIsInference(inference);
      nextIsInference = inference;
    }

    if (search === "toggle" || search === "switch") {
      setCanToggleSearch(true);
      if (modelConfig) {
        setIsSearch(modelConfig.isSearch);
      }
    } else {
      setCanToggleSearch(false);
      setIsSearch(search);
    }

    if (deep_research === "toggle" || deep_research === "switch") {
      setCanToggleDeepResearch(true);
      if (modelConfig) {
        setIsDeepResearch(modelConfig.isDeepResearch);
      }
    } else {
      setCanToggleDeepResearch(false);
      setIsDeepResearch(deep_research);
    }

    setCanControlTemp(temperature === true || temperature === "conditional");
    setCanControlReason(reason === true && nextIsInference === true);
    setCanControlVerbosity(verbosity === true);

    setCanControlSystemMessage(system_message);
    if (!system_message) setIsDAN(false);

    setCanReadImage(image);
    setCanToggleMCP(mcp);
    setMCPList(mcp ? mcpList : []);
  };

  const toggleInference = () => {
    const selectedModel = models.find(m => m.model_name === model);
    const inference = selectedModel?.capabilities?.inference;
    const temperature = selectedModel?.controls?.temperature;
    const reason = selectedModel?.controls?.reason;
    
    const nextIsInference = !isInference;

    if (inference === "switch") {
      const variants = selectedModel?.variants;
      const targetModel = nextIsInference ? variants?.inference : variants?.base;
      if (targetModel) {
        updateModel(targetModel);
      }
    } 

    setIsInference(nextIsInference);

    setCanControlTemp(temperature === true || (temperature === "conditional" && !nextIsInference));
    setCanControlReason(reason === true && nextIsInference === true);
  };

  const toggleSearch = () => {
    const selectedModel = models.find(m => m.model_name === model);
    const search = selectedModel?.capabilities?.search;
    
    if (search === "switch") {
      const variants = selectedModel?.variants;
      const targetModel = isSearch ? variants?.base : variants?.search;
      if (targetModel) {
        updateModel(targetModel);
      }
    }
    
    setIsSearch(!isSearch);
  };

  const toggleDeepResearch = () => {
    const selectedModel = models.find(m => m.model_name === model);
    const deep_research = selectedModel?.capabilities?.deep_research;
    
    if (deep_research === "switch") {
      const variants = selectedModel?.variants;
      const targetModel = isDeepResearch ? variants?.base : variants?.deep_research;
      if (targetModel) {
        updateModel(targetModel);
      }
    }
    
    setIsDeepResearch(!isDeepResearch);
  };

  const updateImageModel = (newImageModel, initialImageModelsList) => {
    const imageModelsArray = initialImageModelsList || imageModels;
    const selectedImageModel = imageModelsArray.find(m => m.model_name === newImageModel);
    setImageModel(newImageModel);
    
    const imageConfig = selectedImageModel?.capabilities?.image;
    const type = imageConfig?.type;
    const maxInput = imageConfig?.max_input;
    
    setCanEditImage(type === "switch" || type === true);
    setMaxImageInput(maxInput);
  };

  const updateRealtimeModel = (newRealtimeModel, initialRealtimeModelsList) => {
    setRealtimeModel(newRealtimeModel);
  };

  const switchImageMode = (hasUploadedImages) => {
    const selectedImageModel = imageModels.find(m => m.model_name === imageModel);
    const imageConfig = selectedImageModel?.capabilities?.image;
    const type = imageConfig?.type;
    
    if (type === "switch") {
      const variants = selectedImageModel?.variants;
      if (hasUploadedImages) {
        const targetModel = variants?.image;
        if (targetModel) {
          updateImageModel(targetModel);
        }
      } else {
        const targetModel = variants?.base;
        if (targetModel) {
          updateImageModel(targetModel);
        }
      }
    }
  };

  // Azure API key management
  const updateAzureApiKey = (key) => {
    setAzureApiKey(key);
    localStorage.setItem('azureApiKey', key);
  };

  const toggleAzureAI = (enabled) => {
    setUseAzureAI(enabled);
    localStorage.setItem('useAzureAI', enabled.toString());
  };

  return (
    <SettingsContext.Provider
      value={{
        models,
        imageModels,
        realtimeModels,
        model,
        imageModel,
        realtimeModel,
        isModelReady,
        alias,
        temperature,
        reason,
        verbosity,
        systemMessage,
        hasImage,
        isInference,
        isSearch,
        isDeepResearch,
        isDAN,
        mcpList,
        canControlTemp,
        canControlReason,
        canControlVerbosity,
        canControlSystemMessage,
        canEditImage,
        canToggleInference, 
        canToggleSearch,
        canToggleDeepResearch, 
        canToggleMCP,
        canReadImage,
        maxImageInput,
        azureApiKey,
        useAzureAI,
        updateModel,
        updateImageModel,
        updateRealtimeModel,
        setAlias,
        setTemperature,
        setReason,
        setVerbosity,
        setSystemMessage,
        setHasImage,
        setIsDAN,
        setMCPList,
        toggleInference,
        toggleSearch,
        toggleDeepResearch,
        switchImageMode,
        updateAzureApiKey,
        toggleAzureAI
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};