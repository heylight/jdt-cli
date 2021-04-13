export function filterMenu(routes = []) {
  let { authority, routePermission } = this.$store.state;
  let arr = routes.filter((x) => {
    if (x.meta.exclude) return false;
    if (!routePermission || (x.name && authority.includes(x.name))) return true;
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
