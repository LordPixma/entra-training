var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// api/delete-module/[id].js
async function onRequestDelete(context) {
  try {
    const { params, env } = context;
    const { id } = params;
    if (!id) {
      return new Response("Module ID required", { status: 400 });
    }
    await env.TRAINING_MODULES.delete(`module:${id}`);
    await removeFromModuleList(env, id);
    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Delete module error:", error);
    return new Response(`Server error: ${error.message}`, { status: 500 });
  }
}
__name(onRequestDelete, "onRequestDelete");

// api/get-module/[id].js
async function onRequestGet(context) {
  try {
    const { params, env } = context;
    const { id } = params;
    if (!id) {
      return new Response("Module ID required", { status: 400 });
    }
    const moduleData = await env.TRAINING_MODULES.get(`module:${id}`, "json");
    if (!moduleData) {
      return new Response("Module not found", { status: 404 });
    }
    return new Response(JSON.stringify(moduleData), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300"
        // Cache for 5 minutes
      }
    });
  } catch (error) {
    console.error("Get module error:", error);
    return new Response(`Server error: ${error.message}`, { status: 500 });
  }
}
__name(onRequestGet, "onRequestGet");

// api/export-modules.js
async function onRequestGet2(context) {
  try {
    const { env } = context;
    const moduleList = await env.TRAINING_MODULES.get("module-list", "json") || [];
    const allModules = [];
    for (const moduleInfo of moduleList) {
      const moduleData = await env.TRAINING_MODULES.get(`module:${moduleInfo.id}`, "json");
      if (moduleData) {
        allModules.push(moduleData);
      }
    }
    const exportData = {
      exportDate: (/* @__PURE__ */ new Date()).toISOString(),
      totalModules: allModules.length,
      modules: allModules
    };
    return new Response(JSON.stringify(exportData, null, 2), {
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": 'attachment; filename="training-modules-export.json"'
      }
    });
  } catch (error) {
    console.error("Export modules error:", error);
    return new Response(`Server error: ${error.message}`, { status: 500 });
  }
}
__name(onRequestGet2, "onRequestGet");

// api/import-existing.js
async function onRequestPost(context) {
  try {
    const { env } = context;
    const existingModules = {
      "create-user": {
        title: "Create New User Account",
        category: "User Account Management",
        steps: [
          {
            instruction: "Navigate to the Microsoft Entra admin center",
            details: "Open your web browser and go to entra.microsoft.com. Sign in with your administrator credentials.",
            image: "Screenshot: Entra admin center login page"
          },
          {
            instruction: "Access the Users section",
            details: 'In the left navigation panel, click on "Identity" then select "Users" to view the user management interface.',
            image: "Screenshot: Navigation to Users section"
          },
          {
            instruction: 'Click "New user" button',
            details: 'At the top of the Users page, click the "New user" button to start creating a new user account.',
            image: "Screenshot: New user button highlighted"
          },
          {
            instruction: "Fill in user details",
            details: "Enter the required information: Display name, User principal name, and initial password. Choose whether to auto-generate or create a custom password.",
            image: "Screenshot: User creation form"
          },
          {
            instruction: "Review and create the user",
            details: 'Review all the information entered, then click "Create" to finalize the new user account. The user will receive welcome instructions via email.',
            image: "Screenshot: User creation confirmation"
          }
        ]
      },
      "configure-mfa": {
        title: "Configure Multi-Factor Authentication",
        category: "Authentication & Security",
        steps: [
          {
            instruction: "Navigate to Security settings",
            details: 'In the Entra admin center, go to "Protection" in the left menu, then select "Authentication methods".',
            image: "Screenshot: Security settings navigation"
          },
          {
            instruction: "Select MFA settings",
            details: 'Click on "Multi-factor authentication" to access the MFA configuration options.',
            image: "Screenshot: MFA settings page"
          },
          {
            instruction: "Configure authentication methods",
            details: "Enable the desired authentication methods such as Microsoft Authenticator app, SMS, or phone calls. Set policies for which methods are required.",
            image: "Screenshot: Authentication methods configuration"
          },
          {
            instruction: "Set user requirements",
            details: "Define which users or groups require MFA. You can apply it to all users, specific groups, or based on conditional access policies.",
            image: "Screenshot: User MFA requirements"
          },
          {
            instruction: "Test and verify MFA setup",
            details: "Test the MFA configuration with a test user account to ensure it works correctly before applying to all users.",
            image: "Screenshot: MFA testing interface"
          }
        ]
      }
    };
    let importedCount = 0;
    for (const [id, moduleData] of Object.entries(existingModules)) {
      const fullModuleData = {
        ...moduleData,
        id,
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
        source: "imported"
      };
      await env.TRAINING_MODULES.put(
        `module:${id}`,
        JSON.stringify(fullModuleData),
        {
          metadata: {
            title: moduleData.title,
            category: moduleData.category,
            stepCount: moduleData.steps.length
          }
        }
      );
      await updateModuleList(env, id, {
        id,
        title: moduleData.title,
        category: moduleData.category,
        stepCount: moduleData.steps.length,
        updatedAt: fullModuleData.updatedAt
      });
      importedCount++;
    }
    return new Response(JSON.stringify({
      success: true,
      imported: importedCount,
      message: `Successfully imported ${importedCount} training modules`
    }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Import existing modules error:", error);
    return new Response(`Server error: ${error.message}`, { status: 500 });
  }
}
__name(onRequestPost, "onRequestPost");
async function updateModuleList(env, moduleId, moduleInfo) {
  try {
    const currentList = await env.TRAINING_MODULES.get("module-list", "json") || [];
    const filteredList = currentList.filter((item) => item.id !== moduleId);
    filteredList.push(moduleInfo);
    filteredList.sort((a, b) => a.title.localeCompare(b.title));
    await env.TRAINING_MODULES.put("module-list", JSON.stringify(filteredList));
  } catch (error) {
    console.error("Update module list error:", error);
    throw error;
  }
}
__name(updateModuleList, "updateModuleList");

// api/list-modules.js
async function onRequestGet3(context) {
  try {
    const { env } = context;
    const moduleListData = await env.TRAINING_MODULES.get("module-list", "json");
    const moduleList = moduleListData || [];
    return new Response(JSON.stringify(moduleList), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=60"
        // Cache for 1 minute
      }
    });
  } catch (error) {
    console.error("List modules error:", error);
    return new Response(`Server error: ${error.message}`, { status: 500 });
  }
}
__name(onRequestGet3, "onRequestGet");

// api/load-modules.js
async function onRequestGet4(context) {
  try {
    const { env } = context;
    const moduleList = await env.TRAINING_MODULES.get("module-list", "json") || [];
    const modules = {};
    for (const moduleInfo of moduleList) {
      const moduleData = await env.TRAINING_MODULES.get(`module:${moduleInfo.id}`, "json");
      if (moduleData) {
        modules[moduleInfo.id] = moduleData;
      }
    }
    return new Response(JSON.stringify(modules), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300"
        // Cache for 5 minutes
      }
    });
  } catch (error) {
    console.error("Load modules error:", error);
    return new Response(`Server error: ${error.message}`, { status: 500 });
  }
}
__name(onRequestGet4, "onRequestGet");

// api/save-module.js
async function onRequestPost2(context) {
  try {
    const { request, env } = context;
    if (!env.TRAINING_MODULES) {
      console.error("KV namespace TRAINING_MODULES not bound");
      return new Response("KV storage not configured. Please check your KV namespace binding.", {
        status: 500,
        headers: { "Content-Type": "text/plain" }
      });
    }
    let requestData;
    try {
      requestData = await request.json();
    } catch (parseError) {
      return new Response("Invalid JSON in request body", {
        status: 400,
        headers: { "Content-Type": "text/plain" }
      });
    }
    const { id, data } = requestData;
    if (!id || !data) {
      return new Response("Missing required fields: id and data", {
        status: 400,
        headers: { "Content-Type": "text/plain" }
      });
    }
    if (!data.title || !data.steps) {
      return new Response("Invalid module data: missing title or steps", {
        status: 400,
        headers: { "Content-Type": "text/plain" }
      });
    }
    const moduleData = {
      ...data,
      id,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    try {
      await env.TRAINING_MODULES.put(
        `module:${id}`,
        JSON.stringify(moduleData),
        {
          metadata: {
            title: data.title,
            category: data.category || "General",
            stepCount: data.steps.length
          }
        }
      );
    } catch (kvError) {
      console.error("KV put error:", kvError);
      return new Response(`Failed to save to KV storage: ${kvError.message}`, {
        status: 500,
        headers: { "Content-Type": "text/plain" }
      });
    }
    try {
      await updateModuleList2(env, id, {
        id,
        title: data.title,
        category: data.category || "General",
        stepCount: data.steps.length,
        updatedAt: moduleData.updatedAt
      });
    } catch (listError) {
      console.error("Module list update error:", listError);
    }
    return new Response(JSON.stringify({
      success: true,
      id,
      message: "Module saved successfully"
    }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Save module error:", error);
    return new Response(`Server error: ${error.message}`, {
      status: 500,
      headers: { "Content-Type": "text/plain" }
    });
  }
}
__name(onRequestPost2, "onRequestPost");
async function updateModuleList2(env, moduleId, moduleInfo) {
  try {
    const currentList = await env.TRAINING_MODULES.get("module-list", "json") || [];
    const filteredList = currentList.filter((item) => item.id !== moduleId);
    filteredList.push(moduleInfo);
    filteredList.sort((a, b) => a.title.localeCompare(b.title));
    await env.TRAINING_MODULES.put("module-list", JSON.stringify(filteredList));
  } catch (error) {
    console.error("Update module list error:", error);
    throw error;
  }
}
__name(updateModuleList2, "updateModuleList");

// api/test-kv.js
async function onRequestGet5(context) {
  try {
    const { env } = context;
    if (!env.TRAINING_MODULES) {
      return new Response(JSON.stringify({
        error: "KV namespace TRAINING_MODULES not bound",
        bindings: Object.keys(env || {}),
        help: "Configure KV binding in Cloudflare Pages dashboard under Settings > Environment variables"
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    const testKey = "test-" + Date.now();
    const testValue = { message: "KV is working!", timestamp: (/* @__PURE__ */ new Date()).toISOString() };
    await env.TRAINING_MODULES.put(testKey, JSON.stringify(testValue));
    const retrievedValue = await env.TRAINING_MODULES.get(testKey, "json");
    await env.TRAINING_MODULES.delete(testKey);
    return new Response(JSON.stringify({
      success: true,
      message: "KV namespace is working correctly!",
      testData: retrievedValue,
      bindings: Object.keys(env || {})
    }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      error: error.message,
      stack: error.stack
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(onRequestGet5, "onRequestGet");

// ../.wrangler/tmp/pages-Ii6hUI/functionsRoutes-0.028495484040741426.mjs
var routes = [
  {
    routePath: "/api/delete-module/:id",
    mountPath: "/api/delete-module",
    method: "DELETE",
    middlewares: [],
    modules: [onRequestDelete]
  },
  {
    routePath: "/api/get-module/:id",
    mountPath: "/api/get-module",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet]
  },
  {
    routePath: "/api/export-modules",
    mountPath: "/api",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet2]
  },
  {
    routePath: "/api/import-existing",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost]
  },
  {
    routePath: "/api/list-modules",
    mountPath: "/api",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet3]
  },
  {
    routePath: "/api/load-modules",
    mountPath: "/api",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet4]
  },
  {
    routePath: "/api/save-module",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost2]
  },
  {
    routePath: "/api/test-kv",
    mountPath: "/api",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet5]
  }
];

// ../../../../../../usr/local/lib/node_modules/wrangler/node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
__name(lexer, "lexer");
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = /* @__PURE__ */ __name(function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  }, "tryConsume");
  var mustConsume = /* @__PURE__ */ __name(function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  }, "mustConsume");
  var consumeText = /* @__PURE__ */ __name(function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  }, "consumeText");
  var isSafe = /* @__PURE__ */ __name(function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  }, "isSafe");
  var safePattern = /* @__PURE__ */ __name(function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  }, "safePattern");
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
__name(parse, "parse");
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
__name(match, "match");
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = /* @__PURE__ */ __name(function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    }, "_loop_1");
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path, index, params };
  };
}
__name(regexpToFunction, "regexpToFunction");
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
__name(escapeString, "escapeString");
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
__name(flags, "flags");
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
__name(regexpToRegexp, "regexpToRegexp");
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
__name(arrayToRegexp, "arrayToRegexp");
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
__name(stringToRegexp, "stringToRegexp");
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
__name(tokensToRegexp, "tokensToRegexp");
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}
__name(pathToRegexp, "pathToRegexp");

// ../../../../../../usr/local/lib/node_modules/wrangler/templates/pages-template-worker.ts
var escapeRegex = /[.+?^${}()|[\]\\]/g;
function* executeRequest(request) {
  const requestPath = new URL(request.url).pathname;
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult) {
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: true
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
__name(executeRequest, "executeRequest");
var pages_template_worker_default = {
  async fetch(originalRequest, env, workerContext) {
    let request = originalRequest;
    const handlerIterator = executeRequest(request);
    let data = {};
    let isFailOpen = false;
    const next = /* @__PURE__ */ __name(async (input, init) => {
      if (input !== void 0) {
        let url = input;
        if (typeof input === "string") {
          url = new URL(input, request.url).toString();
        }
        request = new Request(url, init);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context = {
          request: new Request(request.clone()),
          functionPath: path,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: /* @__PURE__ */ __name(() => {
            isFailOpen = true;
          }, "passThroughOnException")
        };
        const response = await handler(context);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      } else {
        const response = await fetch(request);
        return cloneResponse(response);
      }
    }, "next");
    try {
      return await next();
    } catch (error) {
      if (isFailOpen) {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      }
      throw error;
    }
  }
};
var cloneResponse = /* @__PURE__ */ __name((response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
), "cloneResponse");

// ../../../../../../usr/local/lib/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../../../../../../usr/local/lib/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// ../.wrangler/tmp/bundle-y9UgF5/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = pages_template_worker_default;

// ../../../../../../usr/local/lib/node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// ../.wrangler/tmp/bundle-y9UgF5/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=functionsWorker-0.8977771264718124.mjs.map
