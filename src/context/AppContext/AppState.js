import { useEffect, useState } from "react";

import AppContext from "./AppContext";

const AppState = ({ children }) => {




  const [appState, setAppState] = useState({
    // endpoints: [
    //   {
    //     id: "storage-buckets",
    //     name: "storage_buckets",
    //     description:
    //       "Retrieves a list of buckets for a given project, ordered in the list lexicographically by name.",
    //     selected: true,
    //     children: [],
    //     selectedWorkflows: [{ name: "Ingestion workflow", id: "" }],
    //     inputParams: {
    //       project: "bigquery-storage-buckets",
    //       api_key: "lD9pxYKT9BinTpT5wSlveaCOu5AYxiryZZDJKI9I",
    //     },
    //     selectedOutputParams: [],
    //     outputParams: [
    //       "kind",
    //       "nextPageToken",
    //       "items.kind",
    //       "items.selfLink",
    //       "items.id",
    //       "items.name",
    //       "items.projectNumber",
    //       "items.metageneration",
    //       "items.location",
    //       "items.storageClass",
    //       "items.etag",
    //       "items.defaultEventBasedHold",
    //       "items.timeCreated",
    //       "items.updated",
    //       "items.encryption.defaultKmsKeyName",
    //       "items.acl.kind",
    //       "items.acl.id",
    //       "items.acl.selfLink",
    //       "items.acl.bucket",
    //       "items.acl.entity",
    //       "items.acl.role",
    //       "items.acl.email",
    //       "items.acl.domain",
    //       "items.acl.entityId",
    //       "items.acl.etag",
    //       "items.acl.projectTeam.projectNumber",
    //       "items.acl.projectTeam.team",
    //       "items.defaultObjectAcl.kind",
    //       "items.defaultObjectAcl.entity",
    //       "items.defaultObjectAcl.role",
    //       "items.defaultObjectAcl.email",
    //       "items.defaultObjectAcl.entityId",
    //       "items.defaultObjectAcl.domain",
    //       "items.defaultObjectAcl.projectTeam.projectNumber",
    //       "items.defaultObjectAcl.projectTeam.team",
    //       "items.defaultObjectAcl.etag",
    //       "items.website.mainPageSuffix",
    //       "items.website.notFoundPage",
    //       "items.owner.entity",
    //       "items.owner.entityId",
    //       "items.logging.logBucket",
    //       "items.logging.logObjectPrefix",
    //       "items.cors.origin",
    //       "items.cors.method",
    //       "items.cors.responseHeader",
    //       "items.cors.maxAgeSeconds",
    //       "items.versioning.enabled",
    //       "items.lifecycle.rule.action.storageClass",
    //       "items.lifecycle.rule.action.type",
    //       "items.lifecycle.rule.condition.age",
    //       "items.lifecycle.rule.condition.createdBefore",
    //       "items.lifecycle.rule.condition.isLive",
    //       "items.lifecycle.rule.condition.numNewerVersions",
    //       "items.lifecycle.rule.condition.matchesStorageClass",
    //       "items.lifecycle.rule.condition.daysSinceCustomTime",
    //       "items.lifecycle.rule.condition.customTimeBefore",
    //       "items.lifecycle.rule.condition.daysSinceNoncurrentTime",
    //       "items.lifecycle.rule.condition.noncurrentTimeBefore",
    //       "items.lifecycle.rule.condition.matchesPrefix",
    //       "items.lifecycle.rule.condition.matchesSuffix",
    //       "items.autoclass.enabled",
    //       "items.autoclass.toggleTime",
    //       "items.autoclass.terminalStorageClass",
    //       "items.autoclass.terminalStorageClassUpdateTime",
    //       "items.labels.(key)",
    //       "items.retentionPolicy.retentionPeriod",
    //       "items.retentionPolicy.effectiveTime",
    //       "items.retentionPolicy.isLocked",
    //       "items.billing.requesterPays",
    //       "items.iamConfiguration.publicAccessPrevention",
    //       "items.iamConfiguration.uniformBucketLevelAccess.enabled",
    //       "items.iamConfiguration.uniformBucketLevelAccess.lockedTime",
    //       "items.locationType",
    //       "items.customPlacementConfig.dataLocations",
    //       "items.rpo",
    //     ],
    //   },
    //   {
    //     id: "permission-qouta-detail",
    //     name: "permission_qouta_detail",
    //     description:
    //       "Lists every predefined Role that IAM supports, or every custom role that is defined for an organization or project.",
    //     selected: false,
    //     children: [],
    //     selectedWorkflows: [{ name: "Ingestion workflow", id: "" }],
    //     inputParams: {
    //       api_key: "lD9pxYKT9BinTpT5wSlveaCOu5AYxiryZZDJKI9I",
    //     },
    //     selectedOutputParams: [],
    //     outputParams: [
    //       "roles.name",
    //       "roles.title",
    //       "roles.description",
    //       "roles.includedPermissions.0",
    //       "roles.stage",
    //       "roles.etag",
    //       "roles.deleted",
    //       "nextPageToken",
    //     ],
    //   },
    //   {
    //     id: "listing-asset-inventory",
    //     name: "listing_asset_inventory",
    //     description:
    //       "Lists assets with time and resource types and returns paged results in response",
    //     selected: false,
    //     children: [],
    //     selectedWorkflows: [{ name: "Ingestion workflow", id: "" }],
    //     inputParams: {
    //       api_key: "lD9pxYKT9BinTpT5wSlveaCOu5AYxiryZZDJKI9I",
    //     },
    //     selectedOutputParams: [],
    //     outputParams: [
    //       "readTime",
    //       "assets.updateTime",
    //       "assets.name",
    //       "assets.assetType",
    //       "assets.resource.version",
    //       "assets.resource.discoveryDocumentUri",
    //       "assets.resource.discoveryName",
    //       "assets.resource.resourceUrl",
    //       "assets.resource.parent",
    //       "assets.resource.location",
    //       "assets.iamPolicy.version",
    //       "assets.iamPolicy.bindings.role",
    //       "assets.iamPolicy.bindings.members",
    //       "assets.iamPolicy.bindings.condition.title",
    //       "assets.iamPolicy.bindings.condition.description",
    //       "assets.iamPolicy.bindings.condition.expression",
    //       "assets.iamPolicy.auditConfigs.service",
    //       "assets.iamPolicy.auditConfigs.auditLogConfigs.logType",
    //       "assets.iamPolicy.auditConfigs.auditLogConfigs.exemptedMembers",
    //       "assets.iamPolicy.etag",
    //       "assets.orgPolicy.version",
    //       "assets.orgPolicy.bindings.role",
    //       "assets.orgPolicy.bindings.members",
    //       "assets.orgPolicy.bindings.condition.title",
    //       "assets.orgPolicy.bindings.condition.description",
    //       "assets.orgPolicy.bindings.condition.expression",
    //       "assets.orgPolicy.auditConfigs.service",
    //       "assets.orgPolicy.auditConfigs.auditLogConfigs.logType",
    //       "assets.orgPolicy.auditConfigs.auditLogConfigs.exemptedMembers",
    //       "assets.orgPolicy.etag",
    //       "assets.osInventory.name",
    //       "assets.osInventory.osInfo.hostname",
    //       "assets.osInventory.osInfo.longName",
    //       "assets.osInventory.osInfo.shortName",
    //       "assets.osInventory.osInfo.version",
    //       "assets.osInventory.osInfo.architecture",
    //       "assets.osInventory.osInfo.kernelVersion",
    //       "assets.osInventory.osInfo.kernelRelease",
    //       "assets.osInventory.osInfo.osconfigAgentVersion",
    //     ],
    //   },
    //   {
    //     id: "bigquery-get-dataset",
    //     name: "bigquery_get_dataset",
    //     description:
    //       "Lists all datasets in the specified project to which the user has been granted the READER dataset role.",
    //     selected: false,
    //     children: [],
    //     selectedWorkflows: [{ name: "Ingestion workflow", id: "" }],
    //     inputParams: {
    //       api_key: "lD9pxYKT9BinTpT5wSlveaCOu5AYxiryZZDJKI9I",
    //     },
    //     selectedOutputParams: [],
    //     outputParams: [
    //       "kind",
    //       "etag",
    //       "nextPageToken",
    //       "datasets.kind",
    //       "datasets.id",
    //       "datasets.datasetReference.datasetId",
    //       "datasets.datasetReference.projectId",
    //       "datasets.labels.name",
    //       "datasets.friendlyName",
    //       "datasets.location",
    //     ],
    //   },
    //   {
    //     id: "getIamPolicy",
    //     name: "get_iam_policy",
    //     description:
    //       "Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.",
    //     selected: false,
    //     children: [],
    //     selectedWorkflows: [{ name: "Ingestion workflow", id: "" }],
    //     inputParams: {
    //       api_key: "lD9pxYKT9BinTpT5wSlveaCOu5AYxiryZZDJKI9I",
    //     },
    //     selectedOutputParams: [],
    //     outputParams: ["bindings.role", "bindings.members", "etag", "version"],
    //   },
    //   {
    //     id: "understanding-roles",
    //     name: "understanding_roles",
    //     description:
    //       "This page lists all basic and predefined roles for Identity and Access Management (IAM).",
    //     selected: false,
    //     children: [],
    //     selectedWorkflows: [{ name: "Ingestion workflow", id: "" }],
    //     inputParams: {
    //       api_key: "lD9pxYKT9BinTpT5wSlveaCOu5AYxiryZZDJKI9I",
    //     },
    //     selectedOutputParams: [],
    //     outputParams: [
    //       "roles.name",
    //       "roles.title",
    //       "roles.description",
    //       "roles.includedPermissions.0",
    //       "roles.stage",
    //       "roles.etag",
    //       "roles.deleted",
    //       "nextPageToken",
    //     ],
    //   },
    //   {
    //     id: "get-service-usage",
    //     name: "get_service_usage",
    //     description:
    //       "Returns the service configuration and enabled state for a given service.",
    //     selected: false,
    //     children: [],
    //     selectedWorkflows: [{ name: "Ingestion workflow", id: "" }],
    //     inputParams: {
    //       name: "service-name",
    //     },
    //     selectedOutputParams: [],
    //     outputParams: [
    //       "name",
    //       "parent",
    //       "config.name",
    //       "config.title",
    //       "config.apis",
    //       "config.documentation",
    //       "config.quota",
    //       "config.authentication",
    //       "config.usage",
    //       "config.endpoints",
    //       "config.monitoredResources",
    //       "config.monitoring",
    //     ],
    //   },
    // ],
  });




  // sai created this state...
  
const [appState1,setAppState1]=useState({endpoints:[]})





  const [selectedPlatform, setSelectedPlatform] = useState({});
  const [selectedIntegration, setSelectedIntegration] = useState({
    Integration_Name: "",
    Integration_Description: "",
    API_reference: "",
    Documentation: "",
    Operational_Endpoint: "",
    Credentials_type: "username",
    username: "",
    password: "",
    apikey: "",
    schemaIds: [],
    workflowIds: [],
  });

  const [selectedNode, setSelectedNode] = useState({});

  console.log("selectedPlatform",selectedPlatform,"selectedIntegration",selectedIntegration)







  const [dashboardState, setDashboardState] = useState(1);
  const [bqobj, setBqobj] = useState({});
  let [aqArray, setaqArray] = useState([]);
  const [aqStylesPayload, setAqstylesPayload] = useState();
  const [platformSetUp, setPlatformSetUp] = useState([]);
  const [schemaData, setSchemadata] = useState({});
  let [eclipse, seteclipse] = useState(1);
  let [refreshData, setRefreshData] = useState(false);
  //path in manage lifecycleform
  const [currentPath, setCurrentPath] = useState("");


  


  const [apidatalist, setapidatalist] = useState([]);






  // useEffect(()=>{

  
  //     setSelectedNode({})
    


    
  //   },[selectedIntegration,selectedPlatform])
















  const [selectedIndex, setSelectedIndex] = useState(0);
  const [newIntegration , setNewIntegration] = useState({flage:false})
  const [selectedAQobject,setSelectedAQobject]=useState({})
  return (
    <AppContext.Provider
      value={{
        appState,
        setAppState,
        dashboardState,
        setDashboardState,
        eclipse,
        seteclipse,
        bqobj,
        setBqobj,
        platformSetUp,
        setPlatformSetUp,
        selectedNode,
        setSelectedNode,
        selectedPlatform,
        setSelectedPlatform,
        selectedIntegration,
        setSelectedIntegration,
        aqArray,
        setaqArray,
        aqStylesPayload,
        setAqstylesPayload,
        refreshData,
        setRefreshData,
        newIntegration,
        setNewIntegration,
        schemaData,
        setSchemadata,

        appState1,
        apidatalist,
        setapidatalist,
        setSelectedAQobject,
        selectedAQobject,

        setAppState1,
        selectedIndex,
        setSelectedIndex,
        currentPath,
        setCurrentPath
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppState;
