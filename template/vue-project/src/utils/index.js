/**
 * 路由转菜单
 * @param {Array} routes 路由列表
 * @returns
 */
export function routesToMenu(routes = [], authority = []) {
  let routeNames = [];
  function getRouteName(list) {
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      if (item.name) routeNames.push(item.name);
      if (Array.isArray(item.children)) getRouteName(item.children);
    }
  }
  getRouteName(routes);
  return routes.filter((x) => {
    let name = x.name || '';
    let flag = false;
    if (x.meta.exclude) return false;
    if (authority.includes(name)) return true;
    for (let m = 0; m < routeNames.length; m++) {
      const rtname = routeNames[m];
      if (rtname.startsWith(name + '.')) {
        flag = true;
        break;
      }
    }
    return flag;
  });
}
export function filterMenu(routes = [], authority = []) {
  let arr = routes.filter((x) => {
    if (x.meta.exclude) return false;
    if (x.name && authority.includes(x.name)) return true;
    let flag = false;
    if (Array.isArray(x.children)) findname(x.children);
    function findname(list) {
      for (let m = 0; m < list.length; m++) {
        const el = list[m];
        if (authority.includes(el.name)) {
          flag = true;
          break;
        } else if (Array.isArray(el.children)) {
          findname(el.children);
        }
      }
    }
    return flag;
  });
  return arr;
}
