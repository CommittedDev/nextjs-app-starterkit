import {
  mechanicalPropertiesData,
  operationalPropertiesData,
  waterOriginData,
  operationCostsData,
  enironmentalData,
  waterAnalysisData,
  customersProblemsAndRequestsData,
  thermodynamicCalculationsData,
  potentialWaterSavingData,
  predictiveWaterAnalysis,
  sizingFactorsData,
  sizingOfReactorsData,
  modelConfigurationData,
  UETCirculationFlowrateData,
  theoreticalEnergySavingsData,
  ROICalculationData,
  UETWorkingParameters
} from 'src/components/data'
const defaultValues = {};

[...mechanicalPropertiesData,
...operationalPropertiesData,
...waterOriginData,
...operationCostsData,
...enironmentalData,
...waterAnalysisData,
...customersProblemsAndRequestsData,
...thermodynamicCalculationsData,
...potentialWaterSavingData,
...predictiveWaterAnalysis,
...sizingFactorsData,
...sizingOfReactorsData,
...modelConfigurationData,
...UETCirculationFlowrateData,
...theoreticalEnergySavingsData,
...ROICalculationData,
...UETWorkingParameters
].forEach(item => {
  item.fields.forEach((field) => {
    defaultValues[field.location] = field.defaultValue
  })
  defaultValues['e30'] = 0 // because its is not in the tables data, it is sepereted
});

// sizing Factors 
defaultValues['j47'] = 50;
defaultValues['j48'] = 10;
defaultValues['j49'] = 20;
defaultValues['j50'] = 100;
defaultValues['j51'] = 50;
defaultValues['j52'] = 10;
defaultValues['j53'] = 50;
defaultValues['j54'] = 25;
defaultValues['j55'] = 1;

const initialState = {
  windowSize: {},
  tablesData: {
    data: defaultValues,
    loading: false,
    error: null
  },
};
export default initialState;
