import { onRequestDelete as __api_delete_module__id__js_onRequestDelete } from "/home/runner/work/entra-training/entra-training/functions/api/delete-module/[id].js"
import { onRequestGet as __api_get_module__id__js_onRequestGet } from "/home/runner/work/entra-training/entra-training/functions/api/get-module/[id].js"
import { onRequestGet as __api_export_modules_js_onRequestGet } from "/home/runner/work/entra-training/entra-training/functions/api/export-modules.js"
import { onRequestPost as __api_import_existing_js_onRequestPost } from "/home/runner/work/entra-training/entra-training/functions/api/import-existing.js"
import { onRequestGet as __api_list_modules_js_onRequestGet } from "/home/runner/work/entra-training/entra-training/functions/api/list-modules.js"
import { onRequestGet as __api_load_modules_js_onRequestGet } from "/home/runner/work/entra-training/entra-training/functions/api/load-modules.js"
import { onRequestPost as __api_save_module_js_onRequestPost } from "/home/runner/work/entra-training/entra-training/functions/api/save-module.js"
import { onRequestGet as __api_test_kv_js_onRequestGet } from "/home/runner/work/entra-training/entra-training/functions/api/test-kv.js"

export const routes = [
    {
      routePath: "/api/delete-module/:id",
      mountPath: "/api/delete-module",
      method: "DELETE",
      middlewares: [],
      modules: [__api_delete_module__id__js_onRequestDelete],
    },
  {
      routePath: "/api/get-module/:id",
      mountPath: "/api/get-module",
      method: "GET",
      middlewares: [],
      modules: [__api_get_module__id__js_onRequestGet],
    },
  {
      routePath: "/api/export-modules",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_export_modules_js_onRequestGet],
    },
  {
      routePath: "/api/import-existing",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_import_existing_js_onRequestPost],
    },
  {
      routePath: "/api/list-modules",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_list_modules_js_onRequestGet],
    },
  {
      routePath: "/api/load-modules",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_load_modules_js_onRequestGet],
    },
  {
      routePath: "/api/save-module",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_save_module_js_onRequestPost],
    },
  {
      routePath: "/api/test-kv",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_test_kv_js_onRequestGet],
    },
  ]