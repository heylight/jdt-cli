export function filterMenu(routes = []) {
  const { authority, routePermission } = this.$store.state;
  const arr = routes.filter((x) => {
    if (x.meta.exclude) return false;
    if (!routePermission || (x.name && authority.includes(x.name))) return true;
    let flag = false;
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
    if (Array.isArray(x.children)) findname(x.children);
    return flag;
  });
  return arr;
}
export function hello() {}
